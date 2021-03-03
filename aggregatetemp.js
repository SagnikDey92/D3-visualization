/*The tempfunc function is to check whether the user has entered path in the homepage.If the user has entered the path then the dialog box to choose the files shouldn't be displayed else the dialog box should be displayed*/
function tempfunc() {
  if (xpath == null) {
      xpath = prompt("Please enter path to Data", "/home/sagnik/Desktop/HPC/D3-visualization/Data");
      myFunction();
  }
  if (fetched == false) {
      window.setTimeout(tempfunc, 100);
  } else {
      noselecttemp();
  }
}

function dispcalltemp(top_func_times, max) {
  function timeout() {

    var funcobj1 = [],
      funcobj2 = [],
      funcobj3 = [],
      funcobj4 = [],
      funcobj5 = [],
      i

      /*Creating the header text*/

      var headingsum = d3.select("#headingbg")
          .style("justify-content", "center")
          .append("svg")
          .attr("width", 740)
          .attr("height", 37)
          .style("text-align", "center")
          .attr("transform", "translate(400,-20)")
          .append("text")
          .attr("transform", "translate(0,30)")
          .style("font-size", "30px")
          .text("Distribution over time of most time consuming functions");

      document.getElementById("headingbg").style.height = "0px";

      console.log(max);

      var texthead = "Time Profile of MPI Point-to-Point Communication";
      var texthead2 = "Time Profile of MPI Synchronization Functions";

      var func_names = Object.keys(top_func_times)
      var nameno = Object.keys(dataDict).sort()
      /*Creating associative arrays to retrieve the values in line chart*/
      //Five objects is per funtion. So top 5 functions  
      for (i = 0; i < top_func_times[func_names[0]].length; i++) {
          funcobj1.push({
              'Filename': i,
              'Value': top_func_times[func_names[0]][i]
          });
      }
      console.log(funcobj1);

      for (i = 0; i < top_func_times[func_names[1]].length; i++) {
        funcobj2.push({
            'Filename': i,
            'Value': top_func_times[func_names[1]][i]
        });
      }
      console.log(funcobj2);

      for (i = 0; i < top_func_times[func_names[2]].length; i++) {
        funcobj3.push({
            'Filename': i,
            'Value': top_func_times[func_names[2]][i]
        });
      }
      console.log(funcobj3);

      for (i = 0; i < top_func_times[func_names[3]].length; i++) {
        funcobj4.push({
            'Filename': i,
            'Value': top_func_times[func_names[3]][i]
        });
      }
      console.log(funcobj4);

      for (i = 0; i < top_func_times[func_names[4]].length; i++) {
        funcobj5.push({
            'Filename': i,
            'Value': top_func_times[func_names[4]][i]
        });
      }

      console.log(funcobj5);

    //   for (i = 0; i < dataArray2[0].length; i++) {
    //       funcobj21.push({
    //           'Filename': nameno[i],
    //           'Value': parseFloat(dataArray2[0][i])
    //       });
    //   }
    //   //console.log(funcobj21);

    //   for (i = 0; i < dataArray2[1].length; i++) {
    //       funcobj22.push({
    //           'Filename': nameno[i],
    //           'Value': parseFloat(dataArray2[1][i])
    //       });
    //   }
    //   //console.log(funcobj22);

    //   for (i = 0; i < dataArray2[2].length; i++) {
    //       funcobj23.push({
    //           'Filename': nameno[i],
    //           'Value': parseFloat(dataArray2[2][i])
    //       });
    //   }
    //   //console.log(funcobj23);

    //   for (i = 0; i < dataArray2[3].length; i++) {
    //       funcobj24.push({
    //           'Filename': nameno[i],
    //           'Value': parseFloat(dataArray2[3][i])
    //       });
    //   }
    //   //console.log(funcobj24);

    //   for (i = 0; i < dataArray2[4].length; i++) {
    //       funcobj25.push({
    //           'Filename': nameno[i],
    //           'Value': parseFloat(dataArray2[4][i])
    //       });
    //   }
      //console.log(funcobj25);

      first = 0;
      last = 4;

      draw(func_names, funcobj1, funcobj2, funcobj3, funcobj4, funcobj5, max, texthead); /*Calling the draw function to display the line chart*/
      //draw(res2, funcobj21, funcobj22, funcobj23, funcobj24, funcobj25, max2, texthead2); /*Calling the draw function to display the line chart*/

      function draw(res, x1, x2, x3, x4, x5, max, textlabel) {
          var width = 500;
          var height = 300;
          var margin = 50;


          /* Scale */
          var x = d3.scaleLinear()
              .domain([first, last])
              .range([0, width]);

          var y = d3.scaleLinear()
              .range([height, 0]);

          // x.domain(nameno);

          y.domain([0, max * 1.2]);
          /* Add SVG */
          var svg = d3.select("#aggregatetempbg").append("svg")
              .attr("width", ((width + 100) + 2 * margin) + "px")
              .attr("height", (height + 3 * margin) + "px");
          var g = svg.append('g')
              .attr("transform", `translate(${2*margin}, ${margin})`);

          var line1 = d3.line()
              .x(function(d) {
                  //console.log(d.Value)
                  return x(d.Value)
              })
              .y(function(d) {
                //console.log(d.Filename)
                  return y(d.Filename)
              });

          g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));
          g.append("g").call(d3.axisLeft(y));

        //   g.append("path").datum(x1).attr("fill", "none").attr("stroke",
        //       "red").attr("stroke-linejoin", "round").attr("stroke-linecap",
        //       "round").attr("stroke-width", 1.5).attr("d", line1);
        //   g.append("path").datum(x2).attr("fill", "none").attr("stroke",
        //       "green").attr("stroke-linejoin", "round").attr("stroke-linecap",
        //       "round").attr("stroke-width", 1.5).attr("d", line1);
        //   g.append("path").datum(x3).attr("fill", "none").attr("stroke",
        //       "black").attr("stroke-linejoin", "round").attr("stroke-linecap",
        //       "round").attr("stroke-width", 1.5).attr("d", line1);
        //   g.append("path").datum(x4).attr("fill", "none").attr("stroke",
        //       "blue").attr("stroke-linejoin", "round").attr("stroke-linecap",
        //       "round").attr("stroke-width", 1.5).attr("d", line1);
        //   g.append("path").datum(x5).attr("fill", "none").attr("stroke",
        //       "orange").attr("stroke-linejoin", "round").attr("stroke-linecap",
        //       "round").attr("stroke-width", 1.5).attr("d", line1);

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
              .style("fill", "red")

          selectCircle2.enter().append("circle")
              .attr("class", "circle")
              .attr("r", 3.5)
              .attr("cx", function(d) {
                  return x(d.Filename)
              })
              .attr("cy", function(d) {
                  return y(d.Value)
              })
              .style("fill", "green")


          selectCircle3.enter().append("circle")
              .attr("class", "circle")
              .attr("r", 3.5)
              .attr("cx", function(d) {
                  return x(d.Filename)
              })
              .attr("cy", function(d) {
                  return y(d.Value)
              })
              .style("fill", "black")


          selectCircle4.enter().append("circle")
              .attr("class", "circle")
              .attr("r", 3.5)
              .attr("cx", function(d) {
                  return x(d.Filename)
              })
              .attr("cy", function(d) {
                  return y(d.Value)
              })
              .style("fill", "blue")


          selectCircle5.enter().append("circle")
              .attr("class", "circle")
              .attr("r", 3.5)
              .attr("cx", function(d) {
                  return x(d.Filename)
              })
              .attr("cy", function(d) {
                  return y(d.Value)
              })
              .style("fill", "orange")


          //text label for displaying the name of the line chart
          g.append("text").attr("transform", "translate(" + (width / 2) + "," + (height - 300) + ")").style("text-anchor",
              "middle").text(textlabel);

          //text label for x axis
          g.append("text").attr("transform", "translate(" + (width / 2) + "," + (height + 40) + ")").style("text-anchor",
              "middle").text("Snapshots");

          //text label for y axis
          g.append("text").attr("transform", "rotate(-90)").attr("y", 0 -
              margin).attr("x", 0 - (height / 2)).attr("dy",
              "1em").style("text-anchor", "middle").text("Time");

          //legend
          var legend_keys = func_names;
          var color = ["red", "green", "black", "blue", "orange"];
          var lineLegend = g.selectAll(".lineLegend").data(legend_keys)
              .enter().append("g")
              .attr("class", "lineLegend")
              .attr("transform", function(d, i) {
                  return "translate(" + (width + 100) + "," + (i * 20) + ")";
              });
          lineLegend.append("text").text(function(d) {
                  return d;
              })
              .attr("transform", "translate(-60,9)"); //align texts with boxes
          lineLegend.append("rect").attr("fill", function(d, i) {
                  return color[i];
              })
              .attr("width", 10).attr("height", 10).attr("transform", "translate(-80,0)");


      } /*function closing tag of draw*/


  } /*function closing tag of timeout*/
  setTimeout(timeout, 1000); /*Setting timeout in order to process the results*/

}
/*Function to directly display the line charts if the user has given the path directory*/
function noselecttemp() {

    cleanfunc();
    var func_time = {}
    for (const [key, value] of Object.entries(dataDict)) {
        value.forEach(d => {
            func = d.Call + "(" + d.Site + ")"
            time = parseFloat(d.Time)
            //console.log(typeof(time))
            if (func_time[func]) {
                func_time[func]+=time;
             } else {
                func_time[func] = time;
             }
        });
    }
    
    my_keys = Object.keys(func_time)
    .sort(function order(key1, key2) { 
        if (func_time[key1] < func_time[key2]) return -1; 
        else if (func_time[key1] > func_time[key2]) return +1; 
        else return 0; 
    })
    .reverse() 
    .splice(0, 5)
    console.log(my_keys)

    var filenames = Object.keys(dataDict)
    filenames.sort()
    var top_func_times = {}
    var curr_max = -1
    var arrayLength = filenames.length;
    for (var i = 0; i < arrayLength; i++) {
        data = dataDict[filenames[i]]
        data.forEach(d => {
            func = d.Call + "(" + d.Site + ")"
            if (my_keys.includes(func)) {
                time = parseFloat(d.Time)
                if (time>curr_max)
                    curr_max = time
                if (top_func_times[func]) {
                    top_func_times[func].push(time);
                 } else {
                    top_func_times[func] = [time];
                 }
            }
        });
    }
    console.log(top_func_times)
    dispcalltemp(top_func_times, curr_max)
    /*
    Traverse each file in order. Find the time of everything in my_keys and append.
    Also, separate out point to point and synchronization.
    */
}