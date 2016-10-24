var main = function (archiveFileNames) {
    "use strict";

    archiveFileNames.forEach(function (archive) {
        if (archive === "index.html") {
            return;
        }
        
        var $listItem = $("<li>");

        $("<a>", {
            text: archive,
            href: archive,
        }).appendTo($listItem);

        $(".past-posts").append($listItem);
    });
};

$(document).ready(function () {
    $.getJSON("./past.json", function (archiveFileNames) {
        main(archiveFileNames);
    });
});