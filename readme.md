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

## D3.js Code:

```Javascript

  var width = 960,
      height = 700,
      radius = (Math.min(width, height) / 2) - 10;

  var interval = 100;

  var formatNumber = d3.format(",d");

  var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
      .range([0, radius]);

  var basecolor = d3.scale.category20c();

  var color = d3.scale.linear()
      .domain([85, 115])
      .range(["#358EFF", "#FB271A"]);  // create range of colors

  var partition = d3.layout.partition()
      .value(function(d) { return 1; });

  var arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var svg = d3.select("#chart2").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "" + d.name + "
";
        });
        svg.call(tip);

  d3.json("static/nodesdata.json", function(error, root) {
    if (error) throw error;

    svg.selectAll("path")
        .data(partition.nodes(root))
      .enter().append("path")
        .attr("d", arc)
        .attr("class", function(d) { return d.name; })
        .style("fill", function(d) { return d.value > 33 ? '#D9D9D9' : color((d.children ? averageTemp(d) : d.temp)); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on("click", click);

  }); // layout ends

  // jobs data start
  d3.json("http://localhost:5000/jobsdata", function(error, data) {
    if (error) throw error;

    counter = 1235144362

          i = 0
          i = setInterval(
            function(){

              var myDate = new Date(counter*1000);
              var timeDiv = d3.select(".time")
                timeDiv.html(myDate.toGMTString())

              chart(data.filter(function(d){ return d.Job_Start_Time == counter}).reverse())
              updateTemp()
              counter+=1
              if (counter > 1235145927) {
                clearInterval(i)
              };
             }, interval
          )

  }); // jobs data end


var chart = function(data){

    //groupUpdate.select('.node-0101')
    //  .attr("fill",  "red")

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-20, 0])
    .html(function(d) {
      //debugger
      return "Node: " + d.NodeName + "
          Job: " + d.JobId + "
          Temperature: " + d.Job_Temprature + "
          Start Time: " + convertDate(d.Job_Start_Time) + "
          CPU Time: " + d.Job_Cpu_Time + "
          CPU Used: " + d.Job_Cpu_Used + "";
    });
    svg.call(tip);
    
    //(var d in data){ d3.selectAll("." + data[d].NodeName).style("fill",color(data[d].Temprature)) }

    for(var d in data){
      //debugger
      //if(data[d].NodeName == "node-0101"){
      //    console.log(data[d].NodeName)
      //    console.log(data[d].Temprature)
      //}

      var source = d3.select("." + data[d].NodeName)[0][0].__data__
      source.temp = data[d].Job_Temprature

      for (var key in source) {
          data[d][key] = source[key];
      }

      //console.log(data[d].NodeName)
      //console.log(data[d].Job_Temprature)

      d3.select("." + data[d].NodeName).data([data[d]])
      .style("fill", function(d){ return color(d.Job_Temprature) })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide); 
      

    }

    

  } // chart ends

function updateTemp(){

  var nodes = ["01", "02", "03", "04", "05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33"]
  for(var key in nodes){
    //console.log(".node-" + nodes[key])

    d3.select(".node-" + nodes[key])
      .style("fill", function(d){ t = averageTemp(d); /*console.log(x);*/ return color(t); })
  }

}

function averageTemp(d) {
  if (d.value > 33)
    return 75

  total = 0
  i = 0
  for(var key in d.children){
    i = i + 1 
    total = total + d.children[key].temp
  }

  return total/i
  //debugger
  
}

function convertDate(counter) {
  var myDate = new Date(counter*1000);
  return myDate.toGMTString()
}

function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");

```

## Behind the scenes:

<img src="https://github.com/shahidalyk/dcapp/blob/master/static/1.jpg" />

Check out more projects: [http://shahidalyk.com/#portfolio](http://shahidalyk.com/#portfolio)
