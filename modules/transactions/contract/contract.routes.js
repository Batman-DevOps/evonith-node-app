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
    revise,
    getAll,
    getById,
    _delete
} = require('./contract.controller');
// const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { isAuthenticated } = true;

sessions.Session.prototype.authenticate = (req, contract, cb) => {
    try {
        req.session.contractInfo = contract
        req.session.contract = contract.email
        cb();
    } catch (error) {
        cb(error);
    }
}

routes.get('/contract/getAll', getAll);
routes.get('/contract/getById/:id', getById);
routes.post('/contract/create', create);
routes.put('/contract/update', update);
routes.put('/contract/revise', revise);
routes.delete('/contract/delete', _delete);
module.exports = routes;