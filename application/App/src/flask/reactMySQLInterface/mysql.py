from flask import Flask, jsonify, request, json
from flask_mysqldb  import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)


app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'priyanka'
app.config['MYSQL_DB'] = 'Threatdetectordb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL()
mysql.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/register', methods=['GET','POST'])
def register():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    firstName = request.get_json()['firstName']
    lastName = request.get_json()['lastName']
    newPassword = bcrypt.generate_password_hash(request.get_json()['newPassword']).decode('utf-8')
    success = request.get_json()['success']
    message = request.get_json()['message']
    #created = datetime.utcnow()

    cur.execute("INSERT INTO reg_form (username, firstName, lastName, newPassword, success,message) VALUES ('" +
		str(username) + "', '" +
		str(firstName) + "', '" +
		str(lastName) + "', '" +
		str(newPassword) + "', '" +
        str(success) + "', '" +
		str(message) + "')")
    mysql.connection.commit()

    result = {
        'username': username,
		'firstName': firstName,
		'lastName': lastName,
		'newPassword': newPassword,
		'success': success,
        'message': message
	}

    return jsonify({'result' : result})


@app.route('/login', methods=['GET','POST'])
def login():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    newPassword = request.get_json()['newPassword']
    result = ""

    cur.execute("SELECT * FROM users where username = '" + str(username) + "'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['newPassword'], newPassword):
        access_token = create_access_token(identity = {'firstName': rv['firstName'],'lastName': rv['lastName'],'username': rv['username']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})

    return result

if __name__ == '__main__':
    #app.run(debug=True)
    app.secret_key="1234567"
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
