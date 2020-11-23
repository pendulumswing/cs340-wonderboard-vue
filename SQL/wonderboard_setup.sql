CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS boards(
    id SERIAL PRIMARY KEY,
    creator INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE
);

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

CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    list INTEGER NOT NULL,
    creator INTEGER,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (list) REFERENCES lists(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS board_users(
    id SERIAL PRIMARY KEY,
    board INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    FOREIGN KEY (board) REFERENCES boards(id) ON DELETE CASCADE,
    FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_users(
    id SERIAL PRIMARY KEY,
    task INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    FOREIGN KEY (task) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE
);