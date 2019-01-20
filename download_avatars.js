
//Dependencies
const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');

//main function that will stream files into a deignated path
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

//a function that will obtain repo owner and repo name, and will use those arguments to
//access the images
function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers : {
    "User-Agent" : 'token'
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
    const parsedBod = JSON.parse(body);
    for (let i = 0; i < parsedBod.length; i++){
      downloadImageByURL(parsedBod[i].avatar_url, `./avatars/${parsedBod[i].login}.jpg`);
    }
  });
}

//letting user input repo owner and name through command line
let rOwner = process.argv[2];
let rName = process.argv[3];

//error message if repo owner or name have not been provided
if (rOwner === undefined || rName === undefined) {
  console.log("Error - repo owner or repo name have not been given!")
}

//main function call
getRepoContributors(rOwner, rName, function(err, result) {
  console.log("Errors:", err);
});

