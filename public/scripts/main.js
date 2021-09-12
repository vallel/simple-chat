const socket = io.connect('http://localhost:3000', {
    forceNew: true,
});

const app = new Vue({
    el: '#chat',
    data: {
        newMessage: '',
        messages: []
    },
    created: function() {
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

        socket.on('message', (data) => {
            this.messages.push(data);
        });
    },
    updated: function() {
        this.scrollToEnd();
    },
    methods: {
        scrollToEnd: function() {    	
            let container = document.getElementById('messages');
            container.scrollTop = container.scrollHeight;
        },
        sendMessage: function() {
            const request = {
                'message': `${this.newMessage}`,
                'user': '613ae33dd8f5b3b134762afd' // TODO: get the user id from somewhere
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
        }
    }
});