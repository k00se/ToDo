'use strict'

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (app, config) {
    app.use('/api', router);


    router.route('/users').get(function (req, res, next) {
        logger.log('Get all users', 'verbose');
        res.status(200).json({ message: "get all users" });



    });

    router.route('/users/:userId').get(function (req, res, next) {
        logger.log('Get all users')
        res.status(200).json({ message: "get all users" });
    });


    router.get('/user/:id', function (req, res, next) {
        logger.log("Get user " + req.params.id, "verbose");
        res.status(200).json({ id: req.params.id });
    });




    router.post('/users', function (req, res, next) {
        logger.log('Create User', 'verbose');

        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });
};