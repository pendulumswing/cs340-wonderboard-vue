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

#Database initialization
# DATABASE_URL = os.getenv("DATABASE_URL")
# DATABASE_URL = os.getenv("PW_DATABASE_URL")
# DATABASE_URL = os.getenv("JB_DATABASE_URL")
# conn = psycopg2.connect(DATABASE_URL)
# cur = conn.cursor()

class SecureResource(Resource):
    """ Calls require_auth decorator on all requests """
    method_decorators = [require_auth]


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
