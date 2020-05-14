function drawChart()
{
    // Importera data från extern csv
    // d3.csv("lineData.csv").get(function (error,data) {
    //     console.log(data);
    // });

    // d3.v5 erbjuder .then metoden och promises
    d3.csv("lineData.csv").then(function(data) {
        document.write(JSON.stringify(data));

        // Ladda in datan
        var temps = [], months = [];
        for(i=0; i<data.length; i++)
        {
            months.push(data[i].Month);
            temps.push(data[i].Temp);
        }
        console.log(months);
        console.log(temps);

        // Skapa ritunderlag
        var width = 800, height = 500;
        var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // vi behöver en skala, för temperatur passar en lineär skala
        var yScale = d3.scaleLinear()
            .domain([d3.min(temps), d3.max(temps)]) // vilka värden ska konveretas till pixelvärden
            .range([0,height]);


        // Generera D strängen för path
        var dString = d3.line()
            .x(function(data) { return data.Month })
            .y(function(data) { return data.Temp });

        // Rita linjen
        canvas.append("path")
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("d", dString(data));
    });

    // d3 ES6 V5 SYNTAx
    // d3.csv("lineData.csv").then((data) => {
    //     console.log(data);

    // });
}