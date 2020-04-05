from flask import Flask, jsonify, request
app = Flask(__name__, static_url_path='')


@app.route('/tweet', methods = ['POST'])
def receive_tweet():
    tweet = request.get_json()
    # TODO: Save tweet to database rather than print
    print(tweet)
    res = {'status': 'ok'}
    return jsonify(res)


@app.route('/status')
def send_status():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=8079)

