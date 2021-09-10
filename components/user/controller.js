const userRepository = require('./repository');

const add = (username) => {
    if (!username) {
        return Promise.reject('Invalid username');
    }

    const user = {
        username: username,
        created: new Date,
    };

    return userRepository.add(user);
};

const getList = () => {
    return userRepository.list();
};

const deleteUser = userId => {
    return userRepository.deleteUser(userId);
};

module.exports = {
    add,
    getList,
    deleteUser,
};