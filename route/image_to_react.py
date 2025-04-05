from flask import Blueprint, send_from_directory
from config import Config


image_to_react = Blueprint("image_react", __name__)
@image_to_react.route("/flaskapi/get_image/<path:filename>", methods=["GET"])
def send_image(filename):
    return send_from_directory(Config.UPLOAD_FOLDER, filename)