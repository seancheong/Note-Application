# Note-UI

The user interface for Note-Application.

It is built using [Angular 1.4.12](https://angularjs.org/). It uses [Karma](https://karma-runner.github.io) as the test runner and [Jasmine](http://jasmine.github.io/) as the test framework.
Styles are written in [Less](http://lesscss.org/).
The build system for the UI is [Grunt](http://gruntjs.com/).


## Getting started

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


## Microservice APIs

All the microservice APIs are defined in `_API_URL` inside *./src/app/settings/settings.js*


## Code coverage

Whenever `grunt build/watch` is executed, Karma runs all tests with `*.spec.js` extension. After that, a coverage report is generated under the `unit_test_coverage/report` directory
using [karma-coverage](https://github.com/karma-runner/karma-coverage), where a graphical report
of line-by-line code coverage is made available.
