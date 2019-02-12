const db = require('../util/database');

module.exports = class User {
    constructor(username, name, status, pictureUrl, password) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.status = status;
        this.pictureUrl = pictureUrl;
    }

    save(cb) {
        db.execute('INSERT INTO User (username, name, status, pictureUrl, password)' +
            'VALUES(?, ?, ?, ?, ?)', [this.username, this.name, this.status, this.pictureUrl, this.password]
        )
            .then(() => {
                cb();
            })
            .catch(err => {
                cb(err);
            });
    }

    edit(newUsername, newName, newStatus, newPictureUrl, newPassword) {
        this.username = newUsername;
        this.name = newName;
        this.status = newStatus;
        this.pictureUrl = newPictureUrl;
        this.passwors = newPassword;
    }

    delete(cb) {
        db.execute('DELETE FROM User WHERE username = ?', [this.username]);
    }

    static get(username, cb) {
        db.execute('SELECT * FROM User WHERE username = ?', [username])
            .then(([rows, fieldData]) => {
                let row = rows[0];
                if (row) {
                    let user = new User(row.username, row.name, row.status, row.pictureUrl, row.password);
                    cb(user);
                } else
                    cb(null);
            })
            .catch(err => {
                console.log(err);
                cb(null);
            });
    }

    static fetchAll(cb) {
        db.execute('SELECT * FROM User')
            .then(([rows, fieldData]) => {
                let users = [];
                for (let row of rows) {
                    let user = new User(row.username, row.name, row.status, row.pictureUrl, row.password);
                    users.push(user);
                }

                cb(users);
            })
            .catch(err => {
                console.log(err);
                cb([]);
            });
    }
}