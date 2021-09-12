const socket = io.connect('http://localhost:3000', {
    forceNew: true,
});

const app = new Vue({
    el: '#chat',
    data: {
        messages: []
    },
    mounted: function() {
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

        socket.on('message', function (data) {
            console.log(data);
            // this.messages.push(data);
        });
    }
});