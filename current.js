var s=0,namesorg=[],index=0;
var fileSelect1 = document.getElementById("cur");
//function calleventcurr()
//{  
var labelname;
var element1 = document.createElement('div');
element1.innerHTML = '<input type="file" multiple id="in" accept=".tsv" webkitdirectory multipe>';
var fileInput = element1.firstChild;                                                  
fileInput.addEventListener('change', function (evnt) 
  {
    
    document.getElementById("pathtext").innerHTML=" ";
    document.getElementById("openbg").innerHTML=" ";
    document.getElementById("currentbg").innerHTML=" ";
    /*document.getElementById("refreshbg").innerHTML=" ";
    document.getElementById("cleanbg").innerHTML=" ";
    document.getElementById("newbg").innerHTML=" ";*/
    document.getElementById("aggregatesumbg").innerHTML=" ";
    document.getElementById("aggregatetempbg").innerHTML=" ";
    document.getElementById("heatmapbg").innerHTML=" ";
    document.getElementById("headingbg").innerHTML=" ";
 
    var headingsum=d3.select("#headingbg")
                     .style("justify-content","center")
                     .append("svg")
                     .attr("width", 540)
      	             .attr("height", 37)
                     .style("text-align","center")
                     .attr("transform","translate(350,-30)")
                     .append("text")
 		     .attr("transform","translate(80,30)")
                     .style("font-size","30px")
                     .text("Function profiles of current output");    

    document.getElementById("headingbg").style.height= "20px";
          
    var fileList = [],names=[],x,s=0;
    for (var i = 0,j = fileInput.files.length; i<j; i++) 
      {
  	fileList.push(fileInput.files[i]); /*Used to push the files present in the folder in an array*/
	
      }

    //console.log(fileList);
    fileList.forEach(function (file, index) 
	  {  
	     names.push((file.name).split('.').slice(0,-1).join('.')); /*Splitting the extension of the files and pushing it in an array*/
	  });
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
/*sortAplhaNumcurr function is used to sort the alphnumeric strings*/
    function sortAlphaNumcurr(a, b) 
    {
      var aA = a.replace(reA, "");
      var bA = b.replace(reA, "");
      if (aA === bA) 
      {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
      } 
      else 
      {
        return aA > bA ? 1 : -1;
      }
    }
    names=names.sort(sortAlphaNumcurr);/*Calling the sortAphNumcurr function to sort the filenames in ascending order*/
    var filelen=names.length;
    x=filelen-6;
    j=0;
    for(i=filelen-6;i<filelen;i++)
    {
      namesorg[j]=names[i];/*Taking the names of last six files present in the folder*/
      j++;
    }
    console.log(namesorg);
                             
        x=0;
        s=0; 	
	while(x<6)    	
        {
         d3.tsv("Data/" +namesorg[x]+".tsv", function(data) /*d3 function used to read the data present in the file*/
	  {    
		            
		dispcallcurr(namesorg,data);/*Calling the dispcallcurr function to display the pie chart of last 6 files*/
	   
        });	
x++;	
	}/*while loop*/

  });	/*closing tap of the event listener*/	
			
fileSelect1.addEventListener("click", function () 
	{  // wait for click on "select a file" button
    var fullpath=(sessionStorage.getItem("pathdir"));
    if(fullpath)
    {
      noselectcurr();
    }
    else
    {
      fileInput.click();
    }
  
});

