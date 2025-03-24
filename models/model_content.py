from extentions import DB


class Content(DB):
    id = DB.Column(DB.Integer, primary_key=True)
    adress_restoraunt = DB.Column(DB.String(255), nullable=False)
    slide_image = DB.Column(DB.String(255), nullable=False)