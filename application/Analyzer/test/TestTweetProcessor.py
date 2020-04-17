import unittest

from TweetProcessor import TweetProcessor
from Threat import Threat
import json


class TestTweetProcessor(unittest.TestCase):
    """Tests the TweetProcessor class"""

    def setUp(self):
        self.processor = TweetProcessor()

    def test_no_location(self):
        tweet = {}
        tweet['data'] = {}
        tweet['data']['text'] = 'no keywords here'
        tweet = json.dumps(tweet)
        result = self.processor.process_tweet(tweet)
        self.assertIsNone(result)

    def test_fire_tweet(self):
        tweet = {}
        tweet['data'] = {}
        tweet['data']['entities'] = {}
        tweet['data']['entities']['annotations'] = [{}]
        tweet['data']['entities']['annotations'][0]['type'] = 'Place'
        tweet['data']['entities']['annotations'][0]['normalized_text'] = 'Somewhere'
        tweet['data']['text'] = 'fire fire fire'
        tweet_json = json.dumps(tweet)
        result = self.processor.process_tweet(tweet_json)
        self.assertIsInstance(result, Threat)
        self.assertIsInstance(result.ID, int)
        self.assertEqual(result.type, "fire")
        self.assertEqual(result.location, "Somewhere")
        self.assertEqual(result.confidence, .1)
        self.assertIsInstance(result.tweets, list)
        self.assertListEqual(result.tweets, [tweet])


if __name__ == '__main__':
    unittest.main()
