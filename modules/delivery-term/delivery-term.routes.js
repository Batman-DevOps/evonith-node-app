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
} = require('./delivery-term.controller');
// const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { isAuthenticated } = true;

sessions.Session.prototype.authenticate = (req, banner, cb) => {
    try {
        req.session.bannerInfo = banner
        req.session.banner = banner.email
        cb();
    } catch (error) {
        cb(error);
    }
}

routes.get('/deliveryTerm/getAll', getAll);
// routes.get('/deliveryTerm/getById/:id', isAuthenticated, getById);
// routes.post('/deliveryTerm/create', isAuthenticated, create);
// routes.put('/deliveryTerm/update', isAuthenticated, update);
// routes.delete('/deliveryTerm/delete', _delete);
// routes.put('/deliveryTerm/uploadPicture', upload.single(`file`), uploadPicture);
module.exports = routes;