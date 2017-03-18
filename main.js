// custom javascript

var temp;

$(function() {
  console.log('jquery is working!')
  createNodes();
});

function createNodes() {

  // colors = cool : #6cc4c4
  // colors = hot  : #f69a8c

  // main config
  var width = 1280; // chart width
  var height = 440; // chart height
  var interval = 200;
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

  // tooltip config
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>" + d[0] + "</strong><br>";
    });
    svg.call(tip);

  // request the nodes data
  d3.json("/nodesdata", function(error, data) {
temp = data
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
      .style('fill', "#B7B7B7")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
      



     
    }
    



    //var node = svg.selectAll('.node')
      //.data(bubble.nodes(data).filter(function(d) { console.log(d["node-01"]); return d["node-01"].length;  }))
      //.data(data)
      //.enter().append('g')
      //.attr('class', 'node')
      //.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

 // node.append("circle")
  //  .attr("r", function(d) { return d["node-01"].length; })
    //.style('fill', "red" )

    /*.on("mouseover", function(d) {
      tooltip.text(d.name + ": $" + d.price);
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
      return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append('text')
      .attr("dy", ".3em")
      .style('text-anchor', 'middle')
      .text(function(d) { return d.symbol; });*/

  });          // request the temp data
  d3.json("/tempdata", function(error, temp) {
    temp = temp
    var timeDiv = d3.select(".time")
          timeDiv.html(temp[0].TimeStamp)
    console.log(d)
    data.forEach(function(d) {
        var result = temp.filter(function(t) {
            return t.NodeName === d[0];

        });
        console.log(result)
    });

    svg.selectAll("#node")
      .attr("fill", function(d){
        for(var t in temp){
          if(d[0] == t[1]){
            console.log(t[2]);
            return color(t[2]);
          }
        }
      });
      
      //.attr("fill", function(d){ return color(d.Temprature); })
      /*
      counter = 1235106043

      i = 0
      i = setInterval(
          function(){
            chart(temp.filter(function(t){ return t.TimeStamp == counter}).reverse())
            counter+=1
            if (counter > 1235106083) {
              clearInterval(i)
            };
            }, interval
      )
*/
      
  });
  

  

} // main function ends