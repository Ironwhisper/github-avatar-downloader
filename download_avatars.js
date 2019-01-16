

var request = require('request');
var token = require('./secrets.js');

console.log('weclome');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers : {
    "User-Agent" : 'token'
    }
  };



  request(options, function(err, res, body) {
    cb(err, body);

    var result = [];
    var parsedBod = JSON.parse(body);


    for (var i = 0; i < parsedBod.length; i++){
      result.push(parsedBod[i].avatar_url);
    }


    console.log(result);

  });

}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});