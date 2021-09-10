const express = require('express');
const router = express.Router();
const userController = require('./controller');
const httpResponse = require('../../http/response');

router.get('/', (req, res) => {
    userController.getList()
        .then(data => httpResponse.success(req, res, data, 200))
        .catch(error => httpResponse.error(req, res, 'Something went wrong 🙁. Please try again later.', 500, error));
});

router.post('/', (req, res) => {
    userController.add(req.body.username)
        .then(data => httpResponse.success(req, res, data, 201))
        .catch(error => httpResponse.error(req, res, error, 500, error));
});

router.delete('/:id', (req, res) => {
    userController.deleteUser(req.params.id)
        .then(data => httpResponse.success(req, res, data, 200))
        .catch(error => httpResponse.error(req, res, error, 500, error));
});

module.exports = router;