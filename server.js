require('rootpath')();
const express = require('express');
const app = express();
const config = require('./config/config.json');

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
var cors = require('cors');
let whitelist = ['http://localhost:4200', 'https://evonith-ui.web.app'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token',
        'Content-Range', 'Access-Control-Allow-Methods', '*'],
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// api routes
const allRoutes = require('./routes');
app.use(config.app.prefix, allRoutes);
// app.use('/shippingLines', require('./shippingLines/shippingLines.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));