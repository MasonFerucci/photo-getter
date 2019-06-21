'use strict';

const colors = require('colors')

const args = require('minimist')(process.argv.slice(2));

console.log(args);
console.log(args._[0]);

const https = require('https');


// Just going full function here
main();

function main() {

    let target = "https://jsonplaceholder.typicode.com/photos"

    if (!args._[0])
        return false;

    target += appendQuaryString(args._[0])
    console.log("Getting photo album based on user input of ".green, args._[0])
    console.log(`${target}`.blue)



    getPhotoAlbum(target);

}

function getPhotoAlbum(target) {

    https.get(target, (response) => {
        let data = '';


        response.on('data', (chunk) => {
            data += chunk;
        });


        response.on('end', () => {
            // console.log(JSON.parse(data));
            JSON.parse(data).forEach(function (ele) {
                console.log(`[${ele.id}] ${ele.title}`)
            })
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function appendQuaryString(input) {
    if (Number.isInteger(input)) {
        return "?albumId=" + input;
    }
    else {
        console.log("ERROR:".underline.bold.red + "Input supplied is not valid".red)
        return false;
    }

}

