const statusMessages = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal error',
};

const success = (req, res, message, statusCode) => {
    statusCode = statusCode || 200;
    let statusMessage = '';
    
    if (!message && statusMessages[statusCode]) {
        statusMessage = statusMessages[statusCode];
    }

    res.status(statusCode).send({
        error: '',
        body: statusMessage,
    });
};

const error = (req, res, message, statusCode, details) => {
    statusCode = statusCode || 500;
    
    console.error(`[ERROR] ${details}`);

    res.status(statusCode).send({
        error: message,
        body: '',
    });
};

module.exports = {
    success,
    error,
};