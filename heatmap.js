var element1h = document.createElement('div'); /*Creating element*/
element1h.innerHTML = '<input type="file" multiple id="in" accept=".tsv" webkitdirectory multipe>';
var fileInput1h = element1h.firstChild;
var fileSelect1h = document.getElementById("heatmap"); /*On clicking Rank View button this code gets executed*/

fileInput1h.addEventListener('change', function(evnt) {
    /*The below codes are used to clear the screen*/
    document.getElementById("pathtext").innerHTML = " ";
    document.getElementById("openbg").innerHTML = " ";
    document.getElementById("currentbg").innerHTML = " ";
    //document.getElementById("refreshbg").innerHTML=" ";
    //document.getElementById("cleanbg").innerHTML=" ";
    //document.getElementById("newbg").innerHTML=" ";
    document.getElementById("aggregatesumbg").innerHTML = " ";
    document.getElementById("aggregatetempbg").innerHTML = " ";
    document.getElementById("heatmapbg").innerHTML = " ";
    document.getElementById("headingbg").innerHTML = " ";

    var fileList = [],
        names = [],
        temp = [],
        s = 0,
        k = 0,
        time = [],
        Snapshots = [],
        Ranks = [];
    for (var i = 0, j = fileInput1h.files.length; i < j; i++) {
        fileList.push(fileInput1h.files[i]); /*Pushing the files along with the data */

    }

    fileList.forEach(function(file, index) {
        names.push((file.name).split('.').slice(0, -1).join('.')); /*Pushing the names of the files without extension*/

    });

    /*sortAplhaNum function is used to sort the alphnumeric strings*/

    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

    function sortAlphaNum(a, b) {
        var aA = a.replace(reA, "");
        var bA = b.replace(reA, "");
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ""), 10);
            var bN = parseInt(b.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }
    names = names.sort(sortAlphaNum);
    console.log(names);
    var filelen = names.length;

    fileList.forEach(function(file, index) {
        d3.tsv("heatmap/" + names[s] + ".tsv", function(error, data) {
            k = 0;
            data.forEach(function(d) {
                temp[k] = parseFloat(d.Time);
                k++;
            });
            time.push(temp[0]); /*Considering the time of first function and pushing it into the time array*/
        });
        s++;
    });

    function timeout() {
        /*Creating the header text*/

        var headingsum = d3.select("#headingbg")
            .style("justify-content", "center")
            .append("svg")
            .attr("width", 540)
            .attr("height", 37)
            .style("text-align", "center")
            .attr("transform", "translate(350,-20)")
            .append("text")
            .attr("transform", "translate(50,30)")
            .style("font-size", "30px")
            .text("Rank view representing time density ");

        console.log(time);

        for (i = 0; i < filelen; i++) {
            var tempr = (names[i]).split('.').pop();
            if (!Ranks.includes(tempr)) {
                Ranks.push(tempr); /*Determining the number of ranks with the help of filename*/
            } else {
                break;
            }
        }
        console.log(Ranks);

        for (i = 0; i < filelen; i = i + Ranks.length) {
            var temps1 = (names[i]).split('.').slice(0, -1).join('.');
            var temps2 = (temps1).split('.').pop();
            Snapshots.push(temps2); /*Determining the number of snapshots with the help of filenames*/
        }
        console.log(Snapshots);

        var j = 1;
        k = 0;
        totalheatval = []; /*Creating an array which contains associative arrays*/

        for (j = 1; j <= Snapshots.length; j++) {
            var heatval = []; /*Represents the associative array*/
            for (i = 0; i < Ranks.length; i++) {
                heatval.push({
                    'Snapshots': j,
                    'Ranks': i + 1,
                    'Time': time[k]
                });
                k++;
            }
            totalheatval.push(heatval);
        }
        console.log(totalheatval);

        drawheatchart(totalheatval, Snapshots, Ranks); /*Calling the function to plot the heatmap*/

        function drawheatchart(totalheatval, Snapshots, Ranks) {
            /*Setting the attributes*/
            var margin = {
                    top: 50,
                    right: 0,
                    bottom: 100,
                    left: 30
                },
                width = 960 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom,
                gridSize = Math.floor(width / 24),
                legendElementWidth = gridSize * 2,
                buckets = 9,
                /*Represents the number of colors to be used*/
                colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]; // alternatively colorbrewer.YlGnBu[9]

            var svg = d3.select("#heatmapbg").append("svg") /*Appending the svg with the heatmapbg*/
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.bottom + "," + margin.top + ")");

            var SnapshotsLabels = svg.selectAll(".SnapshotsLabel") /*Used for printing the Snapshots*/
                .data(Snapshots)
                .enter().append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return i * gridSize;
                })
                .attr("y", height - 105)
                .style("text-anchor", "end")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", "Snapshotslabel");

            var RankLabels = svg.selectAll(".RankLabel") /*Used for printing the ranks*/
                .data(Ranks)
                .enter().append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function(d, i) {
                    return i * gridSize;
                })
                .style("text-anchor", "middle")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                .attr("class", "Rankslabel");

            svg.append("text") /*Used to append the text 'Snapshots' to the svg*/
                .attr("transform", "translate(" + (width / 5) + "," + (height - 70) + ")")
                .style("text-anchor", "middle").text("Snapshots");

            svg.append("text") /*Used to append the text 'Ranks' to the svg and rotate in in order to place it in y-axis*/
                .attr("transform", "rotate(-90)")
                .attr("y", -50)
                .attr("x", -150)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Rank");

            for (i = 0; i < totalheatval.length; i++) {
                data = totalheatval[i];
                data.forEach(function(d) {
                    const colorScale = d3.scaleQuantile()
                        .domain([0, buckets - 1, d3.max(data, (d) => d.Time)])
                        .range(colors);

                    const cards = svg.selectAll(".Ranks")
                        .data(data, (d) => d.Ranks + ':' + d.Snapshots);

                    cards.append("title");

                    cards.enter().append("rect") /*Used for appending rectangles*/
                        .attr("x", (d) => (d.Snapshots - 1) * gridSize)
                        .attr("y", (d) => (d.Ranks - 1) * gridSize)
                        .attr("rx", 4)
                        .attr("ry", 4)
                        .attr("class", "rank bordered")
                        .attr("width", gridSize)
                        .attr("height", gridSize)
                        .style("fill", colors[0])
                        .merge(cards)
                        .transition()
                        .duration(1000)
                        .style("fill", (d) => colorScale(d.Time));

                    cards.select("title").text((d) => d.Time);

                    cards.exit().remove();

                    const legend = svg.selectAll(".legend") /*Used to diaply the values for the colors*/
                        .data([0].concat(colorScale.quantiles()), (d) => d);

                    const legend_g = legend.enter().append("g")
                        .attr("class", "legend");

                    legend_g.append("rect")
                        .attr("x", (d, i) => legendElementWidth * i)
                        .attr("y", height - 60)
                        .attr("width", legendElementWidth)
                        .attr("height", gridSize / 2)
                        .style("fill", (d, i) => colors[i]);

                    legend_g.append("text")
                        .attr("class", "mono")
                        .text((d) => "≥ " + Math.round(d))
                        .attr("x", (d, i) => legendElementWidth * i)
                        .attr("y", height + gridSize - 40);

                    legend.exit().remove();
                });
            }


        } /*function closing tag of drawheatchart*/
    } /*function closing tag of timeout*/
    setTimeout(timeout, 1000); /*Setting timeout in order to process the results*/
}); /*closing tap of the event listener*/

fileSelect1h.addEventListener("click", function() { // wait for click on "select a file" button
    fileInput1h.click();
});
