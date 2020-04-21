
from datetime import date
import mysql.connector
import json


add_threat = ("INSERT INTO threats "
              "(id, type, location, confidence, tweets, date) "
              "VALUES (%(id)s, %(type)s, %(location)s, %(confidence)s, %(tweets)s, %(date)s)")


class DatabaseAccesser:
    def __init__(self, address, database):
        self.address = address
        self.database = database
        self.time_func = date.today

    def prepare_connection(self):
        self.connection = mysql.connector.connect(user="root", password="", host=self.address, database=self.database)

    def add_threat(self, threat):
        cursor = self.connection.cursor()
        data_threat = {
            'id': threat.ID,
            'type': threat.type,
            'location': bytes(threat.location, 'utf-8').decode('utf-8', 'ignore'),
            'confidence': threat.confidence,
            'tweets': bytes(json.dumps(threat.tweets), 'utf-8').decode('utf-8', 'ignore'),
            'date': self.time_func()
        }
        cursor.execute(add_threat, data_threat)
        self.connection.commit()
        cursor.close()

    def shutdown(self):
        self.connection.close()
