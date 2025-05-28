from flask import Blueprint, request
from datetime import datetime

from extentions import DB
from sqlalchemy import select, Integer, string

from models.model_tables import Table
from models.model_reserve import Reservation
from models.model_branch import Branch
from models.model_orderItem import OrderedItem
from models.model_menu import MenuItem

upload_order = Blueprint('upload_data', __name__)
@upload_order.route('/flaskapi/upload_order', methods=['POST'])
def upload_order():
    data = request.get_json()
    table_id = DB.session.execute(
        select(Table.id)
        .where(
            (Table.number, Integer) == data['table'],
            (Branch.address, string) == data['branch'],
        )
    ).scalar()
    to_reserve = {
        'customer_name': data.get['customer_name'],
        'phone_number': data.get['phone_number'],
        'email': data.get['email'],
        'reservation_time': data.get['reservation_time'],
        'guests': data.get['guests'],
        'table_id': table_id,
        'status': 'reserved',
        'duration': 1,
    }
    if isinstance(to_reserve['reservation_time'], str):
        to_reserve['reservation_time'] = datetime.fromisoformat(to_reserve['reservation_time'])
    new_reservation = Reservation(**to_reserve)
    DB.session.add(new_reservation)
    DB.session.commit()
    menu_item_id = DB.session.execute(
        select(MenuItem.id)
        .where((MenuItem.name, Integer) == data['menu_item_name'])
    ).scalar()
    reserve_id = (
        select(Reservation.id)
        .where((Reservation.phone_number, string) == to_reserve['phone_number'])
    )
    to_order = {
            'res_id': reserve_id,
            'menu_item_id': menu_item_id,
            'quantity': data.get['quantity'],
            'special_request': data.get['special_request'],
        }
    new_order = OrderedItem(**to_order)
    DB.session.add(new_order)
    DB.session.commit()


