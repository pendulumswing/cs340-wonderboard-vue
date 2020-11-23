from .resources import *


# def update_one_task_user(table, data, id):
#         conn = get_connection()
#         query = (f"""UPDATE {table}
#                 SET board = '{data['board']}',
#                 name = '{data['name']}',
#                 index = '{data['index']}',
#                 creator = '{data['creator']},
#                 color = '{data['color']}
#                 WHERE id={id};""")
#         query_params = (id,)

#         with conn.cursor() as cur:
#             cur.execute(query)
#             conn.commit()
#             result = find_one('lists', id)

#         return result, 200


@api_rest.route('/task_users')
class Task_Users(Resource):

    # finding all task users
    def get(self):
        return find_all('task_users'), 200

    # insert
    def post(self):
        data = request.json
        print(data)
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO task_users
                           ("user", task)
                           VALUES ('{data['user']}',
                           '{data['task']}')
                           RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('task_users', id)

        return result, 201



@api_rest.route('/task_users/<int:resource_id>')
class Task_User(Resource):

    # finding all task users based on boardId
    def get(self, resource_id):
        # print(resource_id)
        return find_one('task_users', resource_id), 200

    # delete task user based on taskUserId
    def delete(self, resource_id):
        # print(resource_id)
        return delete_one('task_users', resource_id)


    #update task_user based on taskUserId
    # def put(self, resource_id):
    #     # print(resource_id)
    #     return update_one_list('task_users', data, resource_id)
