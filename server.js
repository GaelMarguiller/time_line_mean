/**
 * Created by sup-internet on 29/06/2017.
 */
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

let post = [];

io.on("connexion", socket => {

    const usersCurrents = {
        id: null,
        pseudo: null
    };

    socket.on("setPseudo", pseudo => {
        usersCurrents.id = socket.id;
        usersCurrents.pseudo = pseudo;
        socket.broadcast.emit('newUser', usersCurrents)
    });

    socket.on('publication', (publication) => {
        socket.broadcast.emit("publication", {
            imgPost: null,
            pseudo: usersCurrents.pseudo,
            sendDate: null,
            sendMessage: null,
            publication: publication
        });
        post.push(publication);
        socket.broadcast.emit('post', post);
    });
});

const port = process.env.PORT || 3000;
server.listen(port);