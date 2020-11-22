from .resources import *


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
            cursor.execute(f"""INSERT INTO users
                           (username, first_name, last_name, email, password)
                           VALUES ('{data['username']}',
                           '{data['first_name']}',
                           '{data['last_name']}',
                           '{data['email']}',
                           '{data['password']}')
                           RETURNING id;""")
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
        # print(data['username'])
        return update_one_user('users', data, resource_id)
