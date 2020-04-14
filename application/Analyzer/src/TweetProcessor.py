
import Threat
import uuid
import json


class TweetProcessor:
    def __init__(self):
        self.threat_types = ['fire', 'shooting']

    # Placeholder Implementation: detects threat if tweet longer then 50 characters
    def process_tweet(self, tweet):
        # Cast tweet bytestring to JSON object
        tweet = json.loads(tweet)
        # No point in detecting a threat if we have no idea where
        location = self.get_tweet_location(tweet)
        if location is None:
            return None
        # Figure out what kind of threat
        threat_type = self.get_tweet_threat_type(tweet)
        if threat_type is None:
            return None
        tweets = [tweet]
        confidence = .1
        return Threat.Threat(uuid.uuid4().int, threat_type, location, confidence, tweets)

    def get_tweet_location(self, tweet):
        if 'data' not in tweet:
            return None
        data = tweet['data']
        if 'entities' not in data:
            return None
        entities = data['entities']
        if 'annotations' not in entities:
            return None
        annotations = entities['annotations']
        for annotation in annotations:
            if annotation['type'] == 'Place' and annotation['normalized_text'] is not None:
                return annotation['normalized_text']
        return None

    def get_tweet_threat_type(self, tweet):
        if 'data' not in tweet:
            return None
        data = tweet['data']
        if 'text' not in data:
            return None
        text = data['text']
        for threat_type in self.threat_types:
            if threat_type.lower() in text.lower():
                return threat_type

