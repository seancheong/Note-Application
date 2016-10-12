DROP DATABASE IF EXISTS noteapp_db;
CREATE DATABASE noteapp_db;

\c noteapp_db;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  subject VARCHAR,
  content VARCHAR,
  version INTEGER,
  username VARCHAR
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR PRIMARY KEY,
  password VARCHAR
);
