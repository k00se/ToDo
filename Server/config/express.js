var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var confignode  = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
var cors = require('cors');


module.exports = function (app, config) {
    logger.log("Loading Mongoose functionality");
    mongoose.Promise = require('bluebird');
    mongoose.connect(config.db, { useMongoClient: true });
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log("Mongoose connected to the database");
        });

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
        next();
        });
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });
console.log(config.root+ '/app/controllers/*.js')
    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });

    // router.route('/users').post(function(req, res, next){
    //             logger.log('Create User', 'verbose');
    //             var user = new User(req.body);
    //             user.save()
    //             .then(result => {
    //             res.status(201).json(result);
    //             })
    //             .catch( err => {
    //             return next(err);
    //             });
    //             })

    // router.route('/users').get(function(req, res, next){
    //             logger.log('Get User', 'verbose');
    //             var query = User.find()
    //             .sort(req.query.order)
    //             .exec()
    //             .then(result => {
    //             if(result && result.length) {
    //                 res.status(200).json(result);
    //                 } else {
    //                 res.status(404).json({message: 'No users'});
    //                 }
    //                 })
    //                 .catch(err => {
    //                 return next(err);
    //                 });
    //                 })

    // router.route('/users/:userId').get(function(req, res, next){
    //                     logger.log('Get user ' + req.params.userId, 'verbose');

    //                     User.findById(req.params.userId)
    //                         .then(user => {
    //                             if(user){
    //                                 res.status(200).json(user);
    //                             } else {
    //                                 res.status(404).json({message: "No user found"});
    //                             }
    //                         })
    //                         .catch(error => {
    //                             return next(error);
    //                         });
    //                 }); 

    // router.route('/users/:userId').put(function(req, res, next){
    //                     logger.log('Update user ' + req.params.userId, 'verbose');

    //                     User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true, multi:false})
    //                         .then(user => {
    //                             res.status(200).json(user);
    //                         })
    //                         .catch(error => {
    //                             return next(error);
    //                         });
    //                 }); 

    // router.route('/users/:userId').delete(function(req, res, next)
    //     logger.log('Delete user ' + req.params.userId, 'verbose');

    //         User.remove({ _id: req.params.userId })
    //                     .then(user => {
    //                         res.status(200).json({msg: “User Deleted"});
    //                     })
    //                     .catch(error => {
    //                         return next(error);
    //                     });
    //             });




    // router.get('/user/:id', function(req, res, next){
    //     logger.log(‘Get user “ + req.params.id, “verbose”);
    //     res.status(200).json({id: req.params.id});
    //     });


    // router.get('/test/:id/:name',function(req, res, next){
    //         var id = req.params.id;
    //         var name = req.params.name;
    //         var obj = {'id' : id, ' name ' : name};
    //         res.status(200).json(obj);
    //         });

    // router.post('/login', function(req, res, next){
    //         console.log(req.body);
    //         var email = req.body.email
    //         var password = req.body.password;
    //         var obj = {'email' : email, 'password' : password};
    //         res.status(201).json(obj);
    //         });

    // var express = require('express');
    // module.exports = function (app, config) {
    // app.use(function (req, res, next) {
    // console.log('Request from ' + req.connection.remoteAddress);
    // next();
    // });


    app.use(express.static(config.root + '/public'));

    app.use(function (req, res) {
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Sever Error');
    });

    console.log("Starting application");
};

