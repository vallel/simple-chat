const express = require('express');
const userRoutes = require('../components/user/routes')

function router(server) {
    server.use('/user', userRoutes);
}

module.exports = router;