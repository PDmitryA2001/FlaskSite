from flask import Blueprint, jsonify, request
from datetime import datetime
import psycopg2
from sqlalchemy.util import symbol

from extentions import DB
from dotenv import load_dotenv
from sqlalchemy import select, cast, Date, and_, not_, exists
from sqlalchemy.sql import func

import os

from models.model_tables import Table
from models.model_reserve import Reservation
from models.model_branch import Branch

time_reserve = Blueprint('time_reserve', __name__)
@time_reserve.route('/flaskapi/time_reserve', methods=['POST'])
def time_reserve():
    # adr, date, qua
    #  time
    adr = request.get_json()['adress']
    date = request.get_json()['date']
    qua = request.get_json()['quantity']

    free_query =(
    select(
        Table.number.label('free_tables'),
        func.sum(Table.capacity).label('free_capacity')
    )
    .join(Branch)
    .where
    (
        and_(
            cast(Branch, Table.branch_id) == adr,
            not_(Table.id.in_
                (
                select(Reservation.table_id)
                .where(cast(Reservation.reservation_time, Date) == date)
            )
            )
        )
    )
    .group_by(Table.number)
    )
    free = DB.session.execute(free_query).mappings().all()
    if free["free_capacity"] < qua:
        reserved_query = (
            select(
                Reservation.table_id.label('reserved_table'),
                Reservation.reservation_time.label('reserved_time'),
            )
            .join(Table)
            .join(Branch)
            .where
                (
                and_(
                    Branch.address == adr,
                    cast(Reservation.reservation_time, Date) == date
                )
            ),
        )
        reserved = DB.session.execute(reserved_query).mappings().all()
        result_execute = reserved + free
        result = [dict(row._asdict()) for row in result_execute]
        return jsonify(result)
    else:
        return jsonify({"free_capacity": "none"})
