/*The tempfunc function is to check whether the user has entered path in the homepage.If the user has entered the path then the dialog box to choose the files shouldn't be displayed else the dialog box should be displayed*/
function tempfunc()
  {
    var fullpath=(sessionStorage.getItem("pathdir"));
    if(fullpath)
    {
      noselecttemp();
    }
    else
    { console.log("1t");    
      calleventtemp();
    }
  }
/*The calleventtemp function is used to display the dialog box and let the user to choose the folder*/
function calleventtemp()
{  
var tempelmnt = document.createElement('div');
tempelmnt.innerHTML = '<input type="file" id="bar2" accept=".tsv" webkitdirectory multiple >';
var tempinput = tempelmnt.firstChild;
//var tempselect = document.getElementById('temp');
console.log("2t");
//tempselect.addEventListener("click", function () {  // wait for click on "select a file" button
    console.log("3t");
    tempinput.click();
//});
tempinput.addEventListener('change', function (evnt) 
  {console.log("4t");
      
    document.getElementById("pathtext").innerHTML=" ";
    document.getElementById("openbg").innerHTML=" ";
    document.getElementById("currentbg").innerHTML=" ";
    //document.getElementById("refreshbg").innerHTML=" ";
    //document.getElementById("cleanbg").innerHTML=" ";
    //document.getElementById("newbg").innerHTML=" ";
    document.getElementById("aggregatesumbg").innerHTML=" ";   
    document.getElementById("aggregatetempbg").innerHTML=" ";
    document.getElementById("headingbg").innerHTML=" ";

    var texthead,texthead2,nameno=[],flag=0,flag2=0,filelen;
    var fileList = [],i,k,filename=[],len,l=3,m=0,n=0,flagi=0,t=0,o,q=0,x=0,label,s=0,st=0,funclen,funclen2,flagi2=0;
    var func2=[],func=[];
    for (i = 0,j = tempinput.files.length; i<j; i++) 
      {
  	fileList.push(tempinput.files[i]);/*Used to push the files present in the folder in an array*/
  	
      }
    for(i=0;i<50;i++)
    {
      func.push([0,0]);  /*Initalizing array with 0*/
      func2.push([0,0]); /*Initalizing array with 0*/     
    }
    filelen=fileList.length;
    console.log(fileList);
    	
    fileList.forEach(function (file, index) 
	  {  
	     filename.push((file.name).split('.').slice(0,-1).join('.'));/*Splitting the extension of the files and pushing it in an array*/
	  });
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

/*sortAplhaNum function is used to sort the alphnumeric strings*/

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
    filename=filename.sort(sortAlphaNum);/*Calling the sortAphNum function to sort the filenames in ascending order*/
    for(i=0;i<filename.length;i++)
    {
      nameno.push(((filename[i]).split('.').pop()));/*Splitting the cg in filename inorder to display the number present in the filename alone*/             
    }
    console.log(nameno);
    console.log(filename);
    fileList.forEach(function (file, index) 
	  {  
	    d3.tsv("Data/"+ filename[s]+".tsv", function(error, data) 
    	    {	
	      data.forEach(function(d)
		  {
	  	    flag=0;
                    flag1=0;
		    for(i=0;i<50;i++)
		    {
		      if(func[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        func[i][1]=func[i][1]+parseFloat(d.Time);/*Used to calculate the sum of each function present in all files to determine the most time consuming*/	
			flag=1;
		      }
                      
                      if(func2[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        func2[i][1]=func2[i][1]+parseFloat(d.Time);/*Used to add the distinct functions*/	
			flag2=1;
		      }
 
		    }
		    if(flag!=1)
		      {
                        if((((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("send"))!=-1)||(((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("rec"))!=-1))/*If the function is send or recieve it will be stored in func array*/
                        {
			func[m][0]=(d.Call + "(" + d.Site + ")");
		        func[m][1]=parseFloat(d.Time);
			m=m+1;
                        }
                      }
      
                     if(flag2!=1)
                       {    
                        if((((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("wait"))!=-1)||(((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("barrier"))!=-1))/*If the function is wait or barrier it will be stored in func2 array*/
                        {
			func2[n][0]=(d.Call + "(" + d.Site + ")");
		        func2[n][1]=parseFloat(d.Time);
			n=n+1;
                        }
		      }
		   }); /*Data for Each function closing tag*/
              funclen=m;
              funclen2=n;
              for(i=0;i<50;i++)
	     {
	       flagi=0;
               flagi2=0;
	       data.forEach(function(d)
		  { 	  	
		    if(func[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  func[i].push(d.Time);/*Used to push the time of each function in each file*/
			  flagi=1;
			}
                    if(func2[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  func2[i].push(d.Time);/*Used to push the time of each function in each file*/
			  flagi2=1;
			}
		   });/*Data for Each function closing tag*/
 		   if(flagi==0)
		        {
			  func[i].push("0");/*If there is no function in a file 0 is added to the particular function*/
			}
	           if(flagi2==0)
		        {
			  func2[i].push("0");/*If there is no function in a file 0 is added to the particular function*/
			}
	           
	      } /*for loop closing tag*/
	
	     }); /*d3 closing tag*/
	     
             s++;	
	   }); /*fileList closing tag*/
    dispcalltemp(func,func2,nameno,filelen);/*Calling the dispcalltemp function to display the line chart*/
   					   
  }); /*closing tag of addEvenListner*/
					   

}
    function dispcalltemp(func,func2,nameno,filelen)
    {var funcobj1=[],funcobj2=[],funcobj3=[],funcobj4=[],funcobj5=[],max=0,res=[],res2=[],max2=0;
    var funcobj21=[],funcobj22=[],funcobj23=[],funcobj24=[],funcobj25=[],last=0,first=0,dataArray2=[],dataArray=[];
    
    function timeout()
    {
     var headingsum=d3.select("#headingbg")
                      .style("justify-content","center")
                      .append("svg")
                      .attr("width", 740)
      	              .attr("height", 37)
                      .style("text-align","center")
                      .attr("transform","translate(200,-30)")
                      .append("text")
                      .attr("transform","translate(0,30)")
                      .style("font-size","30px")
                      .text("Distribution over time of most time consuming functions");    
          
      document.getElementById("headingbg").style.height= "0px";

      func2.sort(sortfunction); /*Sorting the func array in descending order to determine the top 5 time consuming functions*/      
      func.sort(sortfunction);/*Sorting the func2 array in descending order to determine the top 5 time consuming functions*/
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
       console.log(func2);
      for(i=0;i<5;i++)
      {
        res[i]=func[i];/*Consists of top 5 functions along with the time in each file*/
        dataArray[i]=new Array(filelen).fill(0);
      }
      console.log(res);

       for(i=0;i<5;i++)
      {
        res2[i]=func2[i];/*Consists of top 5 functions along with the time in each file*/
        dataArray2[i]=new Array(filelen).fill(0);
      }
      console.log(res2);
   
   
      x=0;
      while(x<5)
      {j=0;
        for(i=2;i<filelen+2;i++)
        {
          dataArray[x][j]=(parseFloat(func[x][i]));
          if(dataArray[x][j]>max)/*Determining the maximum time of the func array to set the y domain*/
          {
            max=dataArray[x][j];

          }
	  j++;
        }
        x++;
      }
      

      x=0;
      while(x<5)
      {j=0;
        for(i=2;i<filelen+2;i++)
        {
          dataArray2[x][j]=(parseFloat(func2[x][i]));
          if(dataArray2[x][j]>max2)/*Determining the maximum time of the func2 array to set the y domain*/
          {
            max2=dataArray[x][j];

          }
	  j++;
        }
        x++;
      } 
       
      console.log(max);
      console.log(max2);	
      //console.log(dataArray);
      
      texthead="Time Profile of MPI Point-to-Point Communication";
      texthead2="Time Profile of MPI Synchronization Functions";
      /*Creating associative arrays to retrieve the values in line chart*/
      for(i=0;i<dataArray[0].length;i++)
        {  
          funcobj1.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray[0][i])
          });
        }
     //console.log(funcobj1);
    
     for(i=0;i<dataArray[1].length;i++)
        {  
          funcobj2.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray[1][i])
          });
        }
     //console.log(funcobj2);
    
     for(i=0;i<dataArray[2].length;i++)
        {  
          funcobj3.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray[2][i])
          });
        }
     //console.log(funcobj3);

     for(i=0;i<dataArray[3].length;i++)
        {  
          funcobj4.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray[3][i])
          });
        }
     //console.log(funcobj4);

     for(i=0;i<dataArray[4].length;i++)
        {  
          funcobj5.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray[4][i])
          });
        }
     //console.log(funcobj5);
 
     

      for(i=0;i<dataArray2[0].length;i++)
        {  
          funcobj21.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray2[0][i])
          });
        }
     //console.log(funcobj21);
    
     for(i=0;i<dataArray2[1].length;i++)
        {  
          funcobj22.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray2[1][i])
          });
        }
     //console.log(funcobj22);
    
     for(i=0;i<dataArray2[2].length;i++)
        {  
          funcobj23.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray2[2][i])
          });
        }
     //console.log(funcobj23);

     for(i=0;i<dataArray2[3].length;i++)
        {  
          funcobj24.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray2[3][i])
          });
        }
     //console.log(funcobj24);

     for(i=0;i<dataArray2[4].length;i++)
        {  
          funcobj25.push({
          'Filename':nameno[i],
          'Value':parseFloat(dataArray2[4][i])
          });
        }
     //console.log(funcobj25);
    
     first=nameno[0];
     last=nameno[filelen-1];
     var x1=[],x2=[],x3=[],x4=[],x5=[],textlabel;     
     draw(res,funcobj1,funcobj2,funcobj3,funcobj4,funcobj5,max,texthead);/*Calling the draw function to display the line chart*/
     draw(res2,funcobj21,funcobj22,funcobj23,funcobj24,funcobj25,max2,texthead2);/*Calling the draw function to display the line chart*/

