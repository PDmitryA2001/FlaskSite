import os
from inspect import signature
from extentions import DB
from flask import Blueprint, jsonify, request, render_template, redirect
from werkzeug.utils import secure_filename
from config import Config
from models.model_poster import Poster

upload_to_db = Blueprint("poster_to_react", __name__)

@upload_to_db.route('/api/get_poster', methods=['GET', 'POST'])
def send_data():
    if request.method == "GET":
        return render_template('main_flask/main.html')
    if request.method == "POST":
        picture = request.files['poster_picture']
        if check_ext(picture):
            poster_name = request.form['poster_name']
            poster_adress = request.form['poster_adress']
            date = request.form['poster_date']
            try:
                pic_name = secure_filename(picture.filename)
                post = Poster(poster_name = poster_name, address = poster_adress, date = date, pic_name = pic_name)
                DB.session.add(post)
                DB.session.commit()
                picture.save(os.path.join(Config.UPLOAD_FOLDER, pic_name))
                return render_template('main_flask/main.html')
            except:
                return jsonify({"error": "Error format"}), 400


def check_ext(filename):
    SIGNA = {
        b'\xFF\xD8\xFF': 'jpg',
        b'\x89PNG': 'png',
    }
    header = filename.stream.read(10)
    filename.stream.seek(0)

    for signa, ext in SIGNA.items():
        if header.startswith(signa):
            return True
    return False
