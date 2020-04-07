# Tweet Analyzer

If you'd like, you can start a python virtual environment by typing
`python -m venv ENV`. You then activate this environment by typing
`. ENV/bin/activate`. This will keep the below dependencies from
being installed to your python installation globally.

To install the app dependencies, type `pip install -r requirements.txt`

To run the Tweet Analyzer, run `python src/Analyzer.py`

You can then send tweets to the analyzer by sending them via RabbitMQ
to the 'tweet' queue

