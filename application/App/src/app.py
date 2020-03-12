from flask import Flask, request, send_from_directory
app = Flask(__name__, static_url_path='')


# Respond when the form asks for a response
@app.route('/form-response')
def form_response():
    formtext = request.args.get('formtext')
    if formtext is not None:
        return 'You typed \'' + formtext + '\', which was sent to the app, which sent it back, along with this message!'
    else:
        return 'You didn\'t type anything! The app sent this message back to let you know that.'


# Serve up index.html (should probably do this via waitress instead)
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


if __name__ == '__main__':
    # Waitress is a more secure/efficient server than what comes with Flask
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
