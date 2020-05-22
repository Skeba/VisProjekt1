function arrayOccurrences(arr) {
    var number = [], occurrences = [], prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            number.push(arr[i]);
            occurrences.push(1);
        } else {
            occurrences[occurrences.length-1]++;
        }
        prev = arr[i];
    }
    
    return [number, occurrences];
};

function histogram(img)
{
    var width = 600, height = 300, margin = 30;
    var chartWidth =  256; // width - (margin*2);
    var chartHeight = height - (margin*2);
    var barWidth = 10, barPadding = 5;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // Laddar in datan
    var heights = [], names = [];
    for(var i = 0; i < data.length; i += 4)
    {
        // Avrundar värderna ifall bilden inte skulle vara svartvit
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3; 
        heights.push(avg);
        names.push(avg);
    }
    console.log(heights);
    console.log(names);
    var result = arrayOccurrences(heights);
    console.log(result);
    var pixels = [], amount = [];
    pixels.push(result[0]);
    amount.push(result[1]);
    console.log(pixels);
    console.log(amount);


    var antalKlasser = heights.length;

    var xScale = d3.scaleBand()
    .domain(antalKlasser)
    .range([0,chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(heights)])
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
    chartGroup.selectAll("staplar").data(antalKlasser).enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(data2, i) { return chartHeight - yScale(data2) } )
        .attr("x", function(data2, i) { return i * (chartWidth / antalKlasser) + barWidth/2 } )
        .attr("y", function(data2, i) { return yScale(data2) } );
    
    // Rita axlar
    chartGroup.append("g").call(yAxis);
    chartGroup.append("g").call(xAxis)
        .attr("transform", "translate(0,"+chartHeight+")");

};