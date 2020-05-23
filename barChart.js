
// Ritar grafen onload
window.onload = reDraw;
// Ritar grafen on resize
window.onresize = reDraw;

function reDraw() {
// Höjden på rektanglarna i barcharten
var dataTable = [30, 50, 70, 80, 40];
var height = window.innerHeight / 2;
var width = window.innerWidth * 0.8;
var barWidth = 50;
var barMargin = 20;

d3.select("svg").remove("staplar");

// Skalnings funktion
var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataTable)])
    .range([0,height]);
// Bandscale är praktiskt då man behöver placera något bredvid varandra med ett visst mellanrum
var xScale = d3.scaleBand()
    .domain(dataTable)
    .range([0,width])
    .padding(0.24);

// Skapa ett ritunderlag
var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "lightgrey");

// Här börjar tidsresan
canvas.selectAll("staplar")
    .data(dataTable) // Fyll virtuella staplar med data från arrayn
    
    // Gå in i varje virtuella stapel
    .enter() // for (i=0; i<data.length; i++)
        .append("rect")
        .attr("height", function(data) {return yScale(data) + barMargin; })
        //bredden av rektanglen = värdet från datatabellen
        .attr("width", function(data) { return xScale.bandwidth(); })
        // första rektangeln x = 100*0, x2 = 100*1 ...
        .attr("x", function(data, i) { return xScale(data); }) // 100, 200, 300
        // Vi måste definiera y startpunkten enligt höjden av stapeln!
        .attr("y", function(data) {return height - yScale(data) + barMargin; });
}