function draw(res,x1,x2,x3,x4,x5,max,textlabel)
{ 
var width = 500;
var height = 300;
var margin = 50;


/* Scale */
var x = d3.scaleLinear()
          .domain([first,last])
           .range([0,width]);

var y = d3.scaleLinear()
       	   .range([height, 0]);

// x.domain(nameno);

y.domain([0,max+5]);
/* Add SVG */
var svg = d3.select("#aggregatetempbg").append("svg")
  .attr("width", ((width+100)+2*margin)+"px")
  .attr("height", (height+3*margin)+"px");
var g = svg.append('g')
  .attr("transform", `translate(${2*margin}, ${margin})`);

var line1 = d3.line()
            .x(function(d) {
                return x(d.Filename)
            })
            .y(function(d) {
                return y(d.Value)
            });
//var xAxis = d3.axisBottom(x)
  //.attr("transform", "translate(0,0)")
  //.tickValues(x.domain().filter(function(d,i){ return d}));
       
	g.append("g")
  	    .attr("transform", "translate(0," + height + ")")
  	    .call(d3.axisBottom(x));    
        g.append("g").call(d3.axisLeft(y));
        g.append("path").datum(x1).attr("fill", "none").attr("stroke",
"red").attr("stroke-linejoin", "round").attr("stroke-linecap",
"round").attr("stroke-width", 1.5).attr("d", line1);
        g.append("path").datum(x2).attr("fill", "none").attr("stroke",
"green").attr("stroke-linejoin", "round").attr("stroke-linecap",
"round").attr("stroke-width", 1.5).attr("d", line1);
        g.append("path").datum(x3).attr("fill", "none").attr("stroke",
"black").attr("stroke-linejoin", "round").attr("stroke-linecap",
"round").attr("stroke-width", 1.5).attr("d", line1);
        g.append("path").datum(x4).attr("fill", "none").attr("stroke",
"blue").attr("stroke-linejoin", "round").attr("stroke-linecap",
"round").attr("stroke-width", 1.5).attr("d", line1);
        g.append("path").datum(x5).attr("fill", "none").attr("stroke",
"orange").attr("stroke-linejoin", "round").attr("stroke-linecap",
"round").attr("stroke-width", 1.5).attr("d", line1); 

  /*Used to add circles*/
        
  var selectCircle = g.selectAll(".circle")
    .data(x1)
  var selectCircle2 = g.selectAll(".circle")
    .data(x2)
  var selectCircle3 = g.selectAll(".circle")
    .data(x3)
  var selectCircle4 = g.selectAll(".circle")
    .data(x4)
  var selectCircle5 = g.selectAll(".circle")
    .data(x5)  


  selectCircle.enter().append("circle")
    .attr("class", "circle")
    .attr("r", 3.5)
    .attr("cx", function(d) {
      return x(d.Filename)
    })
    .attr("cy", function(d) {
      return y(d.Value)
    })
 
  selectCircle2.enter().append("circle")
    .attr("class", "circle")
    .attr("r", 3.5)
    .attr("cx", function(d) {
      return x(d.Filename)
    })
    .attr("cy", function(d) {
      return y(d.Value)
    })
 
  
  selectCircle3.enter().append("circle")
    .attr("class", "circle")
    .attr("r", 3.5)
    .attr("cx", function(d) {
      return x(d.Filename)
    })
    .attr("cy", function(d) {
      return y(d.Value)
    })
 
  
  selectCircle4.enter().append("circle")
    .attr("class", "circle")
    .attr("r", 3.5)
    .attr("cx", function(d) {
      return x(d.Filename)
    })
    .attr("cy", function(d) {
      return y(d.Value)
    })  

  
  selectCircle5.enter().append("circle")
    .attr("class", "circle")
    .attr("r", 3.5)
    .attr("cx", function(d) {
      return x(d.Filename)
    })
    .attr("cy", function(d) {
      return y(d.Value)
    })


        //text label for displaying the name of the line chart
        g.append("text").attr("transform","translate(" + (width/2) + "," + (height-300) + ")").style("text-anchor",
"middle").text(textlabel);

        //text label for x axis
        g.append("text").attr("transform","translate(" + (width/2) + "," + (height+40) + ")").style("text-anchor",
"middle").text("Snapshots");

        //text label for y axis
        g.append("text").attr("transform", "rotate(-90)").attr("y", 0 -
margin).attr("x",0 - (height / 2)).attr("dy",
"1em").style("text-anchor", "middle").text("Time");

        //legend
        var legend_keys = [res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];
            var color = ["red","green","black","blue","orange"];
            var lineLegend = g.selectAll(".lineLegend").data(legend_keys)
                .enter().append("g")
                .attr("class","lineLegend")
                .attr("transform", function (d,i) {
                        return "translate(" + (width+100) + "," + (i*20)+")";
                    });
            lineLegend.append("text").text(function (d) {return d;})
                      .attr("transform", "translate(-60,9)"); //align texts with boxes
            lineLegend.append("rect").attr("fill", function (d, i) {return color[i];})
                      .attr("width", 10).attr("height", 10).attr("transform","translate(-80,0)");
 				

}/*function closing tag of draw*/


}/*function closing tag of timeout*/
    setTimeout(timeout,1000);/*Setting timeout in order to process the results*/

}								
/*Function to directly display the line charts if the user has given the path directory*/
function noselecttemp()
{
    var func=[],func2=[];
    var texthead,texthead2,nameno=[],flag=0,flag2=0,filelen,filename2=[];
    var fileList = [],i,k,len,l=3,m=0,n=0,flagi=0,t=0,o,q=0,x=0,label,s=0,st=0,funclen,funclen2,flagi2=0;

    document.getElementById("pathtext").innerHTML=" ";
    document.getElementById("openbg").innerHTML=" ";
    document.getElementById("currentbg").innerHTML=" ";
    //document.getElementById("refreshbg").innerHTML=" ";
    //document.getElementById("cleanbg").innerHTML=" ";
    //document.getElementById("newbg").innerHTML=" ";
    document.getElementById("aggregatesumbg").innerHTML=" ";   
    document.getElementById("aggregatetempbg").innerHTML=" ";
    document.getElementById("headingbg").innerHTML=" ";  

    filelen=dataArray.length;
 
    for(i=0;i<50;i++)
    {
      func.push([0,0]);  
      func2.push([0,0]);      
    }

    for(i=0;i<filename.length;i++)
    {
      filename2.push((filename[i]).split('.').slice(0,-1).join('.'));        
    }
    
    for(i=0;i<filename2.length;i++)
    {
      nameno.push(((filename2[i]).split('.').pop()));      
    }
    

    for(var i1=0;i1<dataArray.length;i1++)
    {
      var data=dataArray[i1];

      data.forEach(function(d)
		  {
	  	    flag=0;
                    flag1=0;
		    for(i=0;i<50;i++)
		    {
		      if(func[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        func[i][1]=func[i][1]+parseFloat(d.Time);	
			flag=1;
                        
		      }
                      
                      if(func2[i][0]==d.Call + "(" + d.Site + ")")
		      {
		        func2[i][1]=func2[i][1]+parseFloat(d.Time);	
			flag2=1;
		      }
 
		    }
		    if(flag!=1)
		      {
                        if((((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("send"))!=-1)||(((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("rec"))!=-1))
                        {
			func[m][0]=(d.Call + "(" + d.Site + ")");
		        func[m][1]=parseFloat(d.Time);
			m=m+1;
                        }
                      }
      
                     if(flag2!=1)
                       {    
                        if((((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("wait"))!=-1)||(((d.Call + "(" + d.Site + ")").toLowerCase().indexOf("barrier"))!=-1))
                        {
			func2[n][0]=(d.Call + "(" + d.Site + ")");
		        func2[n][1]=parseFloat(d.Time);
			n=n+1;
                        }
		      }
		   }); /*Data for Each function closing tag*/
//console.log(func);
//console.log(func2);
              funclen=m;
              funclen2=n;
              for(i=0;i<50;i++)
	     {
	       flagi=0;
               flagi2=0;
	       data.forEach(function(d)
		  { 	  	
		    if(func[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  func[i].push(d.Time);
			  flagi=1;
			}
                    if(func2[i][0]==d.Call+ "(" +d.Site+ ")")
		        { 
			  func2[i].push(d.Time);
			  flagi2=1;
			}
		   });/*Data for Each function closing tag*/
 		   if(flagi==0)
		        {
			  func[i].push("0");
			}
	           if(flagi2==0)
		        {
			  func2[i].push("0");
			}
	           
	      } /*for loop closing tag*/

	}/*outer for loop*/

         dispcalltemp(func,func2,nameno,filelen);
}
