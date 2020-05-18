function drawBoxplot()
{
    // Läs in extern JSON data (d3.v5)
    d3.json("boxplot.json").then( function(jsonData) {

        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);

        // Spara json i JS arrays
        // Ladda in datan
        var temps = [];
        for(i=0; i<jsonData.temperatures.length; i++)
        {
            temps.push( jsonData.temperatures[i].temp  );
        }
        console.log(temps);

        // Vad behöver
        var min = d3.min(temps);
        var max = d3.min(temps);
        var median = temps[ Math.floor(temps.length * 0.5)];
        var lq = temps [ Math.floor(temps.length * 0.25)];
        var uq = temps [ Math.floor(temps.length * 0.75)];

        console.log("min " + min);
        console.log("max " + max);
        console.log(temps.length);
        console.log("median " + median);
        console.log("lq " + lq);
        console.log("uq " + uq);

        // Skapa en xSkala och en xAxel
        var xScale = d3.scaleLinear().domain([min-5,max+5]).range([0,chartWidth]);
        var xAxis = d3.axisBottom(xScale);

        // Skapa ritunderlag
        var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Skapa en grupp som inte täcker hela ritunderlaget
        var chartGroup = canvas.append("g").attr("transform", "translate(0,0)");

        chartGroup.append("rect")
            .attr("width", function(data) { return xScale(uq) - xScale(lq) } )
            .attr("height", 50)
            .attr("x", xScale(lq) )
            .attr("y", 0);

        // Rita ut axeln
        chartGroup.append("g").call(xAxis);
    });

};