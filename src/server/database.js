var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/songs';
var db;

MongoClient.connect(url, function(err, myDb) {
  assert.equal(null, err);
  console.log("Connected successfully to database");
  db = myDb;
})

module.exports = {
    
    // songData schema:
    // userId, name, id, platform, artist?, album? tags[]? 
    addSongEntry: function(songData, callback) {
        if (songData.userId && songData.name && songData.id && songData.platform) {
            var data = {
                userId: songData['userId'],
                songName: songData['name'],
                songId: songData['id'],
                songPlatform: songData['platform']
            }
            data['songArtist'] = (songData['artist'] ? songData['artist'] : null);
            data['songAlbum'] = (songData['album'] ? songData['album'] : null);
            data['songTags'] = (songData['tags'] ? songData['tags'] : []);
            db.collection('songs').insertOne(data);
            callback(null, data);
        }
    },

    getSongsByUser: function(userId, callback) {
        db.collection('songs').find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    }
}