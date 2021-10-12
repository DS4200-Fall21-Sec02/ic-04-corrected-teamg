



let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization 
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white')
  .style('border', 'solid')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))






//https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js
//Adapted for our assignment for most code

//Setting Scale for Bar Chat
let xScale = d3.scaleBand().range([0, width]).padding(0.5),
    yScale = d3.scaleLinear().range([height, 0]);

//Creating Group to store Chart Elements
let group1 = svg1.append("group1")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

//https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
//Loading Data from CSV
let data1
d3.csv("./data/data.csv", function(error, data) {
    data1 = data1.append(data)
});
console.log(data1)

    //Mapping Discrete X Values to X Axis
    xScale.domain(data.map(function(data1) { return data1.x; }));
    //Mapping Y Values from 0 to the max Y value
    yScale.domain([0, d3.max(data, function(data1) { return data1.y; })]);



    //appending x-axis scale to group
    group1.append("group1")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));



