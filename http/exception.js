function Exception(error, details) {
    return {
        error: error,
        details: details,
    };
}

module.exports = Exception;