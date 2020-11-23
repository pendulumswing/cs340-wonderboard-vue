from .resources import *
 
def update_one_task(table, data, id):
    conn = get_connection()
    query = (f"""UPDATE {table}
            SET list = '{data['list']}',
            name = '{data['name']}',
            description = '{data['description']}',
            creator = '{data['creator']}'
            WHERE id={id};""")
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        result = find_one('tasks', id)

    return result, 201

@api_rest.route('/tasks')
class Tasks(Resource):

    # finding all lists
    def get(self):
        return find_one('tasks'), 200

    # insert task
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

    # finding all tasks based on board id

    def get(self, resource_id):
        # print(resource_id)
        return find_one('tasks', resource_id), 200

    # delete board based on listId

    def delete(self, resource_id):
        # print(resource_id)
        return delete_one('tasks', resource_id)
        
    #update board based on boardid

    def put(self, resource_id):
        data = request.json
        return update_one_task('tasks', data, resource_id)
