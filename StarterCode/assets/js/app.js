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

var margin = {top: 20, right: 40, bottom: 80, left: 100};

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
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}
// function used for updating circles group with a transition to
// new circles
// function used for updating state abbreviation group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

function renderAbbr(stateAbbr, newXScale, chosenXAxis) {
  
  stateAbbr.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));

  return stateAbbr;
}
function renderCircles2(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

function renderAbbr2(stateAbbr, newYScale, chosenYAxis) {

  stateAbbr.transition()
    .duration(1000)
    .attr("y", d => newYScale(d[chosenYAxis]));

  return stateAbbr;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup, stateAbbr) {

  var label;
  var label2 = chosenYAxis;

  if (chosenXAxis === "poverty") {
    xlabel = "in Poverty %:";
  }
  else if (chosenXAxis === "age") {
    xlabel = "Age (Median):";
  }
  else {
    xlabel = "Household Income (Median):"; 
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([50, -80])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}<br>${label2} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);
  stateAbbr.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  stateAbbr.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

  return circlesGroup;
}
// function used for updating circles group with new tooltip
function updateToolTip2(chosenYAxis, circlesGroup, stateAbbr) {

  var label;
  var label2 = chosenXAxis;

  if (chosenYAxis === "healthcare") {
    label2 = "Lacks Healthcare %";
  }
  else if (chosenYAxis === "obesity") {
    label2 = "Obesity %";
  }
  else {
      label2 = "Smokes %";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([50, -80])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}<br>${label2} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);
  stateAbbr.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    stateAbbr.on("mouseover", function(data) {
      toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
       toolTip.hide(data);
    });

  return circlesGroup;
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

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(0, 0)`)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(assetData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 12)
    .attr("fill", '#9f0fd8')
    .attr("opacity", ".5");

  var stateAbbr = chartGroup.selectAll("mytext")
    .data(assetData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]-.2))
    .text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", 'white')
    .attr('text-anchor', 'middle');

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
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (median):");

// Create group for three y-axis labels

  var labelsGroup2 = chartGroup.append("g")
    .attr("transform", `translate(0, ${height / 2})`);

  var healthcareLabel = labelsGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", 0)
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Healthcare %:");

  var smokesLabel = labelsGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", 0)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes %");

  var obesityLabel = labelsGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", -80)
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .text("Obesity %");

  // updateToolTip function above csv import (xAxis)
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup, stateAbbr);

  // updateToolTip function above csv import (yAxis)
  var circlesGroup = updateToolTip2(chosenYAxis, circlesGroup, stateAbbr);

// x axis labels event listener
  labelsGroup.selectAll("text")
  .on("click", function() {
// get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {
// replaces chosenXAxis with value
      chosenXAxis = value;
      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(assetData, chosenXAxis);

      // updates x axis with transition
      xAxis = renderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

      stateAbbr = renderAbbr(stateAbbr, xLinearScale, chosenXAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, circlesGroup, stateAbbr);

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
// y axis labels event listener
  labelsGroup2.selectAll("text")
  .on("click", function() {
  // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

    // replaces chosenYAxis with value
      chosenYAxis = value;

    //console.log(chosenYAxis);
    //console.log(chosenXAxis);

    // functions here found above csv import
    // updates y scale for new data
      yLinearScale = yScale(assetData, chosenYAxis);

    // updates y axis with transition
      yAxis = renderAxes2(yLinearScale, yAxis);

    // updates circles with new y values
      circlesGroup = renderCircles2(circlesGroup, yLinearScale, chosenYAxis);

      stateAbbr = renderAbbr2(stateAbbr, yLinearScale, chosenYAxis);

    // updates tooltips with new info
      circlesGroup = updateToolTip2(chosenYAxis, circlesGroup, stateAbbr);

    // changes classes to change bold text
      if (chosenYAxis === "obesity") {
        obesityLabel
          .classed("active", true)
          .classed("inactive", false);
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenYAxis === "healthcare"){
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        healthcareLabel
          .classed("active", true)
          .classed("inactive", false);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
      obesityLabel
        .classed("active", false)
        .classed("inactive", true);
      healthcareLabel
        .classed("active", false)
        .classed("inactive", true);
      smokesLabel
        .classed("active", true)
        .classed("inactive", false);
      }
    }
  });
}).catch(function(error) {
  console.log(error);
});
