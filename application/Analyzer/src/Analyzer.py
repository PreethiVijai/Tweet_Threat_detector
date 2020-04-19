import argparse

import RabbitReceiver
import TweetProcessor
import DatabaseAccesser


def parse_args():
    """Parse command-line arguments"""
    parser = argparse.ArgumentParser()
    parser.add_argument('rabbit_host', help='Hostname of RabbitMQ instance to connect to')
    parser.add_argument('database_name', help='Name of database to connect to')
    return parser.parse_args()


def main(args):
    analyzer = Analyzer(args.rabbit_host, args.database_name)
    analyzer.start()


class Analyzer:
    def __init__(self, rabbit_host, database_name):
        queue_name = 'tweet'
        self.processor = TweetProcessor.TweetProcessor()
        self.db_accesser = DatabaseAccesser.DatabaseAccesser(database_name, 'ThreatDetector')
        self.db_accesser.prepare_connection()
        self.receiver = RabbitReceiver.RabbitReceiver(queue_name, self.process_tweet)
        self.receiver.prepare_connection(rabbit_host)

    def process_tweet(self, tweet):
        result = self.processor.process_tweet(tweet)
        if result is not None:
            self.db_accesser.add_threat(result)

    def start(self):
        self.receiver.start_receiving()


if __name__ == '__main__':
    args = parse_args()
    main(args)
