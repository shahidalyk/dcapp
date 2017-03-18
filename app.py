from flask import Flask, render_template, jsonify
from nodes_count import get_nodes_data
from temp import get_temp_data
import os


app = Flask(__name__)


@app.route("/nodesdata")
def nodes_data():
    return jsonify(get_nodes_data())

@app.route("/tempdata")
def temp_data():
    return get_temp_data()

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
