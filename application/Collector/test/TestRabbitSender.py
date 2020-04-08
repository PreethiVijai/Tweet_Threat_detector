import unittest

from src.RabbitSender import RabbitSender


# Test variables
test_message = 'This is a test message'
test_queue = 'test_queue'


class TestRabbitSender(unittest.TestCase):
    """Tests the RabbitSender class"""

    def test_basic_flow(self):
        sender = RabbitSender(test_queue)
        sender.channel = MockChannel()
        sender.send_message(test_message)
        self.assertTrue(test_message == sender.channel.received_message)
        self.assertTrue(test_queue == sender.channel.received_queue)


class MockChannel:
    """Mock RabbitMQ Channel for use in TestRabbitSender"""

    def __init__(self):
        self.received_message = ''
        self.received_queue = ''

    def basic_publish(self, exchange, routing_key, body, properties):
        self.received_message = body
        self.received_queue = routing_key

    def close(self):
        pass

