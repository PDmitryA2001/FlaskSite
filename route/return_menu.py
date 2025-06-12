from flask import Blueprint, jsonify, request
from sqlalchemy import select, string
from extentions import DB


from models.model_menu import MenuItem

return_menu = Blueprint('return_menu', __name__)
@return_menu.route('/flaskapi/return_menu', methods=['GET'])
def return_menu():
    category = request.get_json()['category']
    query = (
        select(MenuItem)
        .where ((MenuItem.category, string) == category)
        .group_by(MenuItem.id)
    )
    result = DB.session.execute(query)
    result_json = [dict(row._asdict()) for row in result]
    return jsonify(result_json)