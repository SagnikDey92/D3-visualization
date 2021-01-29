'use strict';

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
    port: 8081
});

wss.on('connection', ((ws) => {
    ws.on('message', (message) => {
        console.log(`received: ${message}`) /*Printing the received message in the console*/ ;
        var dirname = message;
        //console.log(dirname);
        var dataArray = [];

        var fs = require('fs');

        fs.readdir(dirname, function(err, filenames) /*Reading the contents present in the directory*/ {
            if (err) /*If any error is present in the path name the exception handler handles it */ {
                var Err = new Error();
                Error.prepareStackTrace = function(err, stack) {
                    return stack;
                };
                console.log(Err.stack);
                console.log(err);

            } else {
                var collator = new Intl.Collator(undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
                filenames = filenames.sort(collator.compare);
                var len = filenames.length;
                var i;

                for (i = 0; i < len; i++) {

                    var filename = filenames[i];
                    console.log(filename);
                    ws.send(filename); /*Sends the filenames present in the directory*/
                }
                var plz = 0;

                var d3 = require("d3");
                filenames.forEach(function(filename) {
                    //console.log(filename);
                    fs.readFile(dirname + "/" + filename, 'utf-8', function(err, data) {
                        //console.log(filename);
                        data = d3.tsvParse(data); /*Reads the data using d3.tsv function */
                        var tosend = JSON.stringify(data) + "|||" + filename;
                        //console.log(tosend);
                        ws.send(tosend); /*Sends the data back to the html site*/
                    }); //readFile closing tag
                    //console.log(plz);
                }); //foreach function
                ws.send("Done");
            }
        }); //readdir closing tag

        ws.on('end', () => {
            console.log('Connection ended...');
        });

    }); //ws message close

})); //wss connection close