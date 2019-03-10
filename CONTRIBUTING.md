# Contributing to Is My Train Delayed

First off, thank you for contributing.

Below you'll find sections with specific information about the overall architecture of the application and any processes that are set up to support its development.


### Heroku

This application has a pipeline that I've set up on Heroku:
- Commits to `develop` will update https://is-my-train-delayed-beta.herokupapp.com for testing pre-release features
- Commits to `master` will update https://is-my-train-delayed-rc.herokuapp.com, which is a staging environment to prepare for production release
- Production releases must be manually triggered


### Development server

Run `npm start` for a dev server. Your default browser should open a new tab with `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Code scaffolding

Run `ng g component component-name` to generate a new Angular component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module`.

Make sure generated files go in a logical place. If you're unsure, just [open an issue](https://github.com/danieldafoe/is-my-train-delayed/issues/new) and ask!


### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).