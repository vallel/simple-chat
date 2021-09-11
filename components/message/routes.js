const express = require('express');
const router = express.Router();
const messageController = require('./controller');
const httpResponse = require('../../http/response');

router.get('/', (req, res) => {
    messageController.getList()
        .then(data => httpResponse.success(req, res, data, 200))
        .catch(error => httpResponse.error(req, res, 'Something went wrong 🙁. Please try again later.', 500, error));
});

router.post('/', (req, res) => {
    messageController.add(req.body.user, req.body.message)
        .then(data => httpResponse.success(req, res, data, 201))
        .catch(exception => httpResponse.error(req, res, exception.error, 500, exception.details));
});

router.delete('/:id', (req, res) => {
    messageController.deleteMessage(req.params.id)
        .then(data => httpResponse.success(req, res, data, 200))
        .catch(error => httpResponse.error(req, res, 'Unable to delete message.', 500, error));
});

module.exports = router;