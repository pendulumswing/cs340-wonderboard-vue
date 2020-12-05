from .resources import *


@api_rest.route('/board_users')
class BoardUsers(Resource):

    # Get all board_users
    def get(self):
        return find_all('board_users'), 200

    # Create board_user
    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO
                            board_users (board, "user")
                            VALUES ('{data['board']}',
                            '{data['user']}')
                            RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('board_users', id)

        return result, 201


@api_rest.route('/board_users/<int:resource_id>')
class BoardUser(Resource):

    # Get board_user by id
    def get(self, resource_id):
        return find_one('board_users', resource_id), 200

    # Delete board_user by id
    def delete(self, resource_id):
        return delete_one('board_users', resource_id)
