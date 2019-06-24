var func=[],res=[5],filelen,x=0,i;

function callevent()
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
var elmnt = document.createElement('div');
elmnt.innerHTML = '<input type="file" id="bar" accept=".tsv" webkitdirectory multiple >';
var input_1 = elmnt.firstChild;
var select_1 = document.getElementById('agr');	
input_1.addEventListener('change', function (evnt) 
  { 
    var fileList = [],i,k,filename=[],len,l=3,m=0,flag=0,flagi=0,t=0,o,q=0,x=0,label,s=0,st=0,dataArray=[];
    for (i = 0,j = input_1.files.length; i<j; i++) 
      {
  	fileList.push(input_1.files[i]);
  	
      }
    for(i=0;i<50;i++)
    {
      func.push([0,0]);        
    }
    var filelen=fileList.length;
    console.log(fileList);
    
    fileList.forEach(function (file, index) 
	  {  
	     filename.push((file.name).split('.').slice(0,-1).join('.'));
	  });
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

    function sortAlphaNum(a, b) 
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
    filename=filename.sort(sortAlphaNum);
    console.log(filename);
    fileList.forEach(function (file, index) 
	  {  
	    d3.tsv("Data/"+ filename[s]+".tsv", function(error, data) 
    	    {	
	      data.forEach(function(d)
		  {
	  	    flag=0;
		    for(i=0;i<50;i++)
		    {
		      if(func[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        func[i][1]=func[i][1]+parseFloat(d.Time);	
			flag=1;
		      }
	              
		    }
		    if(flag!=1)
		      {
			func[m][0]=(d.Call + "(" + d.Site + ")");
		        func[m][1]=parseFloat(d.Time);
			m=m+1;
		      }
		   });
              for(i=0;i<50;i++)
	     {
	       flagi=0;
	       data.forEach(function(d)
		  { 	  	
		    if(func[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  func[i].push(d.Time);
			  flagi=1;
			}
		   });
 		   if(flagi==0)
		        {
			  func[i].push("0");
			}
	           
	      }
	
	     });
	     
             s++;	
	   });	
 

    function timeout()
    {
      var heading = document.createElement('divtext');
      heading.setAttribute("id", "divtext");
      heading.innerHTML='<h4 style="text-align: center;"><font color="black">Most Time Consuming Functions</h4>';
      document.body.appendChild(heading);

      func.sort(sortfunction);
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
      console.log(func);
      for(i=0;i<5;i++)
      {
        res[i]=func[i][0];
        dataArray[i]=new Array(filelen).fill(0);
      }
      console.log(res);
      
while(x<5)
      {
        j=0;
        label=res[x];
        for(i=2;i<filelen+2;i++)
        {
	  dataArray[x][j]=(parseFloat(func[x][i]));
	  j++;
	}
	console.log(dataArray[x]);

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
  	    x1.domain( filename );
  	    y1.domain([0, d3.max(dataArray[x],function(d){return (d+(d/4));})]);

  	    // append the rectangles for the bar chart
  	    svg1.selectAll(".bar")
      		.data(dataArray[x])
    		.enter().append("rect")
      		.attr("class", "bar")
      		.attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15;
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
	      .data(dataArray[x])
	      .enter()
	      .append("text")
	      .attr("class","label")
	      .attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15;
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
	  
	 
	  var legend = svg1.selectAll('.legend')                     
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
			      });                                                     

        
        x++;
      
}/*while loop*/


      
    
  
      }/*function closing tag*/
setTimeout(timeout,1000);
}); /*closing tag of addEvenListner*/
select_1.addEventListener("click", function () 
	{  // wait for click on "select a file" button
           input_1.click();
	});						   
} 	     

function noselect()
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

var flag=0,m=0,j=0;
filelen=dataArray.length;
//console.log(dataArray);
console.log("HII");
for(i=0;i<50;i++)
{
  func.push([0,0]);        
}
for(var i=0;i<dataArray.length;i++)
{
  var data=dataArray[i];
  data.forEach(function(d)
  {
    flag=0;
    for(j=0;j<50;j++)
    {
      if(func[j][0]==d.Call + "(" + d.Site + ")")
      {
	func[j][1]=func[j][1]+parseFloat(d.Time);	
	flag=1;
      }              
    }
    if(flag!=1)
    {
      func[m][0]=(d.Call + "(" + d.Site + ")");
      func[m][1]=parseFloat(d.Time);
      m=m+1;
    }

  });//data for each function
  for(j=0;j<50;j++)
  {
   flagi=0;
   data.forEach(function(d)
   { 	  	
     if(func[j][0]==d.Call+ "(" +d.Site+ ")")
     { 
       func[j].push(d.Time);
       flagi=1;
     }
   });
   if(flagi==0)
   {
    func[j].push("0");
   }
  }

//console.log(i);
}//outer for loop
console.log(func);
function timeout()
    {
      
      var heading = document.createElement('divtext');
      heading.setAttribute("id", "divtext");
      heading.innerHTML='<h4 style="text-align: center;"><font color="black">Most Time Consuming Functions</h4>';
      document.body.appendChild(heading);

      func.sort(sortfunction);
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
      console.log(func);
      for(i=0;i<5;i++)
      {
        res[i]=func[i][0];
        dataArray[i]=new Array(filelen).fill(0);
      }
      for(i=0;i<filename.length;i++)
      {
        filename[i]=filename[i].split('.').slice(0,-1).join('.');
      }
      while(x<5)
      {
        j=0;
        label=res[x];
        console.log(res[x]);
        for(i=2;i<filelen+2;i++)
        {
	  dataArray[x][j]=(parseFloat(func[x][i]));
	  j++;
	}
	console.log(dataArray[x]);

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
  	    x1.domain( filename );
  	    y1.domain([0, d3.max(dataArray[x],function(d){return (d+(d/4));})]);

  	    // append the rectangles for the bar chart
  	    svg1.selectAll(".bar")
      		.data(dataArray[x])
    		.enter().append("rect")
      		.attr("class", "bar")
      		.attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15;
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
	      .data(dataArray[x])
	      .enter()
	      .append("text")
	      .attr("class","label")
	      .attr("x", function(d) 
		  { 
		    o=2*l;
		    l=l+15;
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
	  
	 
	  var legend = svg1.selectAll('.legend')                     
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
			      });                                                     

        
        x++;
      
}/*while loop*/
}/*function closing tag*/
setTimeout(timeout,1000);
					   
 	
}//function closing
								 

