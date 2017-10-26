var winston = require('winston');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var logDir = 'log';

var logDir = 'log';
var tsFormat = () => (new Date()).toLocaleTimeString();

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var logger = new (winston.Logger)({
    transports: [

        new (winston.transports.File)({
            filename: `${logDir}/results.log`,
            timestamp: tsFormat,
            level: env === 'development' ? 'debug' : 'ninfo'
        }),

        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/-results.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: env === 'development' ? 'verbose' : 'info'
        })
    ]
});

log = function (message, level) {
    level = level || 'info';
    logger.log(level, message);
};

exports.log = log;