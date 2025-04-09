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
    user_id INTEGER REFERENCES users(id),
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
    user_id SERIAL REFERENCES users(id),
    course_id SMALLINT REFERENCES courses(id),
    max_score SMALLINT,
    user_score SMALLINT
);

CREATE TABLE progress_tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id SMALLINT REFERENCES courses(id),
    --task_id SMALLINT REFERENCES tasks(id),
    task_id VARCHAR(64),
    user_attempts SMALLINT,
    score SMALLINT
);

CREATE TABLE progress_labs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    --lab_id SMALLINT REFERENCES labs(id),
    lab_id VARCHAR(64),
    passed BOOLEAN,         -- Stores True/False
    checklog JSONB,         -- Stores lists/dictionaries with boolean values
    created_at TIMESTAMP DEFAULT NOW()
);

-- Stores user additional credentials for accessing lab project.
CREATE TABLE user_lab_creds (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    password_lab VARCHAR(100),
    user_id_lab VARCHAR(64)
);


-- CREATE DEMO USER WITH LAB

INSERT INTO users (name, surname, email, password_hash, role, last_seen)
VALUES (
    'Ivan',
    'Ivanov',
    'example@mail.ru',
    -- Always hash passwords in real applications! (That's the hash)
    '$2b$12$vA3VQA8H.UcpFJ882cSgpephTF8rUg0RpxhuLrdOR3px92I6yNEsK',
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
