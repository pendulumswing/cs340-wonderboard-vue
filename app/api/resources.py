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


# Method to turn a response into a dictionary
def create_record(obj, fields):
    return dict(zip(fields, obj))


# Connect to DB
def get_connection():
    # return psycopg2.connect("dbname=wonderboard")
    DATABASE_URL = os.getenv('DATABASE_URL')
    return psycopg2.connect(DATABASE_URL)

#
def execute_query(db_connection = None, query = None, query_params = ()):
    '''
    executes a given SQL query on the given db connection and returns a Cursor object

    db_connection: a MySQLdb connection object created by connect_to_database()
    query: string containing SQL query

    returns: A Cursor object as specified at https://www.python.org/dev/peps/pep-0249/#cursor-objects.
    You need to run .fetchall() or .fetchone() on that object to actually acccess the results.

    '''

    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None

    print("Executing %s with %s" % (query, query_params))
    # Create a cursor to execute query. Why? Because apparently they optimize execution by retaining a reference according to PEP0249
    # Argument 'mariadb.cursors.DictCursor' will include dict keys in response SOURCE: Piazza @40
    cursor = db_connection.cursor(mariadb.cursors.DictCursor)

    '''
    params = tuple()
    #create a tuple of paramters to send with the query
    for q in query_params:
        params = params + (q)
    '''
    #TODO: Sanitize the query before executing it!!!
    cursor.execute(query, query_params)
    # this will actually commit any changes to the database. without this no
    # changes will be committed!
    db_connection.commit()
    return cursor



# Find all rows in a table
def find_all(table):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table};")
        conn.commit()
        rows = cur.fetchall()
        column_names = [desc[0] for desc in cur.description]

    data = []
    for row in rows:
        data.append(create_record(row, column_names))

    return data


#Find one item in a table by id
def find_one(table, id):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table} where id={id};")
        conn.commit()
        row = cur.fetchone()
        column_names = [desc[0] for desc in cur.description]

    return create_record(row, column_names)

#Delete one item in a table by id
def delete_one(table, id):
    conn = get_connection()
    query = f"DELETE FROM {table} WHERE id={id};"
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query, query_params)
        conn.commit()
        result = cur

    return f"{result.rowcount} row deleted"


def update_one_user(table, data, id):
        conn = get_connection()
        query = (f"""UPDATE {table}
                SET username = '{data['username']}',
                first_name = '{data['first_name']}',
                last_name = '{data['last_name']}',
                email = '{data['email']}',
                password = '{data['password']}'
                WHERE id={id};""")
        query_params = (id,)

        with conn.cursor() as cur:
            cur.execute(query)
            conn.commit()
            result = find_one('users', id)

        return result, 200

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

    def delete(self, resource_id):
        return delete_one('users', resource_id)

    def put(self, resource_id):
        data = request.json
        print(data['username'])
        return update_one_user('users', data, resource_id)



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
