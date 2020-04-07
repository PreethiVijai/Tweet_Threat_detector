from typing import Callable

import pika


class RabbitReceiver:
    """Receives messages from RabbitMQ"""

    def __init__(self, queue_name: str, receiver_callback: Callable) -> None:
        """
        Initialize RabbitMQ connection

        queue_name: str - Name of queue to receive from
        receiver_callback: Callable - Function to process received messages
        """
        self.connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name, durable=True)
        self.queue_name = queue_name
        self.receiver_callback = receiver_callback

    def callback(self, ch, method, properties, body) -> None:
        self.receiver_callback(body)
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def start_receiving(self) -> None:
        """Begin receiving messages"""
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=self.callback)
        self.channel.start_consuming()

    def stop_receiving(self) -> None:
        self.channel.close()

