CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(254),
    password_hash VARCHAR(100),
    role VARCHAR(50),
    last_seen DATE
);

-- New projects table
CREATE TABLE user_projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lab_id VARCHAR(64),                     -- Stores lab name basicaly.
    project_id VARCHAR(64),                 -- Stores python uuid.UUID strings like.
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE courses (
    id SMALLSERIAL PRIMARY KEY,
    course_name VARCHAR(100),
    description TEXT
);

CREATE TABLE users_courses (
    id BIGSERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    course_id SMALLINT REFERENCES courses(id) ON DELETE CASCADE,
    max_score SMALLINT,
    user_score SMALLINT
);

CREATE TABLE progress_tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id SMALLINT REFERENCES courses(id) ON DELETE CASCADE,
    --task_id SMALLINT REFERENCES tasks(id),
    task_id VARCHAR(64),
    user_attempts SMALLINT,
    score SMALLINT
);

CREATE TABLE progress_labs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    --lab_id SMALLINT REFERENCES labs(id),
    lab_id VARCHAR(64),
    passed BOOLEAN,         -- Stores True/False
    checklog JSONB,         -- Stores lists/dictionaries with boolean values
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lab_check_in_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    --lab_id SMALLINT REFERENCES labs(id),
    lab_id VARCHAR(64),
    in_progress BOOLEAN
);

-- Stores user additional credentials for accessing lab project.
CREATE TABLE user_lab_creds (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    password_lab VARCHAR(100),
    user_id_lab VARCHAR(64)
);

-- Available roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(64)
);


-- CREATE DEMO USER WITH LAB

INSERT INTO users (name, surname, email, password_hash, role, last_seen)
VALUES (
    'Ivan',
    'Ivanov',
    'example@mail.ru',
    -- Hash 1234
    '$2b$12$S.g/Zn9BdKFyf59a1KGqEe73nA1yGr0cUmqvXerSYYW5aoUh1GizK',
    'user',
    CURRENT_DATE
);

-- Insert a project for the demo user
INSERT INTO user_projects (user_id, lab_id, project_id)
VALUES (
    1,                          -- DEMO user ID
    'routing-in-ip-networks',   -- Example lab ID (up to 64 chars)
    '4d655bbb-13be-45c7-be74-9486db187e7f'  -- Project_id
);


-- CREATE DUMMY USER WITH LAB

INSERT INTO users (name, surname, email, password_hash, role, last_seen)
VALUES (
    'Dummy',
    'Dummy2',
    'dummy@mail.ru',
    -- Hash 1234
    '$2b$12$S.g/Zn9BdKFyf59a1KGqEe73nA1yGr0cUmqvXerSYYW5aoUh1GizK',
    'user',
    CURRENT_DATE
);

-- Insert a project for the demo user
INSERT INTO user_projects (user_id, lab_id, project_id)
VALUES (
    2,                          -- DEMO user ID
    'routing-in-ip-networks',   -- Example lab ID (up to 64 chars)
    '4d655bbb-13be-45c7-be74-9486db187e7f'  -- Project_id
);


-- Fill in roles table
INSERT INTO roles (role)
VALUES ('user');
INSERT INTO roles (role)
VALUES ('admin');


-- CREATE ADMIN USER

INSERT INTO users (name, surname, email, password_hash, role, last_seen)
VALUES (
    'Name',
    'Surname',
    'admin8782@mail.ru',
    -- Hash yaWCbmzf
    '$2b$12$NN2UNbcZfskJDXkpzZx69e2T/hiM7UIxGTDPieX5rzfXUiQXXLpRa',
    'admin',
    CURRENT_DATE
);
