import requests


class API:
    """Interacts with the Twitter API"""

    def __init__(self, appkey, appsecret):
        self.appkey = appkey
        self.appsecret = appsecret

    def get_oauth2_bearer_token(self):
        """Get an OAuth2 bearer token"""
        oauth2_url = 'https://api.twitter.com/oauth2/token'
        auth = (self.appkey, self.appsecret)
        params = {'grant_type': 'client_credentials'}
        response = requests.post(oauth2_url,
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
        add_rule_url = 'https://api.twitter.com/labs/1/tweets/stream/filter/rules'
        if dry_run:
            params = {'dry_run': 'true'}
        else:
            params = {}
        headers = {'Content-type': 'application/json',
                   'Authorization': 'Bearer '+self.oauth2_bearer_token}
        rule_text = '{"add":[{"value": "'+search_text+'"}]}'
        response = requests.post(add_rule_url,
                                 headers=headers,
                                 params=params,
                                 data=rule_text)
        return response

    def get_filter_rules(self):
        """Get list of filter rules"""
        rule_url = 'https://api.twitter.com/labs/1/tweets/stream/filter/rules'
        params = {}
        headers = {'Authorization': 'Bearer '+self.oauth2_bearer_token}
        response = requests.get(rule_url,
                                headers=headers,
                                params=params)
        return response

