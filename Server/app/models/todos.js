var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    todo: { type: String },
    description: { type: String },
    registerDate: { type: Date, default: Date.now }
});


module.exports = Mongoose.model('Todo', todoSchema);