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
    });

    // d3 ES6 V5 SYNTAx
    // d3.csv("lineData.csv").then((data) => {
    //     console.log(data);

    // });
}