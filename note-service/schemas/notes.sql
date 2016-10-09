\c noteapp_db;

CREATE TABLE notes (
  subject VARCHAR PRIMARY KEY,
  content VARCHAR,
  version INTEGER
);
