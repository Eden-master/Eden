let node = document.createElement('div');
console.log('math random', Math.random());
let diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

let svg = d3.select(node).append("svg")
                           .attr("width", diameter)
                           .attr("height", diameter)
                           .attr("class", "bubble");

let circle = svg.append("circle")
                  .attr("cx", Math.random() + 1 * 40)
                  .attr("cy", Math.random() + 1 * 40)
                  .attr("r", 20)
                  .style("fill", "white");

module.exports = node;
