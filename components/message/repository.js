const Model = require('./model');

const add = (message) => {
    const newMessage = new Model(message);

    return newMessage.save();
};

const list = () => {
    return Model.find();
};

const deleteMessage = messageId => {
    return Model.findByIdAndDelete(messageId);
};

module.exports = {
    add,
    list,
    deleteMessage: deleteMessage,
};