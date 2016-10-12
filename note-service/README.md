# Note-Service

The microservice for Note-Application.

It is built using [Express](http://expressjs.com/) and it uses [PostgreSQL](https://www.postgresql.org/) as the database. For authentication, it uses [Passport](http://passportjs.org/) to manage the session.


## Getting started

```shell
cd note-service/
npm install
```

### Postgres Setup

For simplicity, a schema script has been created under *./schemas/notes.sql*, it will auto generate the database (noteapp_db) and the table (notes, users) needed for this application.

```shell
cd note-service/schemas/
psql -f notes.sql
```

### DataBase Connections

In order to connect to the database, insert the database's url inside `DB_URL` in *./settings.js*, e.g. `postgres://localhost:5432/noteapp_db`
