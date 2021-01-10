// @TODO: YOUR CODE HERE!
//D3 Dabbler
//create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
//Include state abbreviations in the circles.
//columns: id	state	abbr	poverty	povertyMoe	age	ageMoe	income	incomeMoe	
//healthcare	healthcareLow	healthcareHigh	obesity	obesityLow	obesityHigh	smokes	smokesLow	smokesHigh
//Create and situate your axes and labels to the left and bottom of the chart.
//Note: You'll need to use python -m http.server to run the visualization.

//https://www.d3-graph-gallery.com/graph/scatter_basic.html
// set the dimensions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = {top: 20, right: 40, bottom: 60, left: 50};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params




// function used for updating x-scale var upon click on axis label

//Read the data
d3.csv("assets/data/data.csv").then(function(assetData) {
//     console.log(assetData);

// });

// parse data
  assetData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.income = +data.income;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

// Add X axis
var x = d3.scaleLinear()
.domain([0, 25])
.range([ 0, width ]);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 25])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add dots
svg.append('g')
.selectAll("circle")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
.data(assetData)
.enter()
.append("circle")
  .attr("cx", data => (data.poverty))
  .attr("cy", data => (data.healthcare))
  .attr("r", 12)
  .style("fill", '#9f0fd8')

// Add abbreviation text
svg.append('g')
.selectAll(null)
    .data(assetData)
    .enter()
    .append("text")
    .text(data => (data.abbr)) 
    .attr("x", data => (data.poverty))
    .attr("y", data => (data.healthcare))

})
