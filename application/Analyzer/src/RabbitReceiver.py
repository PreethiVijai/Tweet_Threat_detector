from typing import Callable

import pika
import sys


class RabbitReceiver:
    """Receives messages from RabbitMQ"""

    def __init__(self, queue_name: str, receiver_callback: Callable) -> None:
        """
        Initialize RabbitMQ connection

        queue_name: str - Name of queue to receive from
        receiver_callback: Callable - Function to process received messages
        """
        self.queue_name = queue_name
        self.receiver_callback = receiver_callback

    def prepare_connection(self, rabbit_host: str):
        """
        Prepare RabbitMQ connection

        rabbit_host: str - Hostname of RabbitMQ to connect to
        """
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(rabbit_host))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=self.queue_name, durable=True)

    def callback(self, ch, method, properties, body) -> None:
        try:
            self.receiver_callback(body)
        except:
            print(sys.exc_info())
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def start_receiving(self) -> None:
        """Begin receiving messages"""
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=self.callback)
        self.channel.start_consuming()

    def stop_receiving(self) -> None:
        self.channel.close()

