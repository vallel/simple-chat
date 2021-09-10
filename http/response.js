const success = (req, res, message, statusCode) => {
    res.status(statusCode || 200).send({
        error: '',
        body: message,
    });
};

const error = (req, res, message, statusCode, details) => {
    console.error(`[ERROR] ${details}`);

    res.status(statusCode || 500).send({
        error: message,
        body: '',
    });
};

module.exports = {
    success,
    error,
};