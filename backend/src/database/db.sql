CREATE DATABASE tarefasdb

CREATE TABLE tarefas(
    id SERIAL PRIMARY KEY,
    title VARCHAR (255) UNIQUE,
    description VARCHAR (255)
);