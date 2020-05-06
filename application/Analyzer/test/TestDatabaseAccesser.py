import unittest

from DatabaseAccesser import DatabaseAccesser
from Threat import Threat
import json


add_text = ("INSERT INTO threats "
            "(id, type, location, confidence, tweets, date) "
            "VALUES (%(id)s, %(type)s, %(location)s, %(confidence)s, %(tweets)s, %(date)s)")


class TestDatabaseAccesser(unittest.TestCase):
    """Tests the TweetProcessor class"""

    def setUp(self):
        self.accesser = DatabaseAccesser('address', 'database')
        self.accesser.time_func = MockToday

    def test_add_threat(self):
        log = []
        self.accesser.connection = MockConnection(log)
        tweet = {}
        tweet['data'] = {}
        tweet['data']['text'] = 'test text'
        threat = Threat(0, 'Fire', 'Somewhere', .5, [tweet])
        data = {
            'id': 0,
            'type': 'Fire',
            'location': 'Somewhere',
            'confidence': .5,
            'tweets': json.dumps([tweet]),
            'date': MockToday()
        }
        self.accesser.add_threat(threat)
        self.assertEqual([(add_text, data)],log)


class MockConnection():
    def __init__(self, log):
        self.log = log
        self.queue = []

    def cursor(self):
        return MockCursor(self.queue)

    def commit(self):
        self.log.extend(self.queue)


class MockCursor():
    def __init__(self, log):
        self.log = log

    def execute(self, add, data):
        self.log.append((add, data))

    def close(self):
        self.log = None


def MockToday():
    return 'Date Filler'


if __name__ == '__main__':
    unittest.main()
