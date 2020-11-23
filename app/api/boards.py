from .resources import *


def update_one_board(table, data, id):
    conn = get_connection()
    query = (f"""UPDATE {table}
            SET name = '{data['name']}',
            creator = '{data['creator']}',
            color = '{data['color']}'
            WHERE id={id};""")
    print(f"query: {query}")
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('boards', id)

    return result, 200


@api_rest.route('/boards')
class Board(Resource):

    # get all boards
    def get(self):
        return find_all('boards'), 200

    # insert board
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

    # finding all boards where all user boards fit a userId (or creator)

    def get(self, resource_id):
        print(resource_id)
        return find_one('boards', resource_id), 200

    # def get(self, resource_id):
    #     return find_one('users', resource_id), 200

    # delete board based on boardId

    def delete(self, resource_id):
        return delete_one('boards', resource_id)


    #update board based on boardId

    def put(self, resource_id):
        data = request.json
        return update_one_board('boards', data, resource_id)
