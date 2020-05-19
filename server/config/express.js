const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),

    cors = require('cors'),
    bodyParser = require('body-parser'),
   internshipRouter = require('../routes/internships.server.routes');
    marketRouter = require('../routes/markets.server.routes');
    businessProfileRouter = require('../routes/businessProfiles.server.routes');
    studentProfileRouter = require('../routes/studentProfile.server.routes');


module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());


    app.use(cors());
    app.use(express.json({ extended: false }));

    // add a router'
   app.use('/api/Internship', internshipRouter);
    app.use('/api/Market', marketRouter);
   app.use('/api/businessProfile', businessProfileRouter);
    app.use('/api/studentProfile', studentProfileRouter);
    app.use('/api/users', require('../routes/api/users'));
    app.use('/api/auth', require('../routes/api/auth'));
    app.use('/api/payments', require('../routes/payments.server.routes'));


    if (process.env.NODE_ENV === 'production' || true) {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

