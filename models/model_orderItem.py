from extentions import DB


class OrderedItem(DB.Model):
    __tablename__ = 'ordered_item'

    id = DB.Column(DB.Integer, primary_key=True)
    reservation_id = DB.Column(DB.Integer, DB.ForeignKey('reservation.id', ondelete='CASCADE'), nullable=False)
    menu_item_id = DB.Column(DB.Integer, DB.ForeignKey('menu_item.id', ondelete='SET NULL'), nullable=True)
    quantity = DB.Column(DB.Integer, nullable=False, default=1)
    special_requests = DB.Column(DB.Text, nullable=True)

    # Relationship without cascade
    menu_item = DB.relationship('MenuItem', lazy=True)
