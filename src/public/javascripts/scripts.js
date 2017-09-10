var access_token = 'BQAsH0dnWYyiUuc-6AjVg-baj2aLcUm8gAtHC24Jvtl88LiB6xOd5xZQrvz-Ky3v8eqIYWZIyt2XlRbUepqwwpGknBVbVUmBa9CsbAlif4VLpi78yi5nQG_ZzEqrbJpUSIXuv1cu3_1xRtHJqA';

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

function spotifyPlaySong() {
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/play',
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	})
}

function spotifyPauseSong() {
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/pause',
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	})
}

function getSpotifySavedSongs() {
	var access_token = JSON.parse(localStorage.getItem('access_token'));
	$.ajax({
		type: 'GET',
		url: 'https://api.spotify.com/v1/me/tracks',
		headers: {
              'Authorization': 'Bearer ' + access_token
            },
	})
}

function getSpotifyPlaylists() {
	var access_token = JSON.parse(localStorage.getItem('access_token'));
	$.ajax({
		type: 'GET',
		url:'https://api.spotify.com/v1/me/playlists',
		headers: {
			'Authorization': 'Bearer ' + access_token
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
    $('.playSpotify').each(function(i) {
		$(this).click(function() {
			spotifyPlaySong();
		});
	});
	$('.pauseSpotify').each(function(i) {
		$(this).click(function() {
			spotifyPauseSong();
		});
	});
});
