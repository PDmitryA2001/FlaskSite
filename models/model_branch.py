from extentions import DB


class Branch(DB.Model):
    __tablename__ = 'branch'

    id = DB.Column(DB.Integer, primary_key=True)
    address = DB.Column(DB.String(200), nullable=False)
    phone = DB.Column(DB.String(20), nullable=True)
    description = DB.Column(DB.Text, nullable=True)

    tables = DB.relationship('Table', backref='branch', cascade='all, delete-orphan', lazy=True)
    posters = DB.relationship('Poster', backref='branch', cascade='all, delete-orphan', lazy=True)