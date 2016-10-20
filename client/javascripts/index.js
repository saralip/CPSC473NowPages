var main = function (users) {
    "use strict";

    // Display users in the user list view
    users.forEach(function (user) {
        appendUser(user);
    });

    // Button handler--post to server
    $(".create").on("click", function () {
        var newUser,
            username = document.getElementById("name");

        if (!username.validity.valid) {
            $(".response").text("Invalid username");
            return;
        }

        newUser = {
            "username": $(".username").val(),
            "post": {
                "title": $(".title").val(),
                "blogText": $(".text").val(),
                "date": new Date()
            }
        };

        $.post("newUser", newUser, function (response) {
            $(".response").text(response.message);

            if (response.message === "New user created!") {

            }
        });
    });

    function appendUser(user) {
        var $listItem = $("<li>");

        $("<a>", {
            text: user,
            href: "users/" + user + "/"
        }).appendTo($listItem);

        $(".users ul").append($listItem);
    }
};

$(document).ready(function () {
    $.get("users.json", function (users) {
        main(users);
    });
});