import unittest

from TweetProcessor import TweetProcessor
from Threat import Threat


test_body_text = 'test_body'
test_queue_name = 'test_queue'


class TestTweetProcessor(unittest.TestCase):
    """Tests the TweetProcessor class"""

    def setUp(self):
        self.processor = TweetProcessor()

    def test_none_result(self):
        tweet = "a short tweet"
        result = self.processor.proccess_tweet(tweet)
        self.assertIsNone(result)

    def test_threat_result(self):
        tweet = "a long tweet"*10
        result = self.processor.proccess_tweet(tweet)
        self.assertIsInstance(result, Threat)
        self.assertIsInstance(result.ID, int)
        self.assertEqual(result.type, "Crime")
        self.assertEqual(result.location, "Unkown")
        self.assertEqual(result.confidence, .0)
        self.assertIsInstance(result.tweets, list)
        self.assertListEqual(result.tweets, [tweet])


if __name__ == '__main__':
    unittest.main()
