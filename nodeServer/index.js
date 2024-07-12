const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log(`${name} joined the chat.`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        // socket.emit('message', { user: 'admin', text: `${name} has joined the chat.` });
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
    
});