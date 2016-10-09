\c noteapp_db;

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  subject VARCHAR,
  content VARCHAR,
  version INTEGER
);
