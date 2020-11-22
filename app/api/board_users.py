from .resources import *


# def update_one_board_user(table, data, id):
#         conn = get_connection()
#         query = (f"""UPDATE {table}
#                 SET name = '{data['name']}',
#                 creator = '{data['creator']}',
#                 color = '{data['color']}'
#                 WHERE id={id};""")
#         query_params = (id,)

#         with conn.cursor() as cur:
#             cur.execute(query)
#             conn.commit()
#             result = find_one('boards', id)

#         return result, 200


@api_rest.route('/board_users')
class BoardUsers(Resource):

    # get all boards
    def get(self):
        return find_all('board_users'), 200

    # insert board_user
    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO 
                            board_users ("user", board)
                            VALUES ('{data['user']}',
                            '{data['board']}')
                            RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('board_users', id)

        return result, 201


@api_rest.route('/board_users/<int:resource_id>')
class BoardUser(Resource):

    # finding user boards based on boardId

    def get(self, resource_id):
        print(resource_id)
        return find_one('board_users', resource_id), 200

    # def get(self, resource_id):
    #     return find_one('users', resource_id), 200

    # delete board_user based on boardUserId
    
    def delete(self, resource_id):
        return delete_one('board_users', resource_id)


    #update board_user based on boardUserId

    # def put(self, resource_id):
    #     data = request.json
    #     return update_one_user('board_users', data, resource_id)
