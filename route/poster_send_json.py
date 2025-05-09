from dataclasses import replace
from flask import Blueprint, jsonify, request
from psycopg2.extras import RealDictCursor
from sqlalchemy import text
from datetime import datetime
from extentions import DB
import psycopg2
from dotenv import load_dotenv
import os

poster_json = Blueprint('poster_send_json', __name__)

@poster_json.route('/flaskapi/poster_react', methods = ["GET", "POST"])
def poster_send_json():
    date_json = request.get_json()['date']
    connection = connetct_DB()
    if connection:
        try:
            date_json = datetime.fromisoformat(date_json).date()
            data = """
            SELECT * FROM Poster
            WHERE date::date = %s::date
            ORDER BY date
            """
            with connection.cursor() as cursor:
                cursor.execute(data, (date_json,))
                columns = [desc[0] for desc in cursor.description]
                items = [dict(zip(columns, row)) for row in cursor.fetchall()]
                print("SO GOOOD, data ----- ", items)
                return jsonify(items)
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
