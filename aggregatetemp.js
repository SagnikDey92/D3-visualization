var elmnt2 = document.createElement('div');
elmnt2.innerHTML = '<input type="file" id="bar2" accept=".tsv" webkitdirectory multiple >';
var input_2 = elmnt2.firstChild;
var select_2 = document.getElementById('temp');
input_2.addEventListener('change', function (evnt) 
  {
    document.getElementById("text").innerHTML=" ";
    document.getElementById("openbg").innerHTML=" ";
    document.getElementById("currentbg").innerHTML=" ";
    document.getElementById("refreshbg").innerHTML=" ";
    document.getElementById("cleanbg").innerHTML=" ";
    document.getElementById("newbg").innerHTML=" ";
    document.getElementById("aggregatesumbg").innerHTML=" ";   
    document.getElementById("aggregatetempbg").innerHTML=" ";

    var fileList = [],i,k,names=[],len,func=[],l=3,m=0,flag=0,flagi=0,t=0,o,q=0,x=0,label,res=[],funclen,s=0,st=0,dataArray=[];
    for (i = 0,j = input_2.files.length; i<j; i++) 
      {
  	fileList.push(input_2.files[i]);
  	
      }
    var filelen=fileList.length;
    console.log(filelen);
    for(i=0;i<50;i++)
    {
      func.push([0]);  
       
    }
    fileList.forEach(function (file, index) 
	  {  
	     names.push((file.name).split('.').slice(0,-1).join('.'));
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
    names=names.sort(sortAlphaNum);
    console.log(names);
    fileList.forEach(function (file, index) 
	  {  
	    d3.tsv("Data/"+ names[s]+".tsv", function(error, data) 
    	    {	
	      data.forEach(function(d)
		  {
	  	    flag=0;
		    for(i=0;i<50;i++)
		    {
		      if(func[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        //func[i][1]=func[i][1]+parseFloat(d.Time);	
			flag=1;
		      }
	              
		    }
		    if(flag!=1)
		      {
			if((((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("send"))!=-1)||(((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("rec"))!=-1))
 		        {
			  func[m][0]=(d.Call + "(" + d.Site + ")");
		          //func[m][1]=parseFloat(d.Time);
			  m=m+1;
               //           console.log(d.Call + "(" + d.Site + ")");
			}
		      }
		   });
              funclen=m;
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
      
      console.log(func);
      for(i=0;i<funclen;i++)
      {
        res[i]=func[i];
        dataArray[i]=new Array(filelen).fill(0);
      }
      console.log(res); 

var width = 500;
var height = 300;
var margin = 50;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;


/* Format Data */
//var parseDate = d3.timeParse("%Y");
//data.forEach(function(d) { 
  //d.values.forEach(function(d) {
    //d.date = parseDate(d.date);
    //d.price = +d.price;    
  //});
//});


/* Scale */
var x1 = d3.scaleBand()
           .range([0,width])
           .padding(0.1);

var y1 = d3.scaleLinear()
       	   .range([height, 0]);

x1.domain( names );
y1.domain([0, d3.max(dataArray[x],function(d){return (d+(d/4));})]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */
var svg = d3.select("#aggregatetempbg").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line = d3.line()
  .x(d => x1(names))
  .y(d => y1(d));

let lines = svg.append('g')
  .attr('class', 'lines');
/*Makes the lines*/
lines.selectAll('.line-group')
  .data(res).enter()
  .append('g')
  .attr('class', 'line-group')  
  .append('path')
  .attr('class', 'line')  
  .attr('d', d => line(d))
  .style('stroke', (d, i) => color(i))
  .style('opacity', lineOpacity)
  
/* Add circles in the line */
lines.selectAll("circle-group")
  .data(res).enter()
  .append("g")
  .style("fill", (d, i) => color(i))
  .selectAll("circle")
  .data(d => d).enter()
  .append("g")
  .attr("class", "circle")  
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d}`)
        .attr("x", d => x1(names) + 5)
        .attr("y", d => y1(d.price) - 10);
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .transition()
        .duration(duration)
        .selectAll(".text").remove();
    })
  .append("circle")
  .attr("cx", d => x1(names))
  .attr("cy", d => y1(d))
  .attr("r", circleRadius)
  .style('opacity', circleOpacity)
 

/* Add Axis into SVG */
var xAxis = d3.axisBottom(x1).ticks(12);
var yAxis = d3.axisLeft(y1).ticks(12);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000");
  //.text("Total values");

}/*function closing tag*/
    setTimeout(timeout,1000);
					   
  }); /*closing tag of addEvenListner*/
					   
    select_2.addEventListener("click", function () {  // wait for click on "select a file" button
    input_2.click();
});

								 
