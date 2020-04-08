# Tweet Collector

### Installation

If you'd like, you can start a python virtual environment by typing
`python -m venv ENV`. You then activate this environment by typing
`. ENV/bin/activate`. This will keep the below dependencies from
being installed to your python installation globally.

To install the app dependencies, type `pip install -r requirements.txt`.

### Running

To run the Tweet Collector, run
`python src/Collector.py <api-key> <api-secret-key> rabbitmq`

It will then send tweets via RabbitMQ to the 'tweet' queue

### Testing

To test, you first need to have followed the installation steps. After
those are complete, run the tests with `python -m unittest` in this
directory.

