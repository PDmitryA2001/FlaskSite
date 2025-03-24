from flask import Blueprint, send_from_directory, current_app
import os

react_route = Blueprint('react', __name__, static_folder='../react/site-app/build')
@react_route.route('/', defaults={'path': ''})
@react_route.route('/<path:path>')
def react_funk(path):
    static_path = react_route.static_folder
    full_path = os.path.join(static_path, path)

    # Если файл существует и это не API-запрос
    if path and os.path.exists(full_path) and not path.startswith('api/'):
        return send_from_directory(static_path, path)
    return send_from_directory(static_path, 'index.html')
