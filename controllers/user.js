const path = require('path');

const rootDir = require('../util/path');

const User = require('../models/user');

exports.getUser = (req, res) => {
    User.fetchAll(users => {
        res.render(path.join(rootDir, 'views', 'user', 'users'), {
            path: '/user',
            users: users,
            admin: false
        });
    });
}

exports.getProfile = (req, res) => {
    let username = req.params.username;
    User.get(username, user => {
        if (user) {
            res.render(path.join(rootDir, 'views', 'user', 'userPage'), { user: user, path: '/user', admin: false });
        } else {
            res.render(path.join(rootDir, 'views', 'user', 'user-not-found'), { path: '/user' });
        }
    });
}