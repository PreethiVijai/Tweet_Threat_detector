from flask import Flask, request, send_from_directory, render_template, flash, redirect, url_for, session, logging
app = Flask(__name__, static_url_path='')

from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'ThreatDetectorDB'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# init MySQL
mysql = MySQL(app)

# Respond when the form asks for a response
@app.route('/form-response')
def form_response():
    formtext = request.args.get('formtext')
    if formtext is not None and formtext.strip() != '':
        return 'You typed \'' + formtext + '\', which was sent to the app, which sent it back, along with this message!'
    else:
        return 'You didn\'t type anything! The app sent this message back to let you know that.'


# Serve up index.html (should probably do this via waitress instead)
@app.route('/')
def index():
    return render_template('index.html')

# access login page
@app.route('/login')
def login():
    return render_template('login.html')


class RegisterForm(Form):
    username = StringField('Username', validators=[validators.Length(min=4, max=25)])
    email  = StringField(u'Email', validators=[validators.Length(min=4, max=25)])
    password  = PasswordField(u'Password', [
        validators.DataRequired(),
        validators.EqualTo('confirmedPassword',message=u'Passwords do not match')
        ])
    confirmedPassword = PasswordField(u'Confirm Password')

# go to register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    # if the form sunmitted
    if request.method == 'POST' and form.validate():

        # create cursor
        cur = mysql.connection.cursor()
        if cur.execute("select * from INFORMATION_SCHEMA.TABLES where 'TABLE_SCHEMA'='ThreatDetectorDB' and 'TABLE_NAME'='tdusers'") is False:
            cur.execute("CREATE TABLE tdusers (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30), email VARCHAR(100), password VARCHAR(100), confirmedPassword VARCHAR(100))")

        # create table if not exists
        cur.execute("CREATE TABLE if not exists tdusers (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30), email VARCHAR(100), password VARCHAR(100), confirmedPassword VARCHAR(100))")
        
        username = form.username.data
        cur.execute("select username from tdusers where username =(%s)",(username,))
        
        username_result = cur.fetchall()
        # if username already existed
        if username_result:
            flash(u"Username already exist. Please choose another one!","danger")
        else:
            email = form.email.data
            cur.execute("select email from tdusers where email =(%s)",(email,))
            email_result = cur.fetchall()
            # if email already existed
            if email_result:
                flash(u"Email already exist. Please log in!",'danger')
            else:
                password = sha256_crypt.hash(str(form.password.data))
                confirmedPassword = form.confirmedPassword.data
        
                # execute query 
                cur.execute("insert into tdusers(username, email, password, confirmedPassword) values(%s, %s, %s, %s)", (username, email, password, confirmedPassword))

                #commit to DB
                mysql.connection.commit()

                flash('You are now registered and can log in','success')

                #close connection
                cur.close()


            return redirect(url_for('login'))

    return render_template('register.html', form=form)


if __name__ == '__main__':
    app.secret_key="1234567"
    # Waitress is a more secure/efficient server than what comes with Flask
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
