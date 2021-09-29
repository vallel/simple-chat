const apiUrl = 'http://localhost:3000';
const endpoints = {
    'users': '/user',
    'messages': '/message',
};

const socket = io.connect(apiUrl, {
    forceNew: true,
});

const app = new Vue({
    el: '#chat',
    data: {
        user: '',
        users: [],
        newMessage: '',
        messages: []
    },
    created: function() {
        if (this.isEmptyUser()) {
            this.getUsers();
        } else {
            this.getMessages();
        }

        socket.on('message', (data) => {
            this.messages.push(data);
        });
    },
    updated: function() {
        if (!this.isEmptyUser()) {
            this.scrollToEnd();
        }
    },
    methods: {
        scrollToEnd: function() {    	
            let container = document.getElementById('messages');
            container.scrollTop = container.scrollHeight;
        },
        getUsers: async function() {
            try {
                this.users = await getUsers();
            } catch (error) {
                console.error(error);
            }
        },
        getMessages: async function() {
            try {
                this.messages = await getMessages();
            } catch (error) {
                console.error(error);
            }
        },
        sendMessage: async function() {
            if (!this.user) {
                return;
            }
            
            try {
                await addMessage(this.user, this.newMessage);
                this.newMessage = '';
            } catch (error) {
                console.error(error);
            }
        },
        isEmptyUser: function() {
            return !this.user;
        },
        isCurrentUser: function(userId) {
            return userId === this.user;
        },
        selectUser: function(userId) {
            this.user = userId;
            this.getMessages();
        }
    }
});

async function getUsers() {
    return await getApiData(apiUrl + endpoints['users']);
}

async function getMessages() {
    return await getApiData(apiUrl + endpoints['messages']);
}

async function addMessage(user, message) {
    const request = {
        'message': `${message}`,
        'user': `${user}`,
    };

    await fetch(apiUrl + endpoints['messages'], {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request)
    });
}

async function getApiData(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    
    if (responseData.error) {
        throw responseData.error;   
    }

    return responseData.body;
}