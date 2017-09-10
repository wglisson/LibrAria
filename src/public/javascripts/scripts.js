function loadSong(videoID) {
    if (player) {
        player.loadVideoById(videoID, 0, "large");
    }
}
function addSong() {
    $.ajax({
        method: "POST",
        url: "/",
        data: {
            userId: "1",
            name: "Better",
            id: "YwR1dpsDRdU",
            platform: "YouTube"
        }
    })
}

$(document).ready(function() {
    $('.youtubeSong').each(function(i) {
        $(this).click(function() {
            loadSong($(this).attr("songID"));
        });
    });
    $('#addButton').click(function() {
        //addSong();
    })
});