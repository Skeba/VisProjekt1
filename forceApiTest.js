var api_url = 'https://api.covid19api.com/live/country/finland/status/confirmed/date/2020-03-21T13:13:30Z';
    
async function getData() {
    var response = await fetch(api_url);
    var data3 = await response.json();
    console.log(data3);
    console.log(data3[0].Confirmed);
    var { Confirmed, Deaths } = data3[0];
    console.log(Confirmed);
    console.log(Deaths);
}
function drawForce()
{

    d3.json("nodes.json", async function(jsonData) { //nodes.json
        var response = await fetch(api_url);
        var data3 = await response.json();
        console.log(data3);
        console.log(data3[0].Confirmed);
        var { Confirmed, Deaths } = data3[0];
        console.log(Confirmed);
        console.log(Deaths);

        var width = 800, height = 800;

        var canvas = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        // Skapa länkar (lines) - streck mellan noderna
        var link = canvas.append("g").selectAll("links")
            .data(jsonData.links).enter()
            .append("line")
            .attr("stroke", "black");

        // Skapa noder (cirklar) med vänner
        var node = canvas.append("g").selectAll("nodes")
            .data(jsonData.nodes).enter()
            .append("ellipse")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("rx", 40)
            .attr("ry", 20)
            .attr("stroke", "black")
            .attr("fill", "lightgray")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var label = canvas.append("g").selectAll("labels")
            .data(jsonData.nodes).enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 100)
            .attr("y", 100)
            .text(function(data) { return data.name } );

        

        // Definiera en kraft (gravity)
        var simulation = d3.forceSimulation()
            // Länkarna behöver en ny typ av kraft (enligt önskad längd)
            .force("link", d3.forceLink().distance(75).id( function(d) { return d.id } ) )
            // Manybody simulerar gravity (pull) eller electrostatic charge (repulsion)
            .force("charge", d3.forceManyBody().strength(-200) )
            // Centreringskraften skuffar alla noder emot mitten
            .force("center",d3.forceCenter(width/2,height/2) );

        // Vi måste starta vår simulation och köra den on("tick")
        simulation.nodes(jsonData.nodes).on("tick", tickHandler);
        // Simulera även länkarnas krafter
        simulation.force("link").links(jsonData.links);

        function tickHandler() {
            // Vad ska göras varje tick
            node
                .attr("cx", function(data) { return data.x} )
                .attr("cy", function(data) { return data.y} )
            label
                .attr("x", function(data) { return data.x} )
                .attr("y", function(data) { return data.y + 5 } )
            link
                .attr("x1", function(data) { return data.source.x } )
                .attr("x2", function(data) { return data.target.x } )
                .attr("y1", function(data) { return data.source.y } )
                .attr("y2", function(data) { return data.target.y } );
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