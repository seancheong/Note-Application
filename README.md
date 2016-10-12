# Note-Application

Note Application is a simple Web application.
This application manages a list of notes. A note consists of a subject and a body.

Inside this repository, you will see two folder, note-ui and note-service.
note-ui is the user interface for the application, while note-service is the microservice.

***

## Note-UI

It is built using [Angular 1.4.12](https://angularjs.org/). It uses [Karma](https://karma-runner.github.io) as the test runner and [Jasmine](http://jasmine.github.io/) as the test framework.
Styles are written in [Less](http://lesscss.org/).
The build system for the UI is [Grunt](http://gruntjs.com/).


### Getting started

```shell
cd note-ui/
npm install
bower install
```

**build** - build UI and run unit tests and put the artifacts inside *./build* folder

```shell
grunt build
```

**watch** - it will watch for code changes. It will notify the terminal every time an error found or unit tests broken

```shell
grunt watch
```

**compile** - creates the distributable final artifacts, with scripts uglified and minified
and html template processed and places it in the *./bin* folder

```shell
grunt compile
```

**clean** - cleans the build artifacts directories

```shell
grunt clean
```

### Microservice Connections

In order to call the APIs inside the microservice server, insert the API base url inside `_API_BASE` in *./src/app/settings/settings.js*, e.g. `http://<IP_ADDRESS>:3000`


### Code coverage

Whenever `grunt build/watch` is executed, Karma runs all tests with `*.spec.js` extension. After that, a coverage report is generated under the `unit_test_coverage/report` directory
using [karma-coverage](https://github.com/karma-runner/karma-coverage), where a graphical report
of line-by-line code coverage is made available.

***

## Note-Service

It is built using [Express](http://expressjs.com/) and it uses [PostgreSQL](https://www.postgresql.org/) as the database. For authentication, it uses [Passport](http://passportjs.org/) to manage the session.


### Getting started

```shell
cd note-service/
npm install
```

#### Postgres Setup

For simplicity, a schema script has been created under *./schemas/notes.sql*, it will auto generate the database (noteapp_db) and the table (notes, users) needed for this application.

```shell
cd note-service/schemas/
psql -f notes.sql
```

#### DataBase Connections

In order to connect to the database, insert the database's url inside `DB_URL` in *./settings.js*, e.g. `postgres://localhost:5432/noteapp_db`
