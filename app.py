from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder="dist", static_url_path="")

@app.route("/")
def serve():
    return send_from_directory("dist", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("dist", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8501)