from extentions import DB

class Reserve(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String, nullable=False)
    table_number = DB.Column(DB.String, nullable=False)
    date = DB.Column(DB.Datetime, nullable=False)
    address = DB.Column(DB.String, nullable=False)
    guests = DB.Column(DB.Integer, nullable=False)
    preorder = DB.Column(DB.String)