import argparse

import RabbitReceiver
import TweetProcessor
import DatabaseAccesser


def parse_args():
    """Parse command-line arguments"""
    parser = argparse.ArgumentParser()
    parser.add_argument('rabbit_host', help='Hostname of RabbitMQ instance to connect to')
    return parser.parse_args()


def main(args):
    analyzer = Analyzer(args.rabbit_host)
    analyzer.start()


class Analyzer:
    def __init__(self, database_name):
        queue_name = 'tweet'
        self.processor = TweetProcessor.TweetProcessor()
        self.db_acceser = DatabaseAccesser.DatabaseAccesser(database_name)
        self.receiver = RabbitReceiver.RabbitReceiver(queue_name, self.process_tweet)
        self.receiver.prepare_connection(rabbit_host)

    def process_tweet(self, tweet):
        result = TweetProcessor.process_tweet(tweet)
        if result is not None:
            self.db_acceser.add_threat(result)

    def write_to_db(self, tweet: str) -> None:
        """Write tweet to database"""
        # TODO: Write tweet to DB instead of printing it
        print(tweet)

    def start(self, rabbit_host):
        receiver.start_receiving()


if __name__ == '__main__':
    args = parse_args()
    main(args)
