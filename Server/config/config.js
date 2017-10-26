var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';

var config = {


development: {
root: rootPath,
app: { name: ' todos' },
port: 5000,
db: 'mongodb://127.0.0.1/todos-dev'
},


production: {
root: rootPath,
app: { name: ' todos' },
port: 80, 
db: 'mongodb://127.0.0.1/todos-dev' }

};
module.exports = config[env];