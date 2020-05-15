function drawChart()
{
    // Importera data från extern csv
    // d3.csv('lineData.csv').get(function (error,data) {
    //     console.log(data);
    // });

    // d3.v5 erbjuder .then metoden och promises
    d3.csv('lineData.csv').then(function(data) {
        console.log(data);
        // document.write(JSON.stringify(data)); FÖr att skriva ut på skrämen

        // Ladda in datan
        var temps = [], months = [], dataFix = [];
        for(i=0; i<data.length; i++)
        {
            months.push(data[i].Month);
            temps.push(parseFloat(data[i].Temp));
            dataFix.push( {month:months[i], temp:temps[i] } );
        }
        console.log(dataFix);
        console.log(months);
        console.log(temps);

        // Skapa ritunderlag
        var width = 400, height = 200, margin = 20;
        var canvas = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Skapa orinal scale baserat på månaderna
        var xScale = d3.scaleBand()
            .domain(months)
            .range([0,width-margin*2]);

        // vi behöver en skala, för temperatur passar en lineär skala
        var yScale = d3.scaleLinear()
            .domain([d3.min(temps), d3.max(temps)]) // vilka värden ska konveretas till pixelvärden
            .range([height-margin*2,0]);


        // Generera D strängen för path
        var dString = d3.line()
            .x(function(d) { return xScale(d.month) })
            .y(function(d) { return yScale(d.temp) });

        var yAxis = d3.axisLeft(yScale);

        var xAxis = d3.axisBottom(xScale);

        var chartGroup = canvas.append('g').attr("transform","translate("+margin+","+margin+")");

        // Rita linjen
        chartGroup.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('d', dString(dataFix));

        

        // Lägg till punkter till datapunkterna
        chartGroup.selectAll('dots').data(dataFix)
            .enter()
                .append('circle')
                .attr('cx', function(d) { return xScale(d.month) })
                .attr('cy', function(d) { return yScale(d.temp) })
                .attr('r','2');

        chartGroup.append("g").call(yAxis);
        chartGroup.append("g").call(xAxis);
    });

    // d3 ES6 V5 SYNTAx
    // d3.csv('lineData.csv').then((data) => {
    //     console.log(data);

    // });
};