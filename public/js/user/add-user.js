$(document).ready(() => {

    const nameInput = $('#name_input');
    const usernameInput = $('#username_input');
    const statusInput = $('#status_input');
    const passInput = $('#password_input');
    const confPassInput = $('#conf-password_input');

    const inputForm = $('.add-user-form');

    inputForm.submit(() => {

        $.post('/admin/users/add-user', inputForm.serialize(), (response) => {
            window.alert(response.message);
            if(response.success) {
                window.location.replace('/user/' + usernameInput.val());
            }
        }, 'json');

        return false;
    })
})