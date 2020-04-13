import argparse

import RabbitReceiver


def parse_args():
    """Parse command-line arguments"""
    parser = argparse.ArgumentParser()
    parser.add_argument('rabbit_host', help='Hostname of RabbitMQ instance to connect to')
    return parser.parse_args()


def main(args):
    analyzer = Analyzer(args.rabbit_host)
    analyzer.start()


class Analyzer:
    def __init__():
        queue_name = 'tweet'
        self.receiver = RabbitReceiver.RabbitReceiver(queue_name, self.process_tweet)
        self.receiver.prepare_connection(rabbit_host)

    def process_tweet(tweet):
        pass

    def write_to_db(tweet: str) -> None:
        """Write tweet to database"""
        # TODO: Write tweet to DB instead of printing it
        print(tweet)ls

    def start(rabbit_host):
        receiver.start_receiving()


if __name__ == '__main__':
    args = parse_args()
    main(args)
