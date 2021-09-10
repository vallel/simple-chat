const add = (username) => {
    if (!username) {
        return Promise.reject('Invalid username');
    }

    const user = {
        username: username,
    };

    
};

const getList = () => {

};

module.exports = {
    add,
    getList,
};