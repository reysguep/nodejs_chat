const users = [];

module.exports = class User {
    constructor(username, name, status, pictureUrl, passHash) {
        this.username = username;
        this.name = name;
        this.passHash = passHash;
        this.status = status;
        this.pictureUrl = pictureUrl;
    }

    save() {
        users.push(this);
    }

    edit(newUsername, newName, newStatus, newPictureUrl, newPassHash) {
        this.username = newUsername;
        this.name = newName;
        this.status = newStatus;
        this.pictureUrl = newPictureUrl;
        this.passHash = newPassHash;
    }

    delete() {
        for(let i = 0; i < users.length; i++) {
            if(users[i].username == this.username) {
                users.splice(i, 1);
                return;
            }
        }
    }

    static get(username) {
        for(let usr of users) {
            if(usr.username == username) {
                return usr;
            }
        }

        return null;
    }

    static fetchAll() {
        return users;
    }
}