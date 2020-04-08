import pika


class RabbitSender:
    """Sends messages to RabbitMQ"""

    def __init__(self, queue_name: str) -> None:
        """
        Initialize RabbitMQ connection

        queue_name: str - Name of queue to send to
        """
        self.queue_name = queue_name

    def __del__(self):
        if hasattr(self, 'channel'):
            self.channel.close()

    def prepare_connection(self, rabbit_host: str) -> None:
        """
        Prepare RabbitMQ connection

        rabbit_host: str - Hostname of RabbitMQ instance to connect to
        """
        connection = pika.BlockingConnection(pika.ConnectionParameters(rabbit_host))
        self.channel = connection.channel()
        self.channel.queue_declare(queue=self.queue_name, durable=True)

    def send_message(self, message: str) -> None:
        """Send message to RabbitMQ queue"""
        self.channel.basic_publish(exchange='', routing_key=self.queue_name, body=message,
                                   properties=pika.BasicProperties(delivery_mode=2))

