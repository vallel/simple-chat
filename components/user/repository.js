const Model = require('./model');

const add = (user) => {
    const newUser = new Model(user);

    return newUser.save();
};

const list = () => {
    return Model.find();
};

const deleteUser = userId => {
    return Model.findByIdAndDelete(userId);
};

module.exports = {
    add,
    list,
    deleteUser,
};