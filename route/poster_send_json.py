from flask import Blueprint, jsonify, request
from datetime import datetime
import psycopg2
from extentions import DB
from dotenv import load_dotenv
from sqlalchemy import select, cast, Date
import os

from models.model_branch import Branch
from models.model_poster import Poster

poster_json = Blueprint('poster_send_json', __name__)

@poster_json.route('/flaskapi/poster_react', methods = ["GET", "POST"])
def poster_send_json():
    date_json = request.get_json()['date']
    connection = connetct_DB()
    if connection:
        try:
            date_json = datetime.fromisoformat(date_json).date()
            query = (
                select(
                    Poster.title,
                    Poster.image_url,
                    Poster.event_date,
                    Branch.address.label("branch_address")
                )
                .join(Branch)
                .where(
                    cast(Poster.event_date, Date) == date_json
                )
                .order_by(Poster.event_date)
            )
            data = DB.session.execute(query)
            posters = [dict(row._asdict()) for row in data]
            return jsonify(posters)

        except Exception as e:
            print(e)
            return jsonify({'error': str(e)})
        finally:
            connection.close()

def connetct_DB():
    load_dotenv()
    try:
        conn = psycopg2.connect(
            dbname= os.getenv('POSTGRES_DB'),
            user= os.getenv('POSTGRES_USER'),
            password= os.getenv('POSTGRES_PASSWORD'),
            host= os.getenv('POSTGRES_HOST'),
            port= os.getenv('POSTGRES_PORT', '5432')
        )
        return conn
    except Exception as e:
        print(e)
        return None
