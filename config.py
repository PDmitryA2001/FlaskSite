import os

class Config(object):
        POSTGRES_USER = os.getenv('POSTGRES_USER')
        POSTGRES_PORT = os.getenv('POSTGRES_PORT')
        POSTGRES_DB = os.getenv('POSTGRES_DB')
        POSTGRES_HOST = os.getenv('POSTGRES_HOST')
        POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
        SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'

        SECRET_KEY = os.getenv('SECRET_KEY')
