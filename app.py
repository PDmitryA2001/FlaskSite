from flask import Flask
from config import Config
from extentions import DB


def create_app(config_class = Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    DB.init_app(app)
    with app.app_context():
        DB.create_all()

    return app

