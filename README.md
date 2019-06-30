

The aim of the project is to analyse the performance of programs through parallel computing with the help of D3.

The languages used to visualize the data are mainly HTML and JAVASCRIPT.

We have implemented client-server model to some of the functions and the server is built with the help of node js.The data which is entered in the website is transferred to the server with the help of websockets. 

In the homepage we have a text box where the user is supposed to enter the directory.If the user enters the directory and clicks any of the functions below(Except OPEN) ,then the data is retrieved with the help of directory which is entered by the user from the server and the corresponding function is executed without having the need to select the folder from the dialog box once again.

The functions which currently work on the system are 

->OPEN:-When we click on this button a dialog box appears where the user is allowed to select multiple files and display it in bar chart.

->CURRENT:-This button displays the pie chart for the last 6 files in the directory. 

->ANALYSIS:-This consists of two sub buttons:-

    1.Temporal:-This button is used to display the line charts of top 5 time consuming Point-to-Point Communication functions and                     
                Synchronization functions.
               
    2.Aggregate(Sum):-This button is used to display the bar charts of top 5 time consuing functions.           

The pre-requisites are as follows:

->Latest version of python compiler to be installed.

->Since we are using the functions of d3 we have to mention it in our html file using "<script src="https://d3js.org/d3.v5.js"></script>"

->The following steps are to be followed to install node server :-

    1.sudo apt-get install npm
    2.sudo apt-get install curl python-software-properties
    3.curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    4.sudo apt-get install -y nodejs
    Sample Path:-/work/students/Deepcharran/D3-visualization/Data/
