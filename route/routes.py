from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/flaskapi')
def funk():
    return render_template('main_flask/main.html')