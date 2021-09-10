const express = require('express');
const userRoutes = require('../components/user/routes')
const messageRoutes = require('../components/message/routes')

function router(server) {
    server.use('/user', userRoutes);
    server.use('/message', messageRoutes);
}

module.exports = router;