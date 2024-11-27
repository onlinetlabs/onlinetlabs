CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(254),
    password_hash VARCHAR(100),
    role VARCHAR(50),
    last_seen DATE
);

CREATE TABLE chatlogs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message VARCHAR(500),
    timestamp DATE
);

CREATE TABLE tasks (
    id SMALLSERIAL PRIMARY KEY,
    max_score SMALLINT,
    task TEXT,
    answer TEXT,
    max_attempts SMALLINT
);

CREATE TABLE labs (
    id SMALLSERIAL PRIMARY KEY,
    max_score SMALLINT,
    task TEXT,
    link TEXT,
    max_attempts SMALLINT
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

CREATE TABLE courses_tasks (
    id SMALLSERIAL PRIMARY KEY,
    task_id SMALLINT REFERENCES tasks(id),
    course_id SMALLINT REFERENCES courses(id)
);

CREATE TABLE courses_labs (
    id SMALLSERIAL PRIMARY KEY,
    lab_id SMALLINT REFERENCES labs(id),
    course_id SMALLINT REFERENCES courses(id)
);

CREATE TABLE progress_tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id SMALLINT REFERENCES courses(id),
    task_id SMALLINT REFERENCES tasks(id),
    user_attempts SMALLINT,
    score SMALLINT
);

CREATE TABLE progress_labs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    lab_id SMALLINT REFERENCES labs(id),
    course_id SMALLINT REFERENCES courses(id),
    user_attempts SMALLINT,
    score SMALLINT
);
