function drawHistogram2 () 
{
    // Läs in extern JSON data (d3.v5)
    d3.json("basketPlayers.json").then( function(jsonData) {

        var width = 600, height = 300, margin = 30;
        var chartWidth =  width - (margin*2);
        var chartHeight = height - (margin*2);
        var barWidth = 1, barPadding = 5;

        // Spara json i JS arrays
        // Ladda in datan
        var heights = [], names = [];
        for(i=0; i<jsonData.basketplayers.length; i++)
        {
            heights.push(jsonData.basketplayers[i].size);
            names.push( jsonData.basketplayers[i].name  );
        }
        console.log(names);
        console.log(heights);

        // Skapa klasser enligt längder
        var klasser = ["170-179","180-189", "190-199", "200-209"
                    , "210-219", "220-229", "230-239"];
        // Ändra y axeln till frekvenser
        var frekvenser = []; // Spara antalet spelare av en viss längd
        var klassStorlek = 10; // binsize 160-169
        var klass = 180; // håller koll på vilken klass vi är i. Börjar med minsta
        var antalKlasser = klasser.length;

        // Räkna antalet spelare i varje längdklass
        for(i=0; i<antalKlasser; i++)
        {
            var frekvens = 0; // Iterand som räknar hur många som hör till en klass
            for (j=0; j < heights.length; j++)
            {
                if (heights[j] >= klass && heights[j] < klass+klassStorlek)
                {
                    frekvens++;
                }
            }
            klass += klassStorlek;
            frekvenser.push(frekvens);
        }

        var xScale = d3.scaleBand()
            .domain(klasser)
            .range([0,chartWidth]);
        var yScale = d3.scaleLinear()
            .domain([0,d3.max(frekvenser)])
            .range([chartHeight, 0]);
        // Skapa Y och X axel
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Skapa ritunderlag
        var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Skapa en grupp som inte täcker hela ritunderlaget
        var chartGroup = canvas.append("g").attr("transform", "translate("+margin+","+margin+")");

        // Rita in staplar
        chartGroup.selectAll("staplar").data(frekvenser).enter()
            .append("rect")
            .attr("width", barWidth)
            .attr("height", function(data, i) { return chartHeight - yScale(data) } )
            .attr("x", function(data, i) { return i * (chartWidth / antalKlasser) + barWidth/2 } )
            .attr("y", function(data, i) { return yScale(data) } );

        // Rita axlar
        chartGroup.append("g").call(yAxis);
        chartGroup.append("g").call(xAxis)
            .attr("transform", "translate(0,"+chartHeight+")");

    });
};