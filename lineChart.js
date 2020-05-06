function drawChart() 
{
    // en array medd våra x och y kordinater för cassiopeia
    var dataArray = [ {x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10} ];

    var width = 500;
    var height = 300;

    // Skapa vårt ritunderlag
    var canvas = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    // d3.linje() är en Generator som generar en sträng för d=" m x y ..."
    var path = d3.line()
        .x(function(data) { return data.x*6 } )
        .y(function(data) { return data.y*6 } )
        .curve(d3.curveCardinal);
    // Rita en linje (obs path inte svg line) "M30 20 L60 60 L120 28 L180 72 L240 40"
    canvas.append("path")
        .attr("fill","none")
        .attr("stroke","blue")
        .attr("d", path(dataArray));
}