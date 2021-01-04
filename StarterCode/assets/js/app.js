// @TODO: YOUR CODE HERE!
//D3 Dabbler
//create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
//Include state abbreviations in the circles.
//columns: id	state	abbr	poverty	povertyMoe	age	ageMoe	income	incomeMoe	
//healthcare	healthcareLow	healthcareHigh	obesity	obesityLow	obesityHigh	smokes	smokesLow	smokesHigh
//Create and situate your axes and labels to the left and bottom of the chart.
//Note: You'll need to use python -m http.server to run the visualization.

// d3.csv("assets/data/data.csv").then((data) => {
//     console.log(data);
// });

//https://www.d3-graph-gallery.com/graph/scatter_basic.html
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("assets/data/data.csv", function(data) {
// Add X axis
var x = d3.scaleLinear()
.domain([0, 4000])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 500000])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add dots
svg.append('g')
.selectAll("circle")
.data(data)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.poverty); } )
  .attr("cy", function (d) { return y(d.healthcare); } )
  .attr("r", 1.5)
  .style("fill", '#9f0fd8')

})
