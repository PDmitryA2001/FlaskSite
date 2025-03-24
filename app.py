from flask import Flask
from config import Config
from extentions import DB
from route.routes import main
from route.component_react import react_route
import os

def create_app(config_class = Config):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    REACT_BUILD = os.path.join(BASE_DIR, 'react', 'site-app', 'build')

    app = Flask(__name__, static_folder=REACT_BUILD)
    app.config.from_object(config_class)

    app.register_blueprint(main)
    app.register_blueprint(react_route, url_prefix='/')


    DB.init_app(app)
    with app.app_context():
        DB.create_all()

    return app

