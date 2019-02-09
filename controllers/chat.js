const path = require('path');
const rootDir = require('../util/path');

const Message = require('../models/message');

exports.getOpenChat = (req, res) => {
    Message.fetchAll((msgs) => {
        res.render(path.join(rootDir, 'views', 'chats', 'open_chat'), { allMessages: msgs, path: '/' });
    });
};

exports.postOpenChat = (req, res) => {
    Message.create('Eu', req.body.message, (message) => {
        message.save(() => {
            res.redirect('/');
        });
    });
};

exports.getPrivateChat = (req, res) => {
    res.render(path.join(rootDir, 'views', 'chats', 'private'), { path: '/private' });
}

exports.getMessages = (req, res) => {
    Message.fetchAll((messages) => {
        res.send(messages);
    });
}

function clearOpenChat() {
    openMessages = [];
}

function clearPrivateChat() {
    privateMessages = [];
}

exports.clearOpenChat = clearOpenChat;
exports.clearPrivateChat = clearPrivateChat;