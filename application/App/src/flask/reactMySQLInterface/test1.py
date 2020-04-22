from flask import Flask, jsonify, request, json
from flaskext.mysql import MySQL
mysql = MySQL()

# MySQL configurations
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'priyanka'
app.config['MYSQL_DATABASE_DB'] = 'Threatdetectordb'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
