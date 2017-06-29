/**
 * Created by sup-internet on 29/06/2017.
 */
const app = angular.module('timeLineApp', []);

app.controller('timeLineController', function ($scope) {
    let timeLine = this;
    timeLine.isDisconnected = true;

    timeLine.post = [];

    timeLine.pseudo = "";
    timeLine.message = "";
    timeLine.imgUrl = null;
    timeLine.date = new Date();
    timeLine.publications = [];

    timeLine.loginUser = function () {
        timeLine.isDisconnected = false;
        timeLine.sockets = io('http://localhost:3000');
        timeLine.sockets.emit('setPseudo', timeLine.pseudo);

        timeLine.sockets.on('newUser', function (newUser) {
            timeLine.users.push(newUser);
            $scope.$apply();
        });

        timeLine.sockets.on('publication', function (publication) {
            timeLine.post.push(publication);
            $scope.$apply();
        })
    };

    timeLine.sendPublication = function () {
        timeLine.publications.push({
            imgPost: timeLine.imgUrl,
            pseudo: timeLine.pseudo,
            sendDate: timeLine.date,
            sendMessage: timeLine.message
        });
    };
});