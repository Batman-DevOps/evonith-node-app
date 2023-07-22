require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config.json');

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
const allRoutes = require('./routes');
app.use(config.app.prefix, allRoutes);
// app.use('/shippingLines', require('./shippingLines/shippingLines.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));