var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');

var userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {type:String},
    password: {type:String},
    registerDate: { type: Date, default: Date.now }
});


userSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    });

    userSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = Mongoose.model('User', userSchema);

