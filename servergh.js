'use strict';

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081});

wss.on('connection', ((ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);	
    var dirname=message;
    //console.log(dirname);
     var dataArray=[];

var fs=require('fs');
     fs.readdir(dirname, function(err, filenames) 
      {
	
	var collator=new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});
	filenames=filenames.sort(collator.compare)        
	var len=filenames.length;        
	var i;	
       
	for(i=0;i<len;i++) 
       {
        
	var filename=filenames[i];	
	console.log(filename);
        ws.send(filename);
       }
	var j=0,arr=[];
		
	var d3=require("d3");  
        filenames.forEach(function(filename){       
	fs.readFile(dirname +"/"+ filename, 'utf-8', function(err, data) 
	  {	
     	    data=d3.tsvParse(data);
	    ws.send(JSON.stringify(data));

          });//readFile closing tag
//console.log(dataArray);
         }); //foreach function
	//}//for loop closing tag
      });//readdir closing tag
   
ws.on('end', () => {
    console.log('Connection ended...');
  });

  }); //ws message close

})); //wss connection close


