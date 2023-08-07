from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/goodbye")
def goodbye_world():
    return "<p>Goodbye, World!</p>"

@app.route("/newworld")
def new_world():
    return "<p>Hello, New World!</p>"

@app.route("/oldworld")
def old_world():
    return "<p>Hello, Old World!</p>"