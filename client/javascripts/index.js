var main = function (users) {
    'use strict';
    var imageData;

    function appendUser(user) {
        var $listItem = $('<li>');

        $('<a>', {
            text: user,
            href: 'users/' + user + '/'
        }).appendTo($listItem);

        $('.users ul').append($listItem);
    }

    // Display users in the user list view
    users.forEach(function (user) {
        if (user !== '.DS_Store') {
            appendUser(user);
        }
    });

    // Button handler--post to server
    $('.create').on('click', function () {
        var newUser,
            username = document.getElementById('name');

        if (!username.validity.valid) {
            $('.response').text('Invalid username');
            return;
        }

        if (imageData === null) {
            imageData = '';
        }

        newUser = {
            'username': $('.username').val(),
            'post': {
                'date': new Date(),
                'blog': $('textarea').val(),
                'title': $('.title').val(),
                'image': imageData
            }
        };

        $.post('newUser', newUser, function (response) {
            $('.response').text(response.message);

            if (response.message === 'New user created!') {
                appendUser($('.username').val());
            }

            $('textarea').val('');
            $('.title').val('');
            $('.username').val('');
            $('#file-image').val('');
            imageData = null;
        });
    });

    $('#file-image').on('change', function () {
        // Translate an image element to its data URI
        var reader = new FileReader(),
            file = document.querySelector('input[type=file]').files[0];

        reader.onload = function (event) {
            imageData = event.target.result;
        };

        if (file) {
            imageData = reader.readAsDataURL(file);
        }
    });
};

$(document).ready(function () {
    $.get('users.json', function (users) {
        main(users);
    });
});