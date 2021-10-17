// const socket = io('http://localhost:8000');
const socket = io('https://silly-montalcini-7eb8a9.netlify.app:8000/socket.io/socket.io.js');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const nam = prompt("Enter your name to join");

socket.emit('new-user-joined', nam);

socket.on('user-joined', nam => {
    append(`${nam} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.nam}: ${data.message}`, 'left')
})

socket.on('left', nam => {
    append(`${nam} left the chat`, 'left')
})


