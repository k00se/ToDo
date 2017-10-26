var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    registerDate: { type: Date, default: Date.now }
});


userSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    });

module.exports = Mongoose.model('User', userSchema);