//}/*function closing tag*/

	    function dispcallcurr(labelname,data)
            {
            var label=labelname[index];   
            index++;         
            var width=350;
	    var height=280;
            
	     var svg = d3.select("#currentbg").append("svg")
	                 .attr("width", width)
                         .attr("height", height)
                         .append("g")
    			 .attr("transform", "translate(200,130)");
      	     var radius = Math.min(width, height) /3;      /*calculating the radius for the pie Chart*/
  	    
	     var textOffset=6; 
 
             var color = d3.scaleOrdinal(["#0d0887", "#6a00a8","#cb4679", "#e16462","#fca636", "#fcce25"]); /*Sets the range of Color we want in the Pie Chart*/

             var pie = d3.pie()         /*Creates the Layout For the Pie Chart*/
		.value(function(d) 
		  {         
                    return d.Time;       /*The pie chart contains the value of the MPI from tsv file and create the layout*/
            	  });

             var path = d3.arc()                   /*Creates the Layout of an Arc*/
                          .outerRadius(radius)       /*Sets An Outer Radius Of the Arc*/
                          .innerRadius(0);           /*Sets an inner Radius of an Arc and it is assigned as 0 so that we can get an shape of an Pie Chart*/
 					 
					 
	     var outerArc = d3.arc()
	                      .innerRadius(radius * 1.1)
	    		      .outerRadius(radius * 1.1);
		
		
		  svg.append("text")
        	     .attr("transform","translate(0,135)")
        	     .attr("text-anchor", "middle")  
        	     .style("font-size", "16px") 
        	     .style("text-decoration", "underline") 
        	     .text(label);
	     //s=s+1;				
            var arc = svg.selectAll(".arc")       /* selects all the Arc and creates an array  of Object*/
                       .data(pie(data))          /* the function pie(data) takes the data from the file and creates an object of that data as an Array*/
                       .enter().append("g")     /*If the data elements are more than the DOM elements we call the enter to update the data */
                       .attr("class", "arc");
         
	     var div=d3.select("#floatleft");
		  
             arc.append("path")                      /* Adds the Path for the arc*/
		.attr("d", path)                      /*adds the data to the path*/
		.attr("fill", function(d,i) 
		  { 
		    return color(i); 
		  });  /*the path is filled with the color by the data being pass
			                                                        to the color function and each data correspinds to different color*/
		      
	     svg.selectAll(".arc")
		.data(pie(data))
		.on("mousemove", function(d)
		  {
		    div.transition()	
                       .duration(500) 
                       .style("opacity", .9);	
            	   
		    div.html("Label:" + d.data.Call + "<br/>" + "Site:" + d.data.Site + "<br/>"+  "MPI:" + d.data.MPI+ "<br/>" + "Time:" + d.data.Time+ "<br/>"+ "App:" + d.data.App + "<br/>" )
			    
                       .style("color","black")	
                       .style("margin","20px")				 
                     //  .style("background-color","lightsteelblue")
                       .style("font-size","20px")	
                       .style("font-family","times new roman")
                       .style("text-align","center")
                       .style("width","200px")				  
               
           	  })					
		
		.on("mouseout", function(d) 
		  {
                    div.transition()  
		       .duration(10000)
                       .style("opacity", 0);		
           
        	   });
                     	
					
		        
		       
			 
              var labels=arc.append("text")   		 /*Adds the Label in the Arc*/
			    .attr("transform", function(d)
			      {
        			var pos = outerArc.centroid(d);
        			pos[0] = radius * (midAngle(d) < Math.PI ? 1.2: -1.4);
        			return "translate("+ pos +")"
			      })
			     
			    .attr("text-anchor","middle")      /*The label will be marked to the center of the origin*/
		            .attr("font-size","1.2em")            /*sets the font size of the Label*/
			    .attr("fill","black")  				 /* sets the color of the label*/	
			    .attr("font-family","times new roman")
			    .attr("dy",function(d)
			      { 
			        if(d.data.Call==="Irecv") {return ".5em"} 
			      })
				
             		    .text(function(d,i)
			       { 
				  return  d.data.Call + "(" + d.data.Site + ")" ;
			       }); /*For adding the Text in the Pie Chart*/
			  
			   
			   
	      var prev;
	      labels.each(function(d, i) 
	        {
  	          if(i > 0) 
		    {
    		      var thisbb = this.getBoundingClientRect(),
        	      prevbb = prev.getBoundingClientRect();
    			// move if they overlap
    		      if(!(thisbb.right < prevbb.left || thisbb.left > prevbb.right || thisbb.bottom < prevbb.top|| thisbb.top>prevbb.bottom)) 				{
        		  var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
            		  cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
            		  cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
            		  cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
            		  off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;
        		  d3.select(this).attr("transform",
            		                 "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                                    	 (radius + textOffset + off) + "," +
                           		 Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                                    	 (radius + textOffset + off) + ")");
    			}
  		     }
  		     prev = this;
		});
			  
	
	        function midAngle(d) 
		  {
      		    return d.startAngle + (d.endAngle - d.startAngle) / 2;
    		  }

    		var polyline = svg.selectAll("polyline")
      				  .data(pie(data), function(d) 
				    {
        			  	return d.data.Call
      				    })
      				  .enter()
      				  .append("polyline")
      				  .attr("points", function(d) 
				    {
        			      var pos = outerArc.centroid(d);
            			      pos[0] = radius *0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            
        			      return [path.centroid(d), outerArc.centroid(d), pos];
      				    })
   				  .style("fill", "none")
			          .style("stroke", "black")
			          .style("stroke-width", "1px");
       }/*function dispcallcurr*/


function noselectcurr()
{
    document.getElementById("pathtext").innerHTML=" ";
    document.getElementById("openbg").innerHTML=" ";
    document.getElementById("currentbg").innerHTML=" ";
    /*document.getElementById("refreshbg").innerHTML=" ";
    document.getElementById("cleanbg").innerHTML=" ";
    document.getElementById("newbg").innerHTML=" ";*/
    document.getElementById("aggregatesumbg").innerHTML=" ";
    document.getElementById("aggregatetempbg").innerHTML=" ";
    document.getElementById("heatmapbg").innerHTML=" ";
    document.getElementById("headingbg").innerHTML=" ";
    
    var headingsum=d3.select("#headingbg")
                     .style("justify-content","center")
                     .append("svg")
                     .attr("width", 540)
      	             .attr("height", 37)
                     .style("text-align","center")
                     .attr("transform","translate(350,-20)")
                     .append("text")
 		     .attr("transform","translate(80,30)")
                     .style("font-size","30px")
                     .text("Function profiles of current output");    

  document.getElementById("headingbg").style.height= "20px";
  
  var l=fileLength-6;
 
  for(i=fileLength-6;i<fileLength;i++)
    {
      namesorg.push((filename[i]).split('.').slice(0,-1).join('.'));
    }   
 
  for(i=fileLength-6;i<fileLength;i++)
    {
      var data=[];
      data=dataArray[i];
      dispcallcurr(namesorg,data);
    }

}

