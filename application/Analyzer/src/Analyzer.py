import RabbitReceiver


def write_to_db(tweet: str) -> None:
    """Write tweet to database"""
    # TODO: Write tweet to DB instead of printing it
    print(tweet)


def main():
    queue_name = 'tweet'
    receiver = RabbitReceiver(queue_name, write_to_db)
    receiver.start_receiving()


if __name__ == '__main__':
    main()

