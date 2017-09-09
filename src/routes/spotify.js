//initialize the spotify web api
var SpotifyWebApi = require('spotify-web-api-node');
var clientId = 'b56396e79c604c649633d03bb032c421';
var clientsecret = 'eeaf9e7120e24ac397d37e59b8042403';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientsecret,
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });