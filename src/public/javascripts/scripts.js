//hardcoded for now
//obtained from postman
var access_token = 'BQDBeEkjXT5d1hK5rEPJPQ4lhK-r0hpD28vJKNCSK1469VypE7vlOEqiEDQb3nmpBzJhqLsAezJmJTXYuM8TjJd8dYRFrP1xodwKpOURRjSPtjTgZJw45HIcr8BZklfo1ioliLzKadB48FEGSw';
var currentPlayer = "YouTube";
var spotifyURIS = [];
var songDuration = 1;

function loadSong(videoID) {
    if (player) {
		player.loadVideoById(videoID, 0, "large");
    }
}

function addSong() {
	var songID = "";
	var songPlatform = "";
	var songUrl = $('#inputSongURL').first().val();
	if (songUrl.startsWith('https://open.spotify.com/track/')) {
		songPlatform = "Spotify";
		songID = songUrl.substring("https://open.spotify.com/track/".length);
	} else if (songUrl.startsWith('https://www.youtube.com/watch?v=')) {
		songPlatform = "YouTube";
		songID = songUrl.substring("https://www.youtube.com/watch?v=".length);
		if (songUrl.includes('&')) {
			songID = songID.substring(0, songID.indexOf('&'));
		}
	}
	var queryData = {
		userId: "1",
		name: $('#inputSongName').val(),
		id: songID,
		platform: songPlatform,
		artist: $('#inputSongArtist').val(),
		album: $('#inputSongAlbum').val(),
		tags: []
	}
    $.ajax({
        method: "POST",
        url: "/",
		data: queryData,
		dataType: 'json',
	}).done(function() {
		$('.form-control').val('');
		location.reload();
	})
}

function spotifyPlaySong() {
	console.log(spotifyURIS);
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/play',
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
		data: {
			uris: spotifyURIS
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
function spotifyIDToURI(link) {
	return "spotify:track:" + link;
}

function updateProgressBar() {
	if (currentPlayer == "YouTube") {
		var width = (player.getCurrentTime()/songDuration)*1140;
		$('#songProgress').removeClass("progress-bar-success").css("width", width + "px");
	} else {
		$('#songProgress').css("width", "1140px").addClass("progress-bar-success");
	}
}

$(document).ready(function() {
	$('.form-control').val('');
	$('.table > tbody > tr.YouTubeSong').each(function(i) {
		$(this).click(function() {
			$('.table > tbody > tr').removeClass("info");
			spotifyPauseSong();
			currentPlayer = "YouTube";
			loadSong($(this).attr("songID"));
			$(this).addClass("info");
		});
	});
	$('.table > tbody > tr.SpotifySong').each(function(i) {
		$(this).click(function() {
			$('.table > tbody > tr').removeClass("info");
			stopVideo();
			currentPlayer = "Spotify";
			spotifyURIS = [];
			spotifyURIS.push(spotifyIDToURI($(this).attr("songID")));
			spotifyPlaySong();
			$(this).addClass("info");
		});
	});
    // $('#addSongModal').click(function() {
	// 	addSong();
	// })
	$('#cancelModal').click(function() {
		$('.form-control').val('');
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
	$('#playButton').click(function() {
		if (currentPlayer == "YouTube") {
			startVideo();
		} else {
			spotifyPlaySong();
		}
	})
	$('#pauseButton').click(function() {
		if (currentPlayer == "YouTube") {
			pauseVideo();
		} else {
			spotifyPauseSong();
		}
	})
});
