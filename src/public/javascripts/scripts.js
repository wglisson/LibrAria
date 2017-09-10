var clientId = 'b56396e79c604c649633d03bb032c421';
var clientsecret = 'eeaf9e7120e24ac397d37e59b8042403';

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

function spotifyPlaySong() {
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/play'
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
	console.log(access_token);
	$.ajax({
		type: 'GET',
		url:'https://api.spotify.com/v1/me/playlists',
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	})
}

function authenticateSpotify() {
	$.ajax({
		type: 'GET',
		url:'https://accounts.spotify.com/authorize',
		data: {
			'client_id': clientId,
			'response_type': 'code',
			'redirect_uri': 'http://localhost:3000'
		}
}

$(document).ready(function() {
	$('.playSpotify').each(function(i) {
		$(this).click(function() {
			getSpotifyPlaylists();
		});
	});
});

