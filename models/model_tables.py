from extentions import DB


class Table(DB.Model):
    __tablename__ = 'table'

    id = DB.Column(DB.Integer, primary_key=True)
    number = DB.Column(DB.Integer, nullable=False)
    capacity = DB.Column(DB.Integer, nullable=False)
    is_active = DB.Column(DB.Boolean, default=True, nullable=False)
    branch_id = DB.Column(DB.Integer, DB.ForeignKey('branch.id', ondelete='CASCADE'), nullable=False)

    reservations = DB.relationship('Reservation', backref='table', cascade='all, delete-orphan', lazy=True)