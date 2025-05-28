from datetime import datetime
from xmlrpc.client import DateTime

from extentions import DB


class Reservation(DB.Model):
    __tablename__ = 'reservation'

    id = DB.Column(DB.Integer, primary_key=True)
    customer_name = DB.Column(DB.String(100), nullable=False)
    phone_number = DB.Column(DB.String(20), nullable=False)
    email = DB.Column(DB.String(100), nullable=True)
    reservation_time = DB.Column(DB.DateTime, nullable=False)
    duration = DB.Column(DB.Integer, nullable=False, default=120)  # in minutes
    guests = DB.Column(DB.Integer, nullable=False)
    status = DB.Column(DB.String(20), default='confirmed', nullable=False)
    special_requests = DB.Column(DB.Text, nullable=True)
    table_id = DB.Column(DB.Integer, DB.ForeignKey('table.id', ondelete='CASCADE'), nullable=False)

    ordered_items = DB.relationship('OrderedItem', backref='reservation', cascade='all, delete-orphan', lazy=True)