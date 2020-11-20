"""
REST API Resource Routing
http://flask-restplus.readthedocs.io
"""

import os
# import psycopg2
from datetime import datetime
from flask import request
from flask_restplus import Resource

from .security import require_auth
from . import api_rest

import psycopg2
from psycopg2.extras import NamedTupleCursor, DictCursor
from collections import namedtuple
import json

#Database initialization
# DATABASE_URL = os.getenv("DATABASE_URL")
# DATABASE_URL = os.getenv("PW_DATABASE_URL")
# DATABASE_URL = os.getenv("JB_DATABASE_URL")
# conn = psycopg2.connect(DATABASE_URL)
# cur = conn.cursor()

class SecureResource(Resource):
    """ Calls require_auth decorator on all requests """
    method_decorators = [require_auth]


def create_record(obj, fields):
    return dict(zip(fields, obj))


def get_connection():
    # return psycopg2.connect("dbname=wonderboard")
    DATABASE_URL = os.getenv('DATABASE_URL')
    return psycopg2.connect(DATABASE_URL)


def find_all(table):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table};")
        rows = cur.fetchall()
        column_names = [desc[0] for desc in cur.description]

    data = []
    for row in rows:
        data.append(create_record(row, column_names))

    return data


def find_one(table, id):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table} where id={id};")
        row = cur.fetchone()
        column_names = [desc[0] for desc in cur.description]

    return create_record(row, column_names)


@api_rest.route('/users')
class Users(Resource):
    def get(self):
        return find_all('users'), 200

    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"INSERT INTO users (username, first_name, last_name, email, password) VALUES ('{data['username']}', '{data['first_name']}', '{data['last_name']}', '{data['email']}', '{data['password']}') RETURNING id;")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('users', id)

        return result, 201


@api_rest.route('/users/<int:resource_id>')
class User(Resource):
    def get(self, resource_id):
        return find_one('users', resource_id), 200


@api_rest.route('/resource/<string:resource_id>')
class ResourceOne(Resource):
    """ Unsecure Resource Class: Inherit from Resource """

    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}

    def post(self, resource_id):
        json_payload = request.json
        return {'timestamp': json_payload}, 201


@api_rest.route('/secure-resource/<string:resource_id>')
class SecureResourceOne(SecureResource):
    """ Unsecure Resource Class: Inherit from Resource """

    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}
