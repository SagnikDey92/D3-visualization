var funcsum=[],ressum=[5],filelen,x=0,i;
/*The sumfunc function is to check whether the user has entered path in the homepage.If the user has entered the path then the dialog box to choose the files shouldn't be displayed else the dialog box should be displayed*/
function sumfunc()
  {
    var fullpath=(sessionStorage.getItem("pathdir"));
    if(fullpath)
    {
      noselectsum();
    }
    else
    {
      calleventsum();
    }
  }
/*The calleventsum function is used to display the dialog box and let the user to choose the folder*/  
function calleventsum()
{
funcsum=[];
document.getElementById("openbg").innerHTML=" ";
document.getElementById("pathtext").innerHTML=" ";
document.getElementById("currentbg").innerHTML=" ";
//document.getElementById("refreshbg").innerHTML=" ";
//document.getElementById("cleanbg").innerHTML=" ";
//document.getElementById("newbg").innerHTML=" ";
document.getElementById("aggregatesumbg").innerHTML=" ";
document.getElementById("aggregatetempbg").innerHTML=" ";
var val=document.getElementById("divtext");
if(val)
{console.log("hi"); document.getElementById("divtext").innerHTML=" ";}
var elmnt = document.createElement('div');
elmnt.innerHTML = '<input type="file" id="bar" accept=".tsv" webkitdirectory multiple >';
var input_1 = elmnt.firstChild;
var select_1 = document.getElementById('agr');	
input_1.addEventListener('change', function (evnt) 
  { 
    var fileListsum = [],i,k,filenamesum=[],len,l=3,m=0,flag=0,flagi=0,t=0,o,q=0,x=0,label,s=0,st=0;
    for (i = 0,j = input_1.files.length; i<j; i++) 
      {
  	fileListsum.push(input_1.files[i]); /*Used to push the files present in the folder in an array*/
  	
      }
    for(i=0;i<50;i++)
    {
      funcsum.push([0,0]);        /*Initalizing array with 0*/
    }
    var filelen=fileListsum.length;
    console.log(fileListsum);
    
    fileListsum.forEach(function (file, index) 
	  {  
	     filenamesum.push((file.name).split('.').slice(0,-1).join('.'));  /*Splitting the extension of the files and pushing it in an array*/
	  });
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

/*sortAplhaNumsum function is used to sort the alphnumeric strings*/

    function sortAlphaNumsum(a, b) 
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
    filenamesum=filenamesum.sort(sortAlphaNumsum); /*Calling the sortAphNumsum function to sort the filenames in ascending order*/
    console.log(filenamesum);
    fileListsum.forEach(function (file, index) 
	  {  
	    d3.tsv("Data/"+ filenamesum[s]+".tsv", function(error, data) /*d3 function used to read the data present in the file*/
    	    {	
	      data.forEach(function(d)
		  {
	  	    flag=0;
		    for(i=0;i<50;i++)
		    {
		      if(funcsum[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        funcsum[i][1]=funcsum[i][1]+parseFloat(d.Time);	/*Used to calculate the sum of each function present in all files to determine the most time consuming*/
			flag=1;
		      }
	              
		    }
		    if(flag!=1)
		      {
			funcsum[m][0]=(d.Call + "(" + d.Site + ")");
		        funcsum[m][1]=parseFloat(d.Time);/*Used to add the distinct functions*/
			m=m+1;
		      }
		   });
              for(i=0;i<50;i++)
	     {
	       flagi=0;
	       data.forEach(function(d)
		  { 	  	
		    if(funcsum[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  funcsum[i].push(d.Time);/*Used to push the time of each function in each file*/
			  flagi=1;
			}
		   });
 		   if(flagi==0)
		        {
			  funcsum[i].push("0");/*If there is no function in a file 0 is added to the particular function*/
			}
	           
	      }
	
	     });
	     
             s++;	
	   });	
 dispcallsum(funcsum,filelen,filenamesum);/*Calling the dispcallsum function to display the bar chart*/
}); /*closing tag of addEvenListner*/
select_1.addEventListener("click", function () 
	{  // wait for click on "select a file" button
           input_1.click();
	});						   
} 	     
    function dispcallsum(funcsum,filelen,filenamesum)
    {
    function timeout()
    {
      var namenosum=[],dataArraysum=[];
      var heading = document.createElement('div');
      heading.setAttribute("id", "divtext");
      heading.innerHTML='<h4 style="text-align:center;"><font color="black">Most Time Consuming Functions</h4>';
      document.body.appendChild(heading);

      funcsum.sort(sortfunction);/*Sorting the funcsum array in descending order to determine the top 5 time consuming functions*/
      function sortfunction(a,b)
      {
        if(a[1]===b[1])
        {
          return 0;
        }
        else
        {
          return(a[1]>b[1])?-1:1;
        }
      }
      console.log(funcsum);

      for(i=0;i<filelen;i++)
    {
      namenosum.push(((filenamesum[i]).split('.').pop()));/*Splitting the cg in filename inorder to display the number present in the filename alone*/       
    }
    console.log(namenosum);

      for(i=0;i<5;i++)
      {
        ressum[i]=funcsum[i][0];/*res contains the top 5 functions*/
        dataArraysum[i]=new Array(filelen).fill(0);
      }
      console.log(ressum);
      x=0;
while(x<5)
      {
        j=0;
        label=ressum[x];
        for(i=2;i<filelen+2;i++)
        {
	  dataArraysum[x][j]=(parseFloat(funcsum[x][i]));/*dataArraysum contains the time of functions present in each file*/
	  j++;
	}
	console.log(dataArraysum[x]);

    	var margin = {top: 50, right: 20, bottom: 100, left: 100},
    	  width = 500 - margin.left - margin.right,
    	  height = 370 - margin.top - margin.bottom;
	 
	var x1 = d3.scaleBand()
          	   .range([0,width])
           	   .padding(0.1);

	var y1 = d3.scaleLinear()
          	   .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
	var svg1 = d3.select("#aggregatesumbg").append("svg")
    		     .attr("width", width + margin.left + margin.right)
    		     .attr("height", height + margin.top + margin.bottom)
  		     .append("g")
    		     .attr("transform","translate(" + margin.left + "," + margin.top + ")");


	var color = d3.scaleOrdinal(["#0d0887", "#6a00a8","#cb4679", "#e16462","#fca636","#5eff33","#ff4933","#33fffc","#3633ff","#33c1ff","#ffdd33","#6c946b"]); 
		  
	var legendRectSize = 18;                                  
        var legendSpacing = 4;   
	
  	    l=3;
	    
	    // Scale the range of the data in the domains
  	    x1.domain( namenosum );
  	    y1.domain([0, d3.max(dataArraysum[x],function(d){return (d+(d/4));})]);

  	    // append the rectangles for the bar chart
  	    svg1.selectAll(".bar")
      		.data(dataArraysum[x])
    		.enter().append("rect")
      		.attr("class", "bar")
      		.attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15.5;
		    return o;
		  })
      		.attr("width", x1.bandwidth())
      		.attr("y", function(d) 
		  { 
			return y1(d);
		  })
		.attr("fill", function(d,i) 
		  { 
		    return color(i); 
		  })
      		.attr("height", function(d) 
		  {		    
		    return height - y1(d); 
		  });
	
	l=3;
	 //console.log(x1.bandwidth());
	  svg1.selectAll(".text")  		
	      .data(dataArraysum[x])
	      .enter()
	      .append("text")
	      .attr("class","label")
	      .attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15.7;
		    return o;
		  })
	      .attr("y", function(d) 
		 { 
		   return y1(d) - 10; 
		 })
	      .attr("dy", ".75em")
	      .text(function(d) 
		 { 
		   return d; 
		 });    	
//console.log(name);
  	// add the x Axis
  	svg1.append("g")
  	    .attr("transform", "translate(0," + height + ")")
  	    .call(d3.axisBottom(x1))
            .append("text")
	    .attr("x", 200)
	    .attr("y", 50)
      	    .attr("fill", "Black")
	    .style("font-family","Times New Roman")
	    .style("font-size","20px")
	    .text(label); 
//console.log(label);
  	// add the y Axis
  	svg1.append("g")
      	    .call(d3.axisLeft(y1))
	    .append("text")
	    .attr("transform", "rotate(-90)")
      	    .attr("y", -70)
	    .attr("x",-200)
            .attr("dy", "0.71em")
      	    .attr("fill", "Black")
       	    .style("font-family","Times New Roman")
	    .style("font-size","20px")
	    .text("Time");
	  
	 
	/*  var legend = svg1.selectAll('.legend')                     
          		   .data(color.domain())                                   
          		   .enter()                                                
          		   .append('g')                                            
          		   .attr('class', 'legend')                                
          		   .attr('transform', function(d, i) 
			     {                    
            		       var height = legendRectSize + legendSpacing;         
            		       var offset =  height * color.domain().length / 2;     
            		       var horz = 18 * legendRectSize;                        
            		       var vert = i * height + offset;                       
            		       return 'translate(' + horz + ',' + vert + ')';        
			      });              */                                       

        
        x++;
      
}/*while loop*/

      }/*function closing tag*/
