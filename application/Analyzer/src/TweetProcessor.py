
import Threat
import uuid


class TweetProcessor:
    def __init__(self):
        pass

    # Placeholder Implementation: detects threat if tweet longer then 50 characters
    def proccess_tweet(self, tweet):
        tweets = [tweet]
        confidance = .0
        if len(tweet) < 50:
            return None
        else:
            return Threat.Threat(uuid.uuid4().int, 'Crime', 'Unkown', confidance, tweets)

