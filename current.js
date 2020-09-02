function currfunc() {
    if (!dataArray.length) {
        openfunc();
    } else {
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
        disp();
    }
}