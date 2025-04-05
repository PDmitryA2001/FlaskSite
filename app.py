from flask import Flask
from config import Config
from extentions import DB, migrate
from route.upload_to_db import upload_to_db
from route.image_to_react import image_to_react
from route.routes import main
from route.component_react import react_route
import os

def create_app(config_class = Config):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    REACT_BUILD = os.path.join(BASE_DIR, 'react', 'site-app', 'build')

    app = Flask(__name__, static_folder=REACT_BUILD)
    app.config.from_object(config_class)

    DB.init_app(app)
    migrate.init_app(app, DB)


    app.register_blueprint(main)
    app.register_blueprint(upload_to_db)
    app.register_blueprint(image_to_react)

    app.register_blueprint(react_route, url_prefix='/')


    with app.app_context():
        DB.create_all()

    return app
