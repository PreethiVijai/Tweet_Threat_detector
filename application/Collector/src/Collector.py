import argparse
from time import sleep
import requests

from Twitter_API import API


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', help='API key for the app communicating with Twitter')
    parser.add_argument('apisecret', help='API secret for the app communicating with Twitter')
    parser.add_argument('rabbit_host', help='Hostname of RabbitMQ instance to connect to')
    return parser.parse_args()


def main(apikey, apisecret, rabbit_host):
    #apikey = get_file_conents(apikey)
    #apisecret = get_file_conents(apisecret)

    # Prepare Twitter and RabbitMQ connections
    api = API(apikey, apisecret, rabbit_host)
    api.get_oauth2_bearer_token()

    # Example of adding a rule:
    # api.add_filter_rule('fire OR emergency OR shooting')

    # Example of printing out existing rules
    # print('Filter rules: ', api.get_filter_rules()['data'])

    # Example of deleting existing rules
    # api.delete_all_filter_rules()

    # Example of opening filtered tweet stream, using exponential
    # backoff if reconnection is needed to avoid rate limiting
    twitter_timeout = 0
    while True:
        api.start_filtered_tweet_stream()
        print('Warning: Twitter stream disconnected, reconnecting after', 2**twitter_timeout, 'seconds')
        sleep(2 ** twitter_timeout)
        # Exponential backoff up to around 8.5 minutes (2**9 seconds)
        if (twitter_timeout < 9):
            twitter_timeout += 1


if __name__ == '__main__':
    args = parse_args()
    main(args.apikey, args.apisecret, args.rabbit_host)

