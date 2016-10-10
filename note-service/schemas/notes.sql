DROP DATABASE IF EXISTS noteapp_db;
CREATE DATABASE noteapp_db;

\c noteapp_db;

CREATE TABLE notes (
  subject VARCHAR PRIMARY KEY,
  content VARCHAR,
  version INTEGER,
  username VARCHAR
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR PRIMARY KEY,
  password VARCHAR
);
