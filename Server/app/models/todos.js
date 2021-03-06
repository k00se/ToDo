var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

priorities = ['Low', 'Medium', 'High', 'Critical'];


var todoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true},
    todo: { type: String, required: true },
    description: { type: String },
    
    
    dateCreated: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false},
    priority: {type: String, enum: priorities},

    file: {
        filename: { type: String },
        originalName: { type: String },
        dateUploaded: { type: Date, default: Date.now}
    }
});


module.exports = Mongoose.model('Todo', todoSchema);