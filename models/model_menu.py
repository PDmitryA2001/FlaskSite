from extentions import DB


class Menu(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String, nullable=False)
    cost = DB.Column(DB.Integer, nullable=False)
    picture = DB.Column(DB.String, nullable=False)
