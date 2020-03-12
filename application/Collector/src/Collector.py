import argparse

from Twitter_API import API


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', help='API key for the app communicating with Twitter')
    parser.add_argument('apisecret', help='API secret for the app communicating with Twitter')
    return parser.parse_args()


def main(apikey, apisecret):
    api = API(apikey, apisecret)
    api.get_oauth2_bearer_token()
    print(api.get_filter_rules().text)


if __name__ == '__main__':
    args = parse_args()
    main(args.apikey, args.apisecret)

