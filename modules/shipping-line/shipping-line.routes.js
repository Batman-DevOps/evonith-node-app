const express = require('express');
const bannerRoutes = require('express').Router();
const sessions = require('express-session');
const app = express();
// const multer = require('multer');
// const upload = multer();

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
} = require('./shipping-line.controller');
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

bannerRoutes.get('/shippingLines/getAll', getAll);
// bannerRoutes.get('/banners/getById/:id', isAuthenticated, getById);
// bannerRoutes.post('/banners/create', isAuthenticated, create);
// bannerRoutes.put('/banners/update', isAuthenticated, update);
// bannerRoutes.delete('/banners/delete', _delete);
// bannerRoutes.put('/banners/uploadPicture', upload.single(`file`), uploadPicture);
module.exports = bannerRoutes;