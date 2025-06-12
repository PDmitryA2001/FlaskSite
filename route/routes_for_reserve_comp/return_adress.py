from flask import Blueprint, jsonify
from sqlalchemy import select
from extentions import DB
from models.model_branch import Branch

return_address = Blueprint('adr_return', __name__)
@return_address.route('/flaskapi/return_address', methods=['GET'])
def adr_return_funk():
    query = select(
        Branch.id,
        Branch.address)
    result = DB.session.execute(query)
    result_json = [dict(row._asdict()) for row in result]
    print(result_json)
    return jsonify(result_json)