function loadSong(videoID) {
    if (player) {
        player.loadVideoById(videoID, 0, "large");
    }
}

$(document).ready(function() {
    $('.youtubeSong').each(function(i) {
        $(this).click(function() {
            loadSong($(this).attr("songID"));
        });
    });
});

function spotifyPlaySong() {
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/play'
	})
}

$(document).ready(function() {
	$('.playSpotify').each(function(i) {
		$(this).click(function() {
				spotifyPlaySong();
		});
	});
});