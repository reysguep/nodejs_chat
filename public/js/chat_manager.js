let editingMsg;

$(document).ready(() => {
    $(document).click(clickOutEdit);

    refreshTable(() => {
        addEvents();
    }, 'html');
});

function refreshTable(cb) {
    let table = $('#msg_table');
    if (table != undefined && table != null) {
        table.remove();
    }

    $.get('/admin/table', (msgTable) => {
        $('main').append(msgTable);
        cb();
    });
}

function addEvents() {
    let deleteCol = $('.delete_btn');
    addDeleteEvent(deleteCol);

    let editCol = $('.edit_btn');
    addEditEvent(editCol);
}

function cancel(editCell) {
    let buttons = editCell.children();
    for (btn of buttons) {
        btn.classList.toggle('hidden');
    }
}

function clickOutEdit(e) {
    if (editingMsg != null) {
        let row = editingMsg.element;
        let el = e.target;
        let hasElement = $.contains(row, el);
        if (!hasElement) {
            cancelEdit();
        }
    }
}

function addEditEvent(el) {
    el.click((e) => {
        let row = e.target.parentElement;
        let cells = row.children;

        let authorCell = $(cells[1]);
        let msgCell = $(cells[2]);
        let editCell = $(cells[3]);

        editingMsg = {
            index: parseInt($(cells[0]).html()),
            author: authorCell.html(),
            message: msgCell.html(),
            element: row
        };

        authorCell.html('<input class="edit_input" type="text" value="' + authorCell.html() + '">');
        msgCell.html('<input class="edit_input" type="text" value="' + msgCell.html() + '">');

        editCell.removeClass('edit_btn');
        editCell.addClass('confirm_btn')

        editCell.off('click');

        addConfirmEvent(editCell);

        $(document).keyup((e) => {
            if(e.keyCode === 13) {
                editCell.click();
            }
        });
    });
}

function addDeleteEvent(el) {
    el.click((e) => {
        let row = $(e.target).parent();
        let idEl = $(row.children()[0]);
        let id = parseInt(idEl.html());

        if (editingMsg != null) {
            if (editingMsg.id== id) {
                editingMsg = null;
            }
        }

        row.remove();

        $.post('/admin/delete', { id: id }, (status) => {
            refreshTable(addEvents);
            alert(status);
        }, 'text');

    });
}

function addConfirmEvent(el) {
    el.click((e) => {
        let row = $(e.target).parent();
        let cells = row.children();

        let id = parseInt($(cells[0]).html());
        let auth = $($(cells[1]).children()[0]).val();
        let msg = $($(cells[2]).children()[0]).val();


        $(cells[1]).html(auth);
        $(cells[2]).html(msg);

        let newMsg = {
            id: id,
            author: auth,
            content: msg
        }

        $.post('/admin/edit', newMsg, (status) => {
            refreshTable(addEvents);
            alert(status);
        }, 'text');

        cancelEdit();
    })
}

function cancelEdit() {
    if (editingMsg != null) {
        $(document).off('keyUp');
        
        let row = $($('#msg_table').find('tr')[editingMsg.index + 1]);

        let cells = row.children();

        let authorCell = $(cells[1]);
        let msgCell = $(cells[2]);
        let editCell = $(cells[3]);

        authorCell.html(editingMsg.author);
        msgCell.html(editingMsg.message);

        editCell.removeClass('confirm_btn');
        editCell.addClass('edit_btn')

        editCell.off('click');
        addEditEvent(editCell);
    }
}