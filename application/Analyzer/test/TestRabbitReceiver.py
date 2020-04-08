import unittest

from src.RabbitReceiver import RabbitReceiver


test_body_text = 'test_body'
test_queue_name = 'test_queue'


class TestRabbitReceiver(unittest.TestCase):
    """Tests the RabbitReceiver class"""

    def callback(self, body):
        # Tests that text passed to the receiver callback is the text
        # that this callback receives.
        self.assertTrue(test_body_text == body)

    def test_callback(self):
        receiver = RabbitReceiver(test_queue_name, self.callback)
        channel = MockChannel()
        method = MockMethod()
        receiver.callback(channel, method, None, test_body_text)
        # The only test here is that the 'callback' method above
        # had the right argument passed to it

    def test_basic_flow(self):
        receiver = RabbitReceiver(test_queue_name, self.callback)
        channel = MockChannel()
        receiver.channel = channel
        receiver.start_receiving()
        method = MockMethod()
        channel.mock_receive(test_body_text)
        # The only test here is that the 'callback' method above
        # had the right argument passed to it


class MockChannel():
    """Mocks RabbitMQ Channel"""

    def __init__(self):
        self.closed = False

    def basic_ack(self, delivery_tag):
        pass

    def basic_consume(self, queue, on_message_callback):
        self.queue_name = queue
        self.on_message_callback = on_message_callback

    def start_consuming(self):
        pass

    def mock_receive(self, body):
        method = MockMethod()
        self.on_message_callback(self, method, None, test_body_text)


class MockMethod():
    """Mocks 'method' for use in MockChannel"""

    def __init__(self):
        self.delivery_tag = 'test_delivery_tag'


if __name__ == '__main__':
    unittest.main()
