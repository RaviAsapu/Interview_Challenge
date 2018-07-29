
// Create a console application that loops through all 100 of the "/posts" records and outputs a summary which summarizes
// the count of each letter and character found in the "title" and "body" attributes of all 100 posts.

var request = require('request');

request('https://jsonplaceholder.typicode.com/posts/', function (error, response, body) {

  var data = JSON.parse(body);
  for (var i = 0, len = data.length; i < len; i++) {
    var postData = data[i];
    console.log(`Id: ${postData.id}, Title: ${getCharCount(postData.title)}, Body:${getCharCount(postData.body)}`);
  }
});


function getCharCount(input) {
  var output = {};
  output["space"] = input.split(" ").length - 1;
  output["newline"] = input.split("\n").length - 1;
  output["carriagereturn"] = input.split("\r").length - 1;
  output["tab"] = input.split("\t").length - 1;
  output["formfeed"] = input.split("\f").length - 1;
  input.replace(/\S/g, function (l) { output[l] = (isNaN(output[l]) ? 1 : output[l] + 1); });
  return JSON.stringify(output);
}



