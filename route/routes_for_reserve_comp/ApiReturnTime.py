from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from collections import defaultdict

from models.model_tables import Table
from models.model_reserve import Reservation
from models.model_branch import Branch

time_reserve = Blueprint('time_reserve', __name__)
@time_reserve.route('/flaskapi/time_reserve', methods=['POST'])
def time_reserve_funk():
    adr = request.get_json()['adress']
    date_str = request.get_json()['date']
    try:
        date_local = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return {"error": "Неверный формат даты."}, 400
    branch = Branch.query.filter_by(address=adr).first()
    if not branch:
        return {"numbers": [], "reservations": []}
    tables = Table.query.filter(
        Table.branch_id == branch.id
    ).all()
    if not tables:
        return {"numbers": [], "reservations": []}
    table_capacity_map = {}
    numbers = []
    for table in tables:
        table_capacity_map[table.id] = table.capacity
        numbers.append(table.number)
    start_date = datetime.combine(date_local, datetime.min.time())
    end_date = start_date + timedelta(days=1)

    reservations = Reservation.query.filter(
        Reservation.table_id.in_(t.id for t in tables),
        Reservation.reservation_time >= start_date,
        Reservation.reservation_time < end_date,
        Reservation.status == 'confirmed',
    ).all()

    time_groups = defaultdict(lambda: {'table_ids': set(), 'capacity': 0})
    for res in reservations:
        if res.table_id in table_capacity_map:
            res_time = res.reservation_time.time()
            time_groups[res_time]['table_ids'].add(res.table_id)
            time_groups[res_time]['capacity'] += table_capacity_map[res.table_id]
    sorted_reservations = []
    for time_key in sorted(time_groups.keys()):
        group = time_groups[time_key]
        sorted_reservations.append({
            "reservation_time": time_key.strftime("%H:%M"),
            "r_tables": list(group['table_ids']),
            "r_capacity": group['capacity']
        })
    return {
            "numbers": numbers,
            "reservations": sorted_reservations
        }