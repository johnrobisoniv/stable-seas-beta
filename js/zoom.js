

var canvas = d3.select('#map-svg');
//var active = d3.select(null);
var dim = {w: canvas.node().getBoundingClientRect().width,
      h: canvas.node().getBoundingClientRect().height};

var g = d3.select('.map-g');

var z = {
  scale : 700,
  translate : [420,420]
};

  // g.transition()
  //     .duration(750)
  //     .style("stroke-width", 1.5 / zoom.scale + "px")
  //     .attr("transform", "translate(" + zoom.translate + ")scale(" + zoom.scale + ")");
