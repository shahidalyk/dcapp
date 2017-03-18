// custom javascript



$(function() {
  console.log('jquery is working!')
  createNodes();
});

function createNodes() {

  // colors = cool : #6cc4c4
  // colors = hot  : #f69a8c

  // main config
  var width = 1280; // chart width
  var height = 420; // chart height
  var interval = 1;
  var format = d3.format(",d");  // convert value to integer
  var color = d3.scale.linear()
    .domain([75, 131])
    .range(["blue", "red"]);  // create range of colors

  var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50]);  // https://github.com/mbostock/d3/wiki/Quantitative-Scales#pow


  // svg config
  var svg = d3.select("#chart").append("svg") // append to DOM
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bubble");

  


    // request the nodes data
  d3.json("/nodesdata", function(error, data) {

    
    

    for (var key in data) {

      var nodes = svg.selectAll('.node')
      .data(data[key])

      nodes.enter()
      .append("rect")
      .attr("rx", "0" )
      .attr("ry", "0" )
      .attr("x", function(d){ return d[1]*3.0; })
      .attr("y", function(d){ return d[2]*1.2; })
      .attr("width", 29)
      .attr("height", 11)
      .attr("class", function(d){ return d[0]; })
      .attr("id", "node")
      .style('fill', "#B7B7B7");

    }
     
  }); //nodesdata ends

  // request the temp data
  d3.json("/tempdata", function(data){ //1235106043
      counter = 1235106043

        i = 0
        i = setInterval(
          function(){
            var timeDiv = d3.select(".time")
              timeDiv.html(counter)
            chart(data.filter(function(d){ return d.TimeStamp == counter}).reverse())
            counter+=1
            if (counter > 1235113265) {
              clearInterval(i)
            };
           }, interval
        )
  });

  var chart = function(data){

    //console.log(data)


    

    var group = svg.selectAll(".group")
      .data(data)

    var groupEnter = group.enter().append("g")
      .attr("class","group")

    var groupUpdate = group.transition().duration(interval).ease("linear")

    var groupExit = d3.transition(group.exit()).remove()

    
    /*groupEnter.append("rect")
      .attr("rx", "0" )
      .attr("ry", "0" )
      .attr("x", function(d){ console.log(d); return d.Temprature;} )
      .attr("y", 50)
      .attr("width", 29)
      .attr("height", 11)
      .attr("class", function(d){ console.log(d); return d.NodeName; })
      .attr("id", "node")
      .style('fill', "#B7B7B7")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
    */
    
    //d3.select(".node-0101").style("fill", "red")
    //debugger
    groupUpdate.select('.node-0101')
      .attr("fill",  "red")

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Node: " + d.NodeName + "</strong><br><strong>Temperature: " + d.Temprature + "</strong>";
    });
    svg.call(tip);
    
    //(var d in data){ d3.selectAll("." + data[d].NodeName).style("fill",color(data[d].Temprature)) }
    for(var d in data){
      if(data[d].NodeName == "node-0101"){
          console.log(data[d].NodeName)
          console.log(data[d].Temprature)
      }

      d3.selectAll("." + data[d].NodeName).data([data[d]])
      .style("fill",color(data[d].Temprature))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide); 
    }

    
  } // function chart ends
  
}