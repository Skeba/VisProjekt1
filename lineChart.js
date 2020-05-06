function drawChart() 
{
    var width = 500;
    var height = 300;

    // Skapa vårt ritunderlag
    var canvas = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    // Rita en linje (obs path inte svg line)
    canvas.append("path")
        .attr("fill","none")
        .attr("stroke","blue")
        .attr("d","M30 20 L60 60 L120 28 L180 72 L240 40");
}