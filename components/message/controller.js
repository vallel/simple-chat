const messageRepository = require('./repository');
const socket = require('../../socket').socket;
const Exception = require('../../http/exception');

const add = (user, message) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            return reject(new Exception('User is required', `Invalid user ${user}.`));
        }
    
        if (!message) {
            return reject(new Exception('A message is required', `Invalid message ${message}.`));
        }
    
        const newMessage = {
            user: user,
            message: message,
            created: new Date,
        };
    
        messageRepository.add(newMessage);

        socket.io.emit('message', newMessage);

        return resolve(newMessage);
    });
};

const getList = () => {
    return messageRepository.list();
};

const deleteMessage = messageId => {
    return messageRepository.deleteMessage(messageId);
};

module.exports = {
    add,
    getList,
    deleteMessage: deleteMessage,
};