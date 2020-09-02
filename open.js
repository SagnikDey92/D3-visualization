function openfunc() {
	document.getElementById("openbg").innerHTML = " ";
    document.getElementById("pathtext").innerHTML = " ";
    document.getElementById("currentbg").innerHTML = " ";
    //document.getElementById("refreshbg").innerHTML=" ";
    //document.getElementById("cleanbg").innerHTML=" ";
    //document.getElementById("newbg").innerHTML=" ";
    document.getElementById("aggregatesumbg").innerHTML = " ";
    document.getElementById("aggregatetempbg").innerHTML = " ";
    document.getElementById("heatmapbg").innerHTML = " ";
	document.getElementById("headingbg").innerHTML = " ";
	
	xpath, data = [],
    filename = [],
	k, dataArray = [];
	fileLength = 0;
	xpath = prompt("Enter the path of simulation output");
    document.getElementById("pathtext").innerHTML = " ";

    var ws = new WebSocket("ws://127.0.0.1:8081");
    ws.onopen = function(event) {
        console.log('Connection is open ...');
        ws.send(xpath); /*Sending the path entered by the user to the server*/
    };
    ws.onerror = function(err) {
        console.log('err: ', err);
    };
    ws.onmessage = function(event) {
        var k = (event.data).split('.').pop();
        /*Check if the message received consists of filenames or data of the files,if the message consists of filename then add it to the array of filename else convert the data using eval and add it in dataArray*/
        if (k === "tsv") {
            filename.push(event.data);
            fileLength = fileLength + 1;
            //console.log(filename);
        } else {
            data = eval(event.data);
            dataArray.push(data);
            disp(); /*Calling the disp function to display the last 6 files via pie chart*/
        }

    };
    ws.onclose = function() {
        console.log("Connection is closed...");
    };
}