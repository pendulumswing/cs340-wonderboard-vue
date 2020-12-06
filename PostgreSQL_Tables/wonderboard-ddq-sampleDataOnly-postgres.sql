-- Clear tables
TRUNCATE users RESTART IDENTITY CASCADE;


-- users-------------------------------------------------
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('TOMCAT', 'Michael', 'Jackson', 'mj@mj.com', 'password123');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('Jan2000', 'Jan', 'Philmore', 'jp@jp.com', 'password123');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('best_User_Name', 'Kate', 'Lopez', 'KL@KL.com', 'password1');



-- boards -----------------------------------------------
INSERT INTO boards(creator, name, color) VALUES (1, 'Thriller', 'blue lighten-3');
INSERT INTO boards(creator, name, color) VALUES (1, 'Dangerous', 'green lighten-3');
INSERT INTO boards(creator, name, color) VALUES (2, 'Project Infinity', 'purple lighten-3');
INSERT INTO boards(creator, name, color) VALUES (2, 'Sandwich Shop', 'orange lighten-3');
INSERT INTO boards(creator, name, color) VALUES (3, 'IntellJ Studio', 'purple lighten-3');
INSERT INTO boards(creator, name, color) VALUES (3, 'Bash Scripting', 'blue lighten-3');



-- lists -------------------------------------------------

-- lists 3 list

INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'Backlog', 'red lighten-3', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'In Progress', 'blue lighten-3', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (1, 1, 'Complete', 'green lighten-3', 3);

INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'Backlog', 'orange lighten-3', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'In Progress', 'purple lighten-3', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (3, 2, 'Complete', 'blue lighten-3', 3);

INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'Backlog', 'red lighten-3', 1);
INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'In Progress', 'green lighten-3', 2);
INSERT INTO lists (board, creator, name, color, "index") VALUES (5, 3, 'Complete', 'orange lighten-3', 3);



-- tasks --------------------------------------------------

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



-- board user -------------------------------------------

-- board (id 1) has two users (id 1, 2)
INSERT INTO board_users(board, "user") VALUES (1, 1);
INSERT INTO board_users(board, "user") VALUES (1, 2);
INSERT INTO board_users(board, "user") VALUES (2, 1);
INSERT INTO board_users(board, "user") VALUES (3, 2);
INSERT INTO board_users(board, "user") VALUES (4, 2);
INSERT INTO board_users(board, "user") VALUES (5, 3);
INSERT INTO board_users(board, "user") VALUES (6, 3);


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





