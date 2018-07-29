var http = require('http');
var request = require('request');
const URL = 'https://jsonplaceholder.typicode.com/posts';

console.log('Running Assignment 2');
delayRead();

function delayRead() {
    request.get(URL, (error, response, body) => {
        if (error) {
            console.log('Error occured while requesting GET Post API');
        } else if (body) {
            const posts = JSON.parse(body);
            readPosts(posts);
        }
    });
}

function readPosts(posts) {
    var randomString = posts.map(function (post) {
        var words = post.title.split(' ');
        if (words.length > 0) {
            return words[Math.floor(Math.random() * words.length)];
        }
        return '';
    }).reduce(function (accumulator, current, index, context) {
        return accumulator + '\n' + current;
    }, '');

    console.log('randomString : ', randomString);
    readChars(randomString.split(''), 0);
}

function readChars(chars, index) {
    if (chars.length > index) {
        console.log(chars[index]);
        setTimeout(readChars, 1000, chars, index + 1);
    }
}
