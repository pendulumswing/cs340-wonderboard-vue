from .resources import *


def update_one_list(table, data, id):

    conn = get_connection()
    query = (f"""UPDATE {table}
            SET board = '{data['board']}',
            name = '{data['name']}',
            index = '{data['index']}',
            creator = '{data['creator']}',
            color = '{data['color']}'
            WHERE id={id};""")
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('lists', id)

    return result, 200


@api_rest.route('/lists')
class List(Resource):

    # finding all lists
    def get(self):
        return find_all('lists'), 200

    # insert list
    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO lists
                           (board, name, index, creator, color)
                           VALUES ('{data['board']}',
                           '{data['name']}',
                           '{data['index']}',
                           '{data['creator']}',
                           '{data['color']}')
                           RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('lists', id)

        return result, 201



@api_rest.route('/lists/<int:resource_id>')
class Lists(Resource):

    # finding all lists based on boardId
    def get(self, resource_id):
        # print(resource_id)
        return find_one('lists', resource_id), 200

    # delete board based on listId
    def delete(self, resource_id):
        # print(resource_id)
        return delete_one('lists', resource_id)


    #update board based on boardId
    def put(self, resource_id):
        data = request.json
        return update_one_list('lists', data, resource_id)
