//hardcoded for now
//obtained from postman
var access_token = 'BQDBeEkjXT5d1hK5rEPJPQ4lhK-r0hpD28vJKNCSK1469VypE7vlOEqiEDQb3nmpBzJhqLsAezJmJTXYuM8TjJd8dYRFrP1xodwKpOURRjSPtjTgZJw45HIcr8BZklfo1ioliLzKadB48FEGSw';

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

//parses a Spotify link as a string to a track into a spotify URI
function spotifyLinkToURI(link) {
	return "spotify:track:" + link.substr(31);
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
