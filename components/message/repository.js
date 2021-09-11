const Model = require('./model');

const add = (message) => {
    const newMessage = new Model(message);

    return newMessage.save();
};

const list = () => {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    return reject(error);
                }

                resolve(populated);
            });
    });
};

const deleteMessage = messageId => {
    return Model.findByIdAndDelete(messageId);
};

module.exports = {
    add,
    list,
    deleteMessage: deleteMessage,
};