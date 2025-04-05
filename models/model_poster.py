from extentions import DB


class Poster(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    poster_name = DB.Column(DB.String, nullable=False)
    address = DB.Column(DB.String, nullable=False)
    pic_name = DB.Column(DB.String, nullable=False)
    date = DB.Column(DB.DateTime, nullable=False)