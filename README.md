# Wonderboard

Kanban board app with persistent data storage. 

![](img/wonderboard-board.png)

## Installation
This site uses Vue/Vuetify on the client-side, Flask and a PostgreSQL database on the backend, and is hosted on Heroku.

For everything to work, you will need a PostgreSQL database.The DATABASE_URL environment variable should be placed in the `.flaskenv` file. The project includes the PostgreSQL Data Definition Queries (ddq) needed to correctly setup the database tables and populate sample data.

Setup and run Flask server:

```
$ python -m venv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
$ python run.py
```

Setup and run client:

```
$ npm install
$ npm run serve
```

Setup on Heroku:

```
$ heroku apps:create
$ heroku git:remote --app <app-name>
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
$ git push heroku
```

## Functionality and Database Design
Database Tables:
* users
* boards
* lists
* tasks
* boardusers
* taskusers

#### Entity Realtionship Diagram
![](img/_ERD.png)

#### Schema
![](img/_Schema.png)

#### users

* A new user can be created with the 'ADD USER' button (CREATE).
* All users are fetched from the the database and listed here (READ).
* A user can be updated by selecting the pencil icon on the user tile. A dialog will popup to edit any fields. (UPDATE)
* A user can also be deleted with the delete icon (DELETE).

<br>

  **columns**
    
    id
    first_name
    last_name
    email
    username
    password 

#### boards

* A new board can be created with the 'ADD BOARD' button (CREATE).
* All boards are fetched from the the database and listed here, based on route parameter 'userId' (READ).
* A board can be updated by selecting the pencil icon on the board tile. A dialog will popup to edit any fields. (UPDATE).
* A board can also be deleted with the delete icon (DELETE).

**columns**

    id
    creator
    name
    color 

notes
The 'creator' column keeps track of the user that initially created the board. This is important for site functionality for two reasons:

    Only the creator can edit or delete a board.
    The site url for a board requires a user id to navigate to the board correctly. 

#### lists

* A new list can be created with the 'ADD LIST' button (CREATE).
* All lists are fetched based on route parameter 'boardId' (READ).
* A list can be updated by selecting the pencil icon on the list tile. A dialog will popup to edit any fields. (UPDATE).
* A list can also be deleted with the delete icon (DELETE).

**columns**

    id
    board
    creator
    name
    color
    index 

#### tasks

    A new task can be created with the 'ADD TASK' button (CREATE).
    All tasks are fetched based on each list id (READ).
    A task can be updated by selecting the pencil icon on the tile. A dialog will popup to edit any fields. (UPDATE).
    A task can also be moved to a new list by updated its list attribute (UPDATE).
    A task can also be deleted with the delete icon. There is no warning for this action. (DELETE). 

**columns**

    id
    list
    creator
    name
    description 

#### taskUsers
Many-to-Many relationship table. taskUsers is used to join tasks and users tables.

* A new task_user can be created with the 'add user' button on the task tile. There can be zero, one, or multiple users assigned to each task (CREATE).
* A task_user can be deleted with the delete icon next to the name. There is no warning for this action. (DELETE). 

**columns**

    id
    task
    user 

#### boardUsers
Many-to-Many relationship table. boardUsers is used to join boards and users tables.

* A new board_user can be created with the 'add member' button at the top of the board (CREATE).
* A board_user can be deleted with the delete icon next to the name. This is only available for members that are not the original creator of the board. There is no warning for this action. (DELETE). 

**columns**

    id
    board
    user 


## Screenshots

**Users**
![](img/users-cropped.png)

**Boards**
![](img/boards-cropped.png)

**Lists**
![](img/lists.png)

**Add Member to Board**
![](img/lists-addMember-annotated.png)

**Add User to Task**
![](img/lists-addUser-annotated.png)

**Dialog Overlay**
![](img/lists-withDialog.png)

#### Dialogs

**User** - Create, Update, Delete

<div style="padding: 10px; overflow: hidden;">
  <img src="img/dialog-user-create.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
  <img src="img/dialog-user-update.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>  
  <img src="img/dialog-user-delete.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
</div>

**Board** - Create, Update, Delete

<div style="padding: 10px; overflow: hidden;">
  <img src="img/dialog-board-create.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
  <img src="img/dialog-board-update.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>  
  <img src="img/dialog-board-delete.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
</div>

**List** - Create, Update, Delete

<div style="padding: 10px; overflow: hidden;">
  <img src="img/dialog-list-create.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
  <img src="img/dialog-list-update-null.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>  
  <img src="img/dialog-list-delete.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
</div>

**Task** - Create, Update, Delete

<div style="padding: 10px; overflow: hidden;">
  <img src="img/dialog-task-create.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
  <img src="img/dialog-task-update-null.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>  
  <img src="img/dialog-task-delete.png" alt="create board dialog" style="float:left; padding: 10px;" width="250"/>   
</div>

<!-- ![](img/wonderboard-board.png)
![](img/wonderboard-new-task.png)
![](img/wonderboard-board-new-task.png)
![](img/wonderboard-new-board.png)
![](img/wonderboard-boards-1.png)
![](img/wonderboard-users.png)
![](img/wonderboard-add-member.png) -->
