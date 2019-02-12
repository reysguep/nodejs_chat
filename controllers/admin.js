const path = require('path');

const rootDir = require('../util/path');

const Message = require('../models/message');
const User = require('../models/user');

const crypt = require('../security/crypt');
const validaNewUser = require('../validators/newUser-valida');


exports.clearPublicChat = (req, res) => {
    Message.clearPublicChat(() => {
        res.redirect('/');
    });
}

exports.getAdmin = (req, res) => {
    res.render(path.join(rootDir, 'views', 'admin', 'admin'), { path: '/admin' });
}

exports.getMessages = (req, res) => {
    res.render(path.join(rootDir, 'views', 'admin', 'edit_msg'), {
        path: '/admin'
    });
}

exports.getMsgTable = (req, res) => {
    Message.fetchAll((messages, err) => {
        res.render(path.join(rootDir, 'views', 'admin', 'msg_table'), {
            allMessages: messages
        });
    })
}

exports.removeMessage = (req, res) => {
    let id = req.body.id;
    Message.get(id, (message) => {
        if (message == null) {
            res.send('Message not found')
        } else {
            message.delete((status) => {
                res.send(status);
            });
        }
    });
}

exports.editMessage = (req, res) => {
    let id = req.body.id;
    let newAuthor = req.body.author;
    let newMsg = req.body.content;

    Message.get(id, (message) => {
        if (message == null) {
            res.send('Message not found');
        } else {
            message.edit(newAuthor, newMsg, (status) => {
                res.send(status);
            });
        }
    });
}

exports.getUsersAdmin = (req, res) => {
    const users = User.fetchAll(users => {
        res.render(path.join(rootDir, 'views', 'user', 'users'), {
            path: '/admin',
            users: users,
            admin: true
        });
    });
}

exports.getEditUser = (req, res) => {
    let username = req.param.username;
}
exports.postEditUser = (req, res) => {
    let username = req.param.username;
}

exports.getAddUser = (req, res) => {
    res.render(path.join(rootDir, 'views', 'admin', 'add-user'), { path: '/admin' });
}
exports.postAddUser = (req, res) => {
    const addUserForm = {
        name: req.body.name,
        username: req.body.username,
        imageUrl: req.body.imageUrl,
        status: req.body.status,
        password: req.body.password,
        confPassword: req.body.confPassword
    }

    let response = {
        message: 'There was an error!',
        success: false
    };

    User.fetchAll(users => {
        if (validaNewUser.validate(addUserForm, users)) {

            crypt.cryptPassword(addUserForm.password, (err, passHash) => {
                if (err) {
                    console.log(err);
                    res.send(response);
                } else {
                    const user = new User(addUserForm.username, addUserForm.name,
                        addUserForm.status, addUserForm.imageUrl, passHash);

                    user.save(err => {
                        if (err) {
                            console.log(err);
                        } else {
                            response = {
                                message: 'User created successfully',
                                success: true
                            };
                        }

                        res.send(response);
                    });
                }
            });
        } else {
            res.send(response);
        }
    })

}