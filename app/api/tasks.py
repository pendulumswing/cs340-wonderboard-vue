from .resources import *


@api_rest.route('/tasks')
class Tasks(Resource):

    # Find all tasks
    def get(self):
        return find_all('tasks'), 200

    # Insert task
    def post(self):
        data = request.json
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"""INSERT INTO tasks
                           (list, name, description, creator)
                           VALUES ('{data['list']}',
                           '{data['name']}',
                           '{data['description']}',
                           '{data['creator']}')
                           RETURNING id;""")
            conn.commit()
            id = cursor.fetchone()[0]
            result = find_one('tasks', id)

        return result, 201

@api_rest.route('/tasks/<int:resource_id>')
class Task(Resource):

    # Find task
    def get(self, resource_id):
        return find_one('tasks', resource_id), 200

    # Delete task
    def delete(self, resource_id):
        return delete_one('tasks', resource_id)

    # Update task
    def put(self, resource_id):
        data = request.json
        return update_one_task('tasks', data, resource_id)


# Update task
def update_one_task(table, data, id):
    # Check for NULL value for Creator
    if(data['creator'] == None):
        data['creator'] = 'NULL'

    conn = get_connection()
    query = (f"""UPDATE {table}
            SET list = {data['list']},
            name = '{data['name']}',
            description = '{data['description']}',
            creator = {data['creator']}
            WHERE id={id};""")

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('tasks', id)

    return result, 201
