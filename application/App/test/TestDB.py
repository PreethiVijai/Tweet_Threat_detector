from flask import Flask
import unittest
import sys, os
from src import app
from flask_testing import TestCase
from flask_mysqldb import MySQL

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'ThreatDetectorDB'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql.init_app(app)

class TestDB(unittest.TestCase):
    """Tests the Register class"""
    def testConnection(self):
        with app.app_context():
            cur = mysql.connection.cursor()
        
            if cur.execute("select * from INFORMATION_SCHEMA.TABLES where 'TABLE_SCHEMA'='ThreatDetectorDB' and 'TABLE_NAME'='tdusers'") is False:
                value = "Connection Unsuccessfull"
            else:
                value = "Connection Successfull"

            assert value == "Connection Successfull"

    def testUsername(self):
        username = "test_username"
        with app.app_context():
             cur = mysql.connection.cursor()
             cur.execute("select username from tdusers where username =(%s)",(username,))
             username_result = cur.fetchall()
             if username_result:
                value = "Username exists"
             else:
                value = "Username does not exist"

             assert value == "Username does not exist"
             cur.execute("delete from tdusers where username =(%s)",(username,))


if __name__ == '__main__':
    unittest.main()
