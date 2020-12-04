from .resources import *


@api_rest.route('/lists')
class List(Resource):

    # Find all lists
    def get(self):
        return find_all('lists'), 200

    # Insert list
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

    # Find list
    def get(self, resource_id):
        # print(resource_id)
        return find_one('lists', resource_id), 200

    # Delete list
    def delete(self, resource_id):
        # print(resource_id)
        return delete_one('lists', resource_id)


    # Update list
    def put(self, resource_id):
        data = request.json
        return update_one_list('lists', data, resource_id)


def update_one_list(table, data, id):
    # Check for NULL value for Creator
    if(data['creator'] == None):
        data['creator'] = 'NULL'

    conn = get_connection()
    query = (f"""UPDATE {table}
            SET board = {data['board']},
            name = '{data['name']}',
            index = {data['index']},
            creator = {data['creator']},
            color = '{data['color']}'
            WHERE id={id};""")
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('lists', id)

    return result, 200
