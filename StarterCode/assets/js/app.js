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

var chartGroup2 = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(assetData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(assetData, d => d[chosenXAxis]) * 0.8,
      d3.max(assetData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating y-scale var upon click on axis label
function yScale(assetData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(assetData, d => d[chosenYAxis]) * 0.8,
      d3.max(assetData, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;

}
// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderAxes2(newYScale, yAxis) {
  var leftAxis = d3.axisleft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

function renderCircles2(circlesGroup2, newYScale, chosenYAxis) {

  circlesGroup2.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup2;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "poverty") {
    label = "in Poverty %:";
  } else if (chosenXAxis === "age") {
    label = "Age (Median):";
  } else {
    label = "Household Income (median):";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip2(chosenYAxis, circlesGroup2) {

  var label2;

  if (chosenYAxis === "healthcare") {
    label2 = "Lacks Healthcare %:";
  } else if (chosenYAxis === "smokes") {
    label2 = "Smokes %";
  } else {
    label2 = "Obesity %";
  }

  var toolTip2 = d3.tip()
    .attr("class", "tooltip2")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label2} ${d[chosenYAxis]}`);
    });

  circlesGroup2.call(toolTip2);

  circlesGroup2.on("mouseover", function(data) {
    toolTip2.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip2.hide(data);
    });

  return circlesGroup2;
}

//Read the data
d3.csv("assets/data/data.csv").then(function(assetData, err) {
  if (err) throw err;

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

  // xLinearScale function above csv import
  var xLinearScale = xScale(assetData, chosenXAxis);

  // yLinearScale function above csv import
  var yLinearScale = yScale(assetData, chosenYAxis);

  // // Create y scale function
  // var yLinearScale = d3.scaleLinear()
  //   .domain([0, d3.max(assetData, d => d.healthcare)])
  //   .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // append y axis
  var yAxis = chartGroup2.append("g")
  .classed("y-axis", true)
  .call(leftAxis);

  // // append y axis
  // chartGroup.append("g")
  //   .call(leftAxis);

    // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(assetData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[chosenXAxis]))
  .attr("cy", d => yLinearScale(d[chosenYAxis]))
  .attr("r", 20)
  .attr("fill", '#9f0fd8')
  .attr("opacity", ".5");

  // append initial circles
  var circlesGroup2 = chartGroup2.selectAll("circle2")
  .data(assetData)
  .enter()
  .append("circle2")
  .attr("cx", d => xLinearScale(d[chosenXAxis]))
  .attr("cy", d => yLinearScale(d[chosenYAxis]))
  .attr("r", 20)
  .attr("fill", '#9f0fd8')
  .attr("opacity", ".5");

// Create group for three x-axis labels
var labelsGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

var povertyLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty") // value to grab for event listener
.classed("active", true)
.text("in Poverty %:");

var ageLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "age") // value to grab for event listener
.classed("inactive", true)
.text("Age (Median)");

var incomeLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "income") // value to grab for event listener
.classed("inactive", true)
.text("Household Income (median):");

// Create group for three y-axis labels

var labelsGroup2 = chartGroup2.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

var healthcareLabel = labelsGroup2.append("text2")
.attr("x", 0)
.attr("y", 20)
.attr("value2", "healthcare") // value to grab for event listener
.classed("active", true)
.text("Lacks Healthcare %:");

var smokesLabel = labelsGroup2.append("text2")
.attr("x", 0)
.attr("y", 40)
.attr("value2", "smokes") // value to grab for event listener
.classed("inactive", true)
.text("Smokes %");

var obesityLabel = labelsGroup2.append("text2")
.attr("x", 0)
.attr("y", 40)
.attr("value2", "obesity") // value to grab for event listener
.classed("inactive", true)
.text("Obesity %");
//  // append y axis
//  chartGroup.append("text")
//  .attr("transform", "rotate(-90)")
//  .attr("y", 0 - margin.left)
//  .attr("x", 0 - (height / 2))
//  .attr("dy", "1em")
//  .classed("axis-text", true)
//  .text("Lacks Healthcare %");

 // updateToolTip function above csv import
 var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// x axis labels event listener
labelsGroup.selectAll("text")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    // y axis labels event listener
labelsGroup2.selectAll("text2")
.on("click", function() {
  // get value of selection
  var value2 = d3.select(this).attr("value2");
  if (value2 !== chosenYAxis) {

// replaces chosenXAxis with value
    chosenXAxis = value;

// replaces chosenYAxis with value2
    chosenYAxis = value2;

    // console.log(chosenXAxis)
    // console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(assetData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true); 
        }
        else if (chosenXAxis === "age") {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true); 
        }
        else {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", true)
            .classed("inactive", false);
          }
        }
      });

      // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(assetData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderAxes2(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup2 = renderCircles2(circlesGroup2, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup2 = updateToolTip2(chosenYAxis, circlesGroup2);

        // changes classes to change bold text
        if (chosenYAxis === "healthcare") {
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true); 
        }
        else if (chosenYAxis === "smokes") {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", true)
            .classed("inactive", false);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true); 
        }
        else {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", true)
            .classed("inactive", false);
          }
        }
      });

// Add abbreviation text
// svg.append('g')
// .selectAll(null)
//     .data(assetData)
//     .enter()
//     .append("text")
//     .text(d => (d.abbr)) 
//     .attr("x", d => d[chosenXAxis])
//     .attr("y", d => d[chosenYAxis])

// })
}).catch(function(error) {
  console.log(error);
});
