exports.validate = (newUserData, allUsers) => {
    let valid = true;

    valid &= validateName(newUserData.name);
    valid &= validateUsername(newUserData.username, allUsers.map(user => user.username));
    valid &= validateStatus(newUserData.status);
    valid &= validatePassword(newUserData.password, newUserData.confPassword);

    return valid;
}

function validateName(name, valid) {
    return true;
}

function validateUsername(username, allUserNames) {
    for(let usrnm of allUserNames) {
        if(username.localeCompare(usrnm) == 0)
            return false;
    }

    if(username.length < 1)
        return false;

    return true;
}

function validateStatus(status) {
    if (status.length > 70)
        return false;

    return true;
}

function validatePassword(password, confPassword) {
    if (password.localeCompare(confPassword) != 0)
        return false;

    return true;
}