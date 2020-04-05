import argparse
from time import sleep
import requests

from Twitter_API import API, WorkerConnectionException


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', help='API key for the app communicating with Twitter')
    parser.add_argument('apisecret', help='API secret for the app communicating with Twitter')
    parser.add_argument('workerurl', help='URL to send tweets to')
    return parser.parse_args()


def main(apikey, apisecret, workerurl):
    api = API(apikey, apisecret, workerurl)
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
    worker_timeout = 0
    while True:
        # Wait until worker is ready before connecting to Twitter
        try:
            status = api.worker_status_check()
        except requests.exceptions.ConnectionError:
            print('Unable to connect to worker, retrying in', 2 ** worker_timeout, 'seconds')
            sleep(2 ** worker_timeout)
            # Exponential backoff up to around 2 minutes
            if (worker_timeout < 7):
                worker_timeout += 1
            continue
        if 'status' not in status.json() or status.json()['status'] != 'ok':
            print('Waiting for worker to be ready, retrying in', 2 ** worker_timeout, 'seconds')
            sleep(2 ** worker_timeout)
            # Exponential backoff up to around 2 minutes
            if (worker_timeout < 7):
                worker_timeout += 1
            continue
        else:
            # Reset worker timeout, we successfully connected
            worker_timeout = 0
        try:
            api.start_filtered_tweet_stream()
        except WorkerConnectionException:
            # We only want to increase Twitter timeout if Twitter failed, rather than if the worker failed
            continue
        print('Warning: Twitter stream disconnected, reconnecting after', 2**twitter_timeout, 'seconds')
        sleep(2 ** twitter_timeout)
        # Exponential backoff up to around 8.5 minutes (2**9 seconds)
        if (twitter_timeout < 9):
            twitter_timeout += 1


if __name__ == '__main__':
    args = parse_args()
    main(args.apikey, args.apisecret, args.workerurl)

