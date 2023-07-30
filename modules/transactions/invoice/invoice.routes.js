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
} = require('./invoice.controller');
// const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { isAuthenticated } = true;

sessions.Session.prototype.authenticate = (req, invoice, cb) => {
    try {
        req.session.invoiceInfo = invoice
        req.session.invoice = invoice.email
        cb();
    } catch (error) {
        cb(error);
    }
}

routes.get('/invoice/getAll', getAll);
routes.get('/invoice/getById/:id', getById);
routes.post('/invoice/create', create);
routes.put('/invoice/update', update);
routes.put('/invoice/revise', revise);
routes.delete('/invoice/delete', _delete);
module.exports = routes;