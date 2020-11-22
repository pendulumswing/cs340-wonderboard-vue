CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Fill the table

-- users-------------------------------------------------
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('TOMCAT', 'Micheal', 'Jackson', 'mj@mj.com', 'password123');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('Jan2000', 'Jan', 'Philmore', 'jp@jp.com', 'password123');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('best_User_Name', 'Kate', 'Lopez', 'KL@KL.com', 'password1');


CREATE TABLE IF NOT EXISTS boards(
    id SERIAL PRIMARY KEY,
    creator INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE
);

-- boards -----------------------------------------------
INSERT INTO boards(creator, name, color) VALUES (1, 'Thriller', 'blue lighten-3');
INSERT INTO boards(creator, name, color) VALUES (1, 'Dangerous', 'green lighten-3');
INSERT INTO boards(creator, name, color) VALUES (2, 'Project Infinity', 'purple lighten-3');
INSERT INTO boards(creator, name, color) VALUES (2, 'Sandwich Shop', 'orange lighten-3');
INSERT INTO boards(creator, name, color) VALUES (3, 'IntellJ Studio', 'purple lighten-3');
INSERT INTO boards(creator, name, color) VALUES (3, 'Bash Scripting', 'blue lighten-3');


CREATE TABLE IF NOT EXISTS lists(
    id SERIAL PRIMARY KEY,
    board INTEGER NOT NULL,
    creator INTEGER,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    index INTEGER NOT NULL,
    FOREIGN KEY (board) REFERENCES boards(id) ON DELETE CASCADE,
    FOREIGN KEY (creator) REFERENCES users(id) ON DELETE SET NULL
);


-- lists -------------------------------------------------

-- lists 3 list

INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'Backlog', 'white', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'In Progress', 'white', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'Complete', 'white', 3);

INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'Backlog', 'white', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'In Progress', 'white', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'Complete', 'white', 3);

INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'Backlog', 'white', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'In Progress', 'white', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'Complete', 'white', 3);


CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    list INTEGER NOT NULL,
    creator INTEGER,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (list) REFERENCES lists(id) ON DELETE CASCADE
);


-- task --------------------------------------------------

-- 3 tasks for each list, also when creating a task, create a task user

INSERT INTO tasks ("list", creator, name, description) VALUES (1, 1, 'task1', 'description1');

INSERT INTO tasks ("list", creator, name, description) VALUES (2, 1, 'task2', 'description2');

INSERT INTO tasks ("list", creator, name, description) VALUES (3, 1, 'task3', 'description3');

INSERT INTO tasks ("list", creator, name, description) VALUES (4, 2, 'task1', 'description1');

INSERT INTO tasks ("list", creator, name, description) VALUES (5, 2, 'task2', 'description2');

INSERT INTO tasks ("list", creator, name, description) VALUES (6, 2, 'task3', 'description3');

INSERT INTO tasks ("list", creator, name, description) VALUES (7, 3, 'task1', 'description1');

INSERT INTO tasks ("list", creator, name, description) VALUES (8, 3, 'task2', 'description2');

INSERT INTO tasks ("list", creator, name, description) VALUES (9, 3, 'task3', 'description3');



CREATE TABLE IF NOT EXISTS board_users(
    id SERIAL PRIMARY KEY,
    board INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    FOREIGN KEY (board) REFERENCES boards(id) ON DELETE CASCADE,
    FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE
);

-- board user -------------------------------------------

-- board (id 1) has two users (id 1, 2)
INSERT INTO board_users(board, "user") VALUES (1, 1);
INSERT INTO board_users(board, "user") VALUES (1, 2);

INSERT INTO board_users(board, "user") VALUES (2, 1);

INSERT INTO board_users(board, "user") VALUES (3, 2);

INSERT INTO board_users(board, "user") VALUES (4, 2);

INSERT INTO board_users(board, "user") VALUES (5, 3);

INSERT INTO board_users(board, "user") VALUES (6, 3);


CREATE TABLE IF NOT EXISTS task_users(
    id SERIAL PRIMARY KEY,
    task INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    FOREIGN KEY (task) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE
);


-- task user --------------------------------------------

-- Two users (id 1,2) on 1 task (id 1)
INSERT INTO task_users (task, "user") VALUES (1, 1);
INSERT INTO task_users (task, "user") VALUES (1, 2);

INSERT INTO task_users (task, "user") VALUES (2, 1);

INSERT INTO task_users (task, "user") VALUES (3, 1);


INSERT INTO task_users (task, "user") VALUES (4, 2);

INSERT INTO task_users (task, "user") VALUES (5, 2);

INSERT INTO task_users (task, "user") VALUES (6, 2);


INSERT INTO task_users (task, "user") VALUES (7, 2);

INSERT INTO task_users (task, "user") VALUES (8, 2);

INSERT INTO task_users (task, "user") VALUES (9, 2);





