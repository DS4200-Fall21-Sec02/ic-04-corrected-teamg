let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

//SVG that will hold the visualization
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white')
  .style('border', 'solid')
  .attr('viewBox', [-25 , -20 , width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

//https://chartio.com/resources/tutorials/how-to-show-data-on-mouseover-in-d3js/
let tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("Abc12");

//https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js
//Adapted for our assignment for most code

//Setting Scale for Bar Chart
//We use ScaleBand For x-axis because we are dealing with ordinal X Data and padding sets distance between bars
//ScaleLinear for y-axis because Quantitative Y data
let x = d3.scaleBand().range([0, width]).padding(0.13),
    y = d3.scaleLinear().range([height, 0]);


//https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
//Loading Data from CSV
d3.csv("data/data.csv").then( function (data) {

    //To Confirm the data is being loaded from CSV correctly
    console.log(data)

    //Mapping Discrete X Values to the domain for X Axis
    x.domain(data.map(function(d) { return d.X; }));
    //Mapping Y Values from 0 to the max Y value + 10
    y.domain([0, 100]);

   //https://www.educative.io/blog/d3-js-tutorial-bar-chart

    svg1.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.X); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.Y); })
        .attr("height", function(d) { return height - y(d.Y);})
        .attr("fill", "#f57842")
        //https://chartio.com/resources/tutorials/how-to-show-data-on-mouseover-in-d3js/
        .on("mouseover", function(d){tooltip.text(Math.round((((y(this.y.baseVal.value))/2.40250029564) + 35.5))); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px"); console.log(this)})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


        /*
        .on("mouseout", function(d){
            d3.select(this)
                .attr('fill','#f57842')
                .style("visibility", "hidden");})


         */

    //Append the x-axis to the SVG
    svg1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //Append the y-axis to the SVG
    svg1.append("g")
        .call(d3.axisLeft(y));


});


//console.log((this.height.baseVal.value - 155)/this.y.baseVal.value
