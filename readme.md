# Data Center Hotspots Visualization

Check out more projects: [http://shahidalyk.com/#portfolio](http://shahidalyk.com/#portfolio)

Data analysis (Python) and Visualization (D3.js) of Data Center dataset to predict hotspots and tempareture of servers and pods.
I created two visualizations on this data.

## Data:

The data is based on real data center in one month operational time. There is a separate servers data. And then there is jobs data that run on these servers with many to many relationship between jobs and servers in case of job failure and reallocation.
The jobs can be any computational task with different attributes like running time, waiting time and increase in server tempareture etc. 

## Visualizations:

The first visualization is simply a plot of server nodes color-coded with their temperature. The server nodes display current job statistics on mouse hover.

The second visualization is based on Zoomable Sunburst Layout of the javascript library D3.js. The outer most level is data center. Level 1 is server pods with color-coded temperatures. Level 2 is jobs running on all the servers of a specific server pod.

## Description:

The visualization animation/simulation starts with plotting of server nodes with color-coded temperature and statistics. Time is displayed below the visualization as the simulation is based on real world data. When the time equals the starting time of a job, the simulation reads the jobs data, picks that particular job and finds its server using the servers data. The job is allocated to that server and change in temperature is noted. 
In this way, all the running jobs' statistics are recorded for the prediction of temperature. In the end, there is a Html Range element that can be used to select number of hours in the future for temperature of a server node. 
See the part of D3.js code below. 


## Behind the scenes:

<img src="https://github.com/shahidalyk/dcapp/blob/master/static/1.jpg" />

Check out more projects: [http://shahidalyk.com/#portfolio](http://shahidalyk.com/#portfolio)
