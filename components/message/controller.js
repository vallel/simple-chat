const messageRepository = require('./repository');

const add = (user, message) => {
    if (!user) {
        return Promise.reject('User is required');
    }

    if (!message) {
        return Promise.reject('A message is required');
    }

    const newMessage = {
        user: user,
        message: message,
        created: new Date,
    };

    return messageRepository.add(newMessage);
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