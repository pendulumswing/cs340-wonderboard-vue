from .resources import *


@api_rest.route('/boards')
class Board(Resource):

    # Get all boards
    def get(self):
        return find_all('boards'), 200

    # Create board
    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO boards
                            (name, creator, color)
                            VALUES ('{data['name']}',
                            '{data['creator']}',
                            '{data['color']}')
                            RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('boards', id)

        return result, 201


@api_rest.route('/boards/<int:resource_id>')
class Boards(Resource):

    # Get board by id
    def get(self, resource_id):
        return find_one('boards', resource_id), 200

    # Delete board by id
    def delete(self, resource_id):
        return delete_one('boards', resource_id)

    # Update board by id
    def put(self, resource_id):
        data = request.json
        return update_one_board('boards', data, resource_id)


def update_one_board(table, data, id):
    conn = get_connection()
    query = (f"""UPDATE {table}
            SET name = '{data['name']}',
            creator = '{data['creator']}',
            color = '{data['color']}'
            WHERE id={id};""")

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('boards', id)

    return result, 200
