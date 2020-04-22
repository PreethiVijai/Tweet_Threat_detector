from flask import Flask, request
import pymysql
from flaskext.mysql import MySQL
from flask import jsonify


app = Flask(__name__)
mysql = MySQL()
@app.route('/user')
def user():
    try:
        conn=mysql.connect()
        cur=conn.cursor(pymysql.cursor.DictCursor)
        cur.execute("SELECT * from user;")
        rows=cur.fetchall()
        resp=jsonify(rows)
        resp.status_code=200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@app.errorhandler(404)
def not_found(error=None):
    message={
        'status':404,
        'message': 'Not Found: ' +request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
    app.run()
