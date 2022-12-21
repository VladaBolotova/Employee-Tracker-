const app = require('express').Router();

app.use(require('./routes.js'));

module.exports = app;