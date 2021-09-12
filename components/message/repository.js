const Exception = require('../../http/exception');
const Model = require('./model');

const add = (message) => {
    return new Promise((resolve, reject) => {
        const newMessage = new Model(message);
        newMessage.save((error, result) => {
            if (error) {
                return reject(new Exception('Could not save the message. Plese try again later.', error));
            }

            Model.findById(result.id).populate('user').exec((error, populated) => {
                if (error) {
                    return reject(new Exception('Something went wrong!', error));
                }
                return resolve(populated);
            });
        });
    });
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