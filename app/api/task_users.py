from .resources import *


@api_rest.route('/task_users')
class Task_Users(Resource):

    # Get all task users
    def get(self):
        return find_all('task_users'), 200

    # Create task_user
    def post(self):
        data = request.json
        print(data)
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO task_users
                           (task, "user")
                           VALUES ('{data['task']}',
                           '{data['user']}')
                           RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('task_users', id)

        return result, 201


@api_rest.route('/task_users/<int:resource_id>')
class Task_User(Resource):

    # Get task_user by id
    def get(self, resource_id):
        return find_one('task_users', resource_id), 200

    # Delete task_user by id
    def delete(self, resource_id):
        return delete_one('task_users', resource_id)

