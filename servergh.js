'use strict';

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081});

wss.on('connection', ((ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);	
    var dirname=message;
    //console.log(dirname);
     //var filenames=[];

var fs=require('fs');
     fs.readdir(dirname, function(err, filenames) 
      {
	
	var collator=new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});
	filenames=filenames.sort(collator.compare)        
	var len=filenames.length;        
	var i,dataArray=[];	
       
	for(i=len-1;i>=len-6;i--) 
       {
        
	var filename=filenames[i];	
	console.log(filename);
	var j=0,arr=[];
		
	ws.send(filename);
	var d3=require("d3");  
        filenames.forEach(function(filename){       
	fs.readFile(dirname +"/"+ filename, 'utf-8', function(err, data) 
	  {	
     	    data=d3.tsvParse(data);
	    dataArray.push(data);
       
	   
	   // console.log(JSON.stringify(data));

          });//readFile closing tag
         }); //foreach function
	}//for loop closing tag
//console.log(dataArray);
      });//readdir closing tag
  ws.send(JSON.stringify(dataArray)); 
ws.on('end', () => {
    console.log('Connection ended...');
  });

  }); //ws message close

})); //wss connection close


