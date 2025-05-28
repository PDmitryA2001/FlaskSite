from extentions import DB


class Poster(DB.Model):
    __tablename__ = 'poster'

    id = DB.Column(DB.Integer, primary_key=True)
    title = DB.Column(DB.String(100), nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    image_url = DB.Column(DB.String(255), nullable=False)
    event_date = DB.Column(DB.DateTime, nullable=False)
    branch_id = DB.Column(DB.Integer, DB.ForeignKey('branch.id', ondelete='CASCADE'), nullable=False)