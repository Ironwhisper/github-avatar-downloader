

var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');



function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         console.log(err);
         throw err;
       })
       .on('res', function(res) {
        console.log('dl in progress...');
       })
       .on('end', function (end) {
        console.log("Download of Complete!");
       })
       .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers : {
    "User-Agent" : 'token'
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
    var parsedBod = JSON.parse(body);
    for (var i = 0; i < parsedBod.length; i++){
      downloadImageByURL(parsedBod[i].avatar_url, `./avatars/${parsedBod[i].login}.jpg`);
    }
  });
}

let rOwner = process.argv[2];
let rName = process.argv[3];

if (rOwner === undefined || rName === undefined) {
  console.log("Error - repo owner or repo name have not been given!")
}

getRepoContributors(rOwner, rName, function(err, result) {
  console.log("Errors:", err);
});

