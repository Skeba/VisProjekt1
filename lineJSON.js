function drawChart() 
{

    var width = 500;
    var height = 300;

    d3.json("lineData.json").get(function(error,dataArray)
    {
        console.log(dataArray);

        // Ytterst viktigt för projekt 1
        // Skapa arrays för att lagra x och y värden
        var xs = [];
        var ys = [];
        // Gå igenom dataarrayn och hämta x samt y
        for(i=0; i<dataArray.length; i++)
        {
            xs.push(dataArray[i].x); // Push för att lägga till ett värde till en array
            ys.push(dataArray[i].y);
        }
        console.log(xs);

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

    });
}