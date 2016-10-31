var main = function (nowContent) {
    'use strict';
    var imageData;

    var postToServer = function () {
        var postContent;

        if (imageData === null) {
            imageData = '';
        }

        postContent = {
            'username' : $('h2.name').text(),
            'post' : {
                'date' : new Date(),
                'blog' : $('textarea').val(),
                'title' : $('.title').val(),
                'image' : imageData
            }
        };

        $.post('../../nowBlog', postContent, function (response) {
            console.log(response);
        });
    };

    var updateNowPage = function () {
        var currentDate = new Date(),
            $date = $('<p>').text(currentDate),
            $blogText = $('<p>').text($('textarea').val()),
            $title = $('<h4>').text($('input.title').val()),
            $image = $('<img>').attr('src', imageData),
            $content = $('<div>').addClass('post');

        $content.append($title)
                .append($image)
                .append($blogText)
                .append($date);

        $('main .content').prepend($content);

        if ($('.post').length > 5) {
            $('main .content div:nth-child(6)').remove();
        }

        // Clear input boxes
        $('textarea').val('');
        $('.date').val('');
        $('input.title').val('');
        $('#file-image').val('');
        imageData = null;
    };

    // Add posts stored on server to .content block
    nowContent.forEach(function (update) {
        var $blogPost = $('<div>').addClass('post');

        $blogPost.append($('<h2>').text(update.title));
        $blogPost.append($('<img>').attr('src', update.image));
        $blogPost.append($('<p>').text(update.blog));
        $blogPost.append($('<p>').text(update.date));

        $('main .content').prepend($blogPost);
        
        // Remove any posts older than the last 5
        if ($('.post').length > 5) {
            $('main .content div:nth-child(6)').remove();
        }
    });

    // Upload button click handler
    $('.button-update input').on('click', function () {
        postToServer();
        updateNowPage();
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
    'use strict';
    $.get('./nowBlog.json', function (nowContent) {
        main(nowContent);
    });
});