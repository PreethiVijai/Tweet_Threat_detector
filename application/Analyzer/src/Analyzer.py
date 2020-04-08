import argparse

import RabbitReceiver


def parse_args():
    """Parse command-line arguments"""
    parser = argparse.ArgumentParser()
    parser.add_argument('rabbit_host', help='Hostname of RabbitMQ instance to connect to')
    return parser.parse_args()


def write_to_db(tweet: str) -> None:
    """Write tweet to database"""
    # TODO: Write tweet to DB instead of printing it
    print(tweet)


def main(rabbit_host):
    queue_name = 'tweet'
    receiver = RabbitReceiver.RabbitReceiver(queue_name, write_to_db)
    receiver.prepare_connection(rabbit_host)
    receiver.start_receiving()


if __name__ == '__main__':
    args = parse_args()
    main(args.rabbit_host)

