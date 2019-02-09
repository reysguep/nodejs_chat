const path = require('path');
const fs = require('fs');

const rootDir = require('../util/path');

const dataFilePath = path.join(rootDir, 'data', 'messages.JSON');



module.exports = class Message {
    constructor(id, author, content) {
        this.author = author;
        this.content = content;
        this.id = id;
        Message.nextId++;
    }

    save(cb) {
        Message.fetchAll((messages) => {
            messages.push(this);
            Message.writeMessagesOnFile(messages, (err) => {
                if (err) {
                    console.log(err);
                }

                cb();
            });
        });
    }

    edit(newAuthor, newMsg, cb) {
        this.author = newAuthor;
        this.content = newMsg;

        Message.fetchAll((messages) => {
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].id == this.id) {
                    messages[i] = this;
                    Message.writeMessagesOnFile(messages, (err) => {
                        if (!err) {
                            cb('Message edited with success!');
                        } else {
                            console.log(err);
                        }

                    });
                    return;
                }
            }

            cb('Couldn\'t edit the message.');
        });
    }

    delete(cb) {
        Message.fetchAll((messages) => {
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].id == this.id) {
                    messages.splice(i, 1);
                    Message.writeMessagesOnFile(messages, (err) => {
                        if (!err) {
                            cb('Message deleted with success!');
                        } else {
                            console.log(err);
                        }
                    });
                    return;
                }
            }

            cb('Couldn\'t delete the message.');
        });
    }

    static create(author, content, cb) {
        Message.getNextId((id) => {
            let message = new Message(id, author, content);
            cb(message);
        });
    }

    static fetchAll(cb) {
        Message.fileToObject((obj) => {
            cb(obj.messages);
        });
    }

    static get(id, cb) {
        Message.fetchAll((messages) => {
            for (let msg of messages) {
                if (msg.id == id) {
                    cb(msg);
                    return;
                }
            }

            cb(null);
        })
    }

    static writeMessagesOnFile(messages, cb) {
        Message.fileToObject((obj) => {
            let nextId = obj.nextId;

            let content = {
                nextId: nextId,
                messages: messages
            }
            let contentJson = JSON.stringify(content);
            fs.writeFile(dataFilePath, contentJson, cb);
        });
    }

    static clearPublicChat(cb) {
        fs.unlink(dataFilePath, () => {
            cb();
        });
    }

    static getNextId(cb) {
        Message.fileToObject((obj) => {
            let nextId = obj.nextId;
            let newObj = {
                nextId: nextId + 1,
                messages: obj.messages
            }
            fs.writeFile(dataFilePath, JSON.stringify(newObj), (err) => {
                if (err) {
                    console.log(err);
                }
                cb(nextId);
            });
        })
    }

    static fileToObject(cb) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            let obj;

            if (err) {
                obj = {
                    nextId: 0,
                    messages: []
                };

            } else {
                let jsonFile = JSON.parse(fileContent);
                let messages = [];
                for (let json of jsonFile.messages) {
                    let msg = new Message(json.id, json.author, json.content);
                    messages.push(msg);
                }

                obj = {
                    nextId: jsonFile.nextId,
                    messages: messages
                };
            }

            cb(obj);
        });
    }
}