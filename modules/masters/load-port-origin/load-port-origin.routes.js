const express = require('express');
const routes = require('express').Router();
const sessions = require('express-session');
const app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "longlivenodejsafterallitsjavascript3cheershiphiphurray",
    saveUninitialized: true,
    cookie: { maxAge: oneDay * 2 },
    resave: false
}));

const {
    create,
    update,
    // uploadPicture,
    getAll,
    getById,
    _delete
} = require('./load-port-origin.controller');
// const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { isAuthenticated } = true;

sessions.Session.prototype.authenticate = (req, loadPortOrigin, cb) => {
    try {
        req.session.loadPortOriginInfo = loadPortOrigin
        req.session.loadPortOrigin = loadPortOrigin.email
        cb();
    } catch (error) {
        cb(error);
    }
}

routes.get('/loadPortOrigin/getAll', getAll);
// routes.get('/loadPortOrigin/getById/:id', isAuthenticated, getById);
// routes.post('/loadPortOrigin/create', isAuthenticated, create);
// routes.put('/loadPortOrigin/update', isAuthenticated, update);
// routes.delete('/loadPortOrigin/delete', _delete);
// routes.put('/loadPortOrigin/uploadPicture', upload.single(`file`), uploadPicture);
module.exports = routes;