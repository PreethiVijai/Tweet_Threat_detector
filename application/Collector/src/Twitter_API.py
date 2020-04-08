import json
import requests

from RabbitSender import RabbitSender


class API:
    """Interacts with the Twitter API"""

    def __init__(self, appkey, appsecret, rabbit_host):
        """
        appkey: str - application key for Twitter API
        appsecret: str - application secret for Twitter API
        rabbit_host: str - hostname of RabbitMQ instance to connect to
        """
        # Twitter info
        self.appkey = appkey
        self.appsecret = appsecret
        self.filter_rules_url = 'https://api.twitter.com/labs/1/tweets/stream/filter/rules'
        self.filter_stream_url = 'https://api.twitter.com/labs/1/tweets/stream/filter'
        self.oauth2_url = 'https://api.twitter.com/oauth2/token'
        # RabbitMQ setup
        self.rabbit_sender = RabbitSender('tweet')
        self.rabbit_sender.prepare_connection(rabbit_host)

    def get_oauth2_bearer_token(self):
        """Get an OAuth2 bearer token"""
        auth = (self.appkey, self.appsecret)
        params = {'grant_type': 'client_credentials'}
        response = requests.post(self.oauth2_url,
                                 auth=auth,
                                 params=params)
        self.oauth2_bearer_token = response.json()['access_token']

    def add_filter_rule(self, search_text, dry_run=False):
        """
        Add a filter rule

        Parameters:

        search_text: string
            The text you want your rule to search for
        dry_run: boolean
            True if you just want to see if your rule is formatted
            correctly, False if you really want to add the rule
    
        If you put in a search_text of 'danger', then the
        example rule_text would be '{"add":[{"value": "danger"}]}'

        The example rule_text should return tweets that would get
        returned by searching for 'danger' on Twitter via browser.

        Go to twitter.com/search-advanced to create the search
        you want; you can then replace 'danger' above with whatever
        the search text ends up being.
        """
        if dry_run:
            params = {'dry_run': 'true'}
        else:
            params = {}
        headers = {'Content-type': 'application/json',
                   'Authorization': 'Bearer '+self.oauth2_bearer_token}
        rule_text = '{"add":[{"value": "'+search_text+'"}]}'
        response = requests.post(self.filter_rules_url,
                                 headers=headers,
                                 params=params,
                                 data=rule_text)
        return response

    def get_filter_rules(self):
        """Get list of filter rules"""
        params = {}
        headers = {'Authorization': 'Bearer '+self.oauth2_bearer_token}
        response = requests.get(self.filter_rules_url,
                                headers=headers,
                                params=params)
        return response.json()

    def delete_all_filter_rules(self):
        """Delete all filter rules"""
        rules = self.get_filter_rules()
        # If no rules or we could not get them, we can't delete any rules
        if rules is None or 'data' not in rules:
            return
        ids = list(map(lambda rule: rule['id'], rules['data']))
        payload = {
            'delete': {
                'ids': ids
            }
        }
        headers = {'Authorization': 'Bearer '+self.oauth2_bearer_token}
        response = requests.post(self.filter_rules_url,
                                 headers=headers,
                                 json=payload)
        return response.json()

    def start_filtered_tweet_stream(self):
        """Connect to Twitter API, pull filtered tweets through it, and send tweets to worker"""
        # Open connection
        headers = {'Authorization': 'Bearer '+self.oauth2_bearer_token}
        response = requests.get(self.filter_stream_url,
                                headers=headers,
                                stream=True)
        # Send tweets to worker as they come in
        for tweet in response.iter_lines():
            if tweet:
                self.rabbit_sender.send_message(tweet)

