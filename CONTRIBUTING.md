# Contributing to Is My Train Delayed

First off, thank you for contributing.

Below you'll find sections with specific information about editing the different types of code contained within this project. Please follow the guidelines below or else it is unlikely your pull request will be accepted.

## HTML

Markup is written in [Pug](http://pugjs.org) which is then rendered on the server into HTML and sent to the client.

If you need to edit the `index.pug` file, you will also need to find and edit the same markup within `app.js`. There are React components in there that (unfortunately) I coded in such a way that they reproduce the same HTML as the Pug and so changes need to be duplicated.

This will be refactored eventually.

## CSS

**Never** edit the CSS directly. If you're creating a component, please prefix the file name with an underscore and place it in a `components/` directory. (e.x., `_timer.scss`)

## JavaScript

### Client

If you end up touching `app.js` to complete some changes, you will need to run Webpack from the command line in order to build the project for production.

To do this, you need only open terminal/command line and run `webpack --progress -p`. This will trigger Webpack's production configuration.

### Server

No extra compilation or bundling is needed for `server.js` at this time.