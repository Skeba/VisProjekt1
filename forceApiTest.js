var api_url = 'https://api.covid19api.com/live/country/finland/status/confirmed/date/2020-03-21T13:13:30Z';
    
async function getData() {
    var response = await fetch(api_url);
    var apiData = await response.json();
    console.log(apiData);
    console.log(apiData[0].Confirmed);
    var { Confirmed, Deaths } = apiData[0];
    console.log(Confirmed);
    console.log(Deaths);
}
function drawForce()
{
    

    d3.json(api_url, async function(jsonData) { //nodes.json
        var response = await fetch(api_url);
        var apiData = await response.json();
        
        console.log(apiData);
        console.log(apiData[0].Confirmed);
        // var { Confirmed, Deaths } = apiData[0];
        // console.log(Confirmed);
        // console.log(Deaths);
        console.log(jsonData);

        var width = 1000, height = 800;

        var canvas = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        // Skapa länkar (lines) - streck mellan noderna
        var link = canvas.append("g").selectAll("links")
            .data(jsonData).enter()
            .append("line")
            .attr("stroke", "black");

        // Skapa noder (cirklar) med vänner
        var datesNode = canvas.append("g").selectAll("nodes")
            .data(jsonData).enter()
            .append("ellipse")
            .attr("id", function(d, i) { return jsonData[i].Date; })
            .attr("cx", 80)
            .attr("cy", 80)
            .attr("rx", 30)
            .attr("ry", 15)
            .attr("stroke", "black")
            .attr("fill", "lightblue")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var confirmedNode = canvas.append("g").selectAll("nodesConfirmed")
            .data(jsonData).enter()
            .append("ellipse")
            .attr("id", function(d, i) { return jsonData[i].Date; })
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("rx", 20)
            .attr("ry", 10)
            .attr("stroke", "black")
            .attr("fill", "lightgray")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var deathsNode = canvas.append("g").selectAll("nodesDeaths")
            .data(jsonData).enter()
            .append("ellipse")
            .attr("id", function(d, i) { return jsonData[i].Date; })
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("rx", 20)
            .attr("ry", 10)
            .attr("stroke", "black")
            .attr("fill", "#ffcccb")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var date = canvas.append("g").selectAll("dates")
            .data(jsonData).enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 100)
            .attr("y", 100)
            .attr("font-size", 13)
            .text(function(data) { 
                dates = new Date(data.Date);
                var dateString = (dates.getDate() + '.' + (dates.getMonth()+1));
                return dateString } );

        var confirmed = canvas.append("g").selectAll("confirmed")
            .data(jsonData).enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 100)
            .attr("y", 100)
            .attr("font-size", 13)
            .text(function(data) { 
                return data.Confirmed } );

        var deaths = canvas.append("g").selectAll("deaths")
            .data(jsonData).enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 100)
            .attr("y", 100)
            .attr("font-size", 13)
            .text(function(data) { 
                return data.Deaths } );
        console.log(jsonData[0].Date);
        var dataArray = {
            nodes: [
                { name: jsonData[0].Date, id: 1 },
                { name: jsonData[0].Confirmed, id: 2 },
                { name: jsonData[0].Deaths, id: 3 }
            ],
            links: [
                { source: 1, target: 2},
                { source: 1, target: 2}
            ]
        };

        

        // Definiera en kraft (gravity)
        var simulation = d3.forceSimulation()
            // Länkarna behöver en ny typ av kraft (enligt önskad längd)
            .force("link", d3.forceLink().distance(75).id( function(d) { 
                //console.log(d.Date);
                return d[0] } ) )
            // Manybody simulerar gravity (pull) eller electrostatic charge (repulsion)
            .force("charge", d3.forceManyBody().strength(-25) )
            // Centreringskraften skuffar alla noder emot mitten
            .force("center",d3.forceCenter(width/2,height/2) );
        console.log(jsonData[0]);
        // Vi måste starta vår simulation och köra den on("tick")
        simulation.nodes(jsonData).on("tick", tickHandler);
        // Simulera även länkarnas krafter
        simulation.force("link").links(jsonData);

        function tickHandler() {
            // Vad ska göras varje tick
            datesNode
                .attr("cx", function(data) { return data.x} )
                .attr("cy", function(data) { return data.y} )
            date
                .attr("x", function(data) { return data.x} )
                .attr("y", function(data) { return data.y + 5 } )
            confirmedNode
                .attr("cx", function(data) { return data.x * 1.07 } )
                .attr("cy", function(data) { return data.y * 1.07} )
                
            confirmed
                .attr("x", function(data) { return data.x * 1.07} )
                .attr("y", function(data) { return data.y * 1.07 + 5 } )

            deathsNode
                .attr("cx", function(data) { return data.x / 1.07 } )
                .attr("cy", function(data) { return data.y / 1.07} )
                
            deaths
                .attr("x", function(data) { return data.x / 1.07} )
                .attr("y", function(data) { return data.y / 1.07 + 5 } )
            // link
            //     .attr("x1", function(data) { return data.source.x } )
            //     .attr("x2", function(data) { return data.target.x } )
            //     .attr("y1", function(data) { return data.source.y } )
            //     .attr("y2", function(data) { return data.target.y } );
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }
          
        function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        }
        
        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        }

    });
};