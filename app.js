var express = require('express');
var app = express();
var fs = require('fs');

function file_sync(input){
    var jsonContent,arr;
    var obj = fs.readFile('data/server1.json', 'utf8', function(err, data){
        if(err){
            console.log("read file error handler captured!");
            return console.log(err);
        }
        arr = data;
        var actual = JSON.parse(arr);
        actual.server1[0].value = input;
        jsonContent = JSON.stringify(actual);
        console.log(jsonContent);

    fs.writeFile("data/server1.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        else{
            console.log("file updated!")
        }
    });
});
}

app.use(express.static(__dirname));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index2.html');
});

app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

function fnAsyncTest(callback) {
    file_sync(0);
}

function fnSyncTest() {
    for (var i = 0; i < 10; i++) {}
}

function killProcess() {

    if (process.exitTimeoutId) {
        return;
    }

    process.exitTimeoutId = setTimeout(process.exit, 5000);
    console.log('process will exit in 5 seconds');

    fnAsyncTest(function() {
        console.log('async op. done', arguments);
    });

    if (!fnSyncTest()) {
        console.log('sync op. done');
    }
}
// https://nodejs.org/api/process.html#process_signal_events
process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);

process.on('uncaughtException', function(e) {

    console.log('[uncaughtException] app will be terminated: ', e.stack);

    killProcess();
    /**
     * @https://nodejs.org/api/process.html#process_event_uncaughtexception
     *  
     * 'uncaughtException' should be used to perform synchronous cleanup before shutting down the process. 
     * It is not safe to resume normal operation after 'uncaughtException'. 
     * If you do use it, restart your application after every unhandled exception!
     * 
     * You have been warned.
     */
});

console.log('App is running...');
console.log('Try to press CTRL+C or SIGNAL the process with PID: ', process.pid);

process.stdin.resume();
// just for testing


var server = app.listen(5000, function () {
    console.log('Node server is running..');
    file_sync(1);
});