setTimeout(timeout,1000);/*Setting timeout in order to process the results*/
}
/*Function to directly display the bar charts if the user has given the path directory*/
function noselectsum()
{
document.getElementById("openbg").innerHTML=" ";
document.getElementById("pathtext").innerHTML=" ";
document.getElementById("currentbg").innerHTML=" ";
//document.getElementById("refreshbg").innerHTML=" ";
//document.getElementById("cleanbg").innerHTML=" ";
//document.getElementById("newbg").innerHTML=" ";
document.getElementById("aggregatesumbg").innerHTML=" ";
document.getElementById("aggregatetempbg").innerHTML=" ";
var val=document.getElementById("divtext");
if(val)
{document.getElementById("divtext").innerHTML=" ";}

var flag=0,m=0,j=0,namenosum=[],filenamesum=[];
filelen=dataArray.length;
for(i=0;i<50;i++)
{
  funcsum.push([0,0]);        
}
for(var i=0;i<dataArray.length;i++)
{
  var data=dataArray[i];
  data.forEach(function(d)
  {
    flag=0;
    for(j=0;j<50;j++)
    {
      if(funcsum[j][0]==d.Call + "(" + d.Site + ")")
      {
	funcsum[j][1]=funcsum[j][1]+parseFloat(d.Time);	
	flag=1;
      }              
    }
    if(flag!=1)
    {
      funcsum[m][0]=(d.Call + "(" + d.Site + ")");
      funcsum[m][1]=parseFloat(d.Time);
      m=m+1;
    }

  });//data for each function
  for(j=0;j<50;j++)
  {
   flagi=0;
   data.forEach(function(d)
   { 	  	
     if(funcsum[j][0]==d.Call+ "(" +d.Site+ ")")
     { 
       funcsum[j].push(d.Time);
       flagi=1;
     }
   });
   if(flagi==0)
   {
    funcsum[j].push("0");
   }
  }

//console.log(i);
}//outer for loop
console.log(funcsum);
for(i=0;i<filename.length;i++)
{
 filenamesum[i]=(filename[i]).split('.').slice(0,-1).join('.');
}
dispcallsum(funcsum,filelen,filenamesum); 	
}//function closing

