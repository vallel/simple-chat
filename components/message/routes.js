const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // get messages
});

router.post('/', (req, res) => {
    // add message
});

router.delete('/:id', (req, res) => {
    // delete message
});

module.exports = router;