const socket = io.connect('http://localhost:3000', {
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
        getUsers: function() {
            fetch('http://localhost:3000/user')
                .then(response => response.json())
                .then(responseData => {
                    if (!responseData.error && responseData.body) {
                        this.users = responseData.body;
                    } else {
                        console.log(responseData.error);
                    }
                })
                .catch(error => console.log(error));
        },
        getMessages: function() {
            fetch('http://localhost:3000/message')
                .then(response => response.json())
                .then(responseData => {
                    if (!responseData.error && responseData.body) {
                        this.messages = responseData.body;
                    } else {
                        console.log(responseData.error);
                    }
                })
                .catch(error => console.log(error));
        },
        sendMessage: function() {
            if (!this.user) {
                return;
            }

            const request = {
                'message': `${this.newMessage}`,
                'user': `${this.user}`,
            };

            fetch('http://localhost:3000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(response => this.newMessage = '')
            .catch(error => {
                console.log(error);
            });
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