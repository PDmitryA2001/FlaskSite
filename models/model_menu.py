from extentions import DB


class MenuItem(DB.Model):
    __tablename__ = 'menu_item'

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    price = DB.Column(DB.Float, nullable=False)
    category = DB.Column(DB.String(50), nullable=True)
    is_available = DB.Column(DB.Boolean, default=True, nullable=False)