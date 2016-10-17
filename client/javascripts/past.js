var main = function (archiveFileNames) {
    "use strict";

    archiveFileNames.forEach(function (archive) {
        var $listItem = $("<li>");

        $("<a>", {
            text: archive,
            href: "archives/" + archive,
        }).appendTo($listItem);

        $(".past-posts").append($listItem);
    });
};

$(document).ready(function () {
    $.getJSON("past.json", function (archiveFileNames) {
        main(archiveFileNames);
    });
});