
from datetime import date
import mysql.connector
import json


add_threat = ("INSERT INTO threats "
              "(id, type, location, confidence, tweets, date) "
              "VALUES (%(id)i, %(type)s, %(location)s, %(confidence)f, %(tweets)s, %(date)s)")


class DatabaseAccesser:
    def __init__(self, address, database):
        self.connection = mysql.connector.connect(user="", password="", host=address, database=database)

    def add_threat(self, threat):
        cursor = self.connection.cursor()
        data_threat = {
            'id': threat.ID,
            'type': threat.type,
            'location': threat.location,
            'confidence': threat.confidence,
            'tweets': json.dumps(threat.tweets),
            'date': date.today()
        }
        cursor.execute(add_threat, data_threat)
        self.connection.commit()
        cursor.close()

    def shutdown(self):
        self.connection.close()
