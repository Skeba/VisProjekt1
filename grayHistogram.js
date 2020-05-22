function arrayOccurrences(arr) {
    var number = [], occurrences = [], prev;
    
    //arr.sort();
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
    var chartWidth = width - (margin*2); // 256
    var chartHeight = height - (margin*2);
    var barWidth = 1, barPadding = 5;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.height = img.height; // Set canvas
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // Laddar in datan
    var heights = [];
    for(var i = 0; i < data.length; i += 4)
    {
        // Avrundar värderna ifall bilden inte skulle vara svartvit
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3; 
        heights.push(avg);
    }
    console.log("heights");
    console.log(heights);
    var result = arrayOccurrences(heights);
    console.log("result");
    console.log(result);
    var pixels = [], amount = [];
    pixels.push(result[0]);
    amount.push(result[1]);
    console.log("pixels");
    console.log(pixels);
    console.log("amount");
    console.log(amount);


    var antalKlasser = result[1].length;

    var xScale = d3.scaleBand()
    .domain(antalKlasser)
    .range([0,chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(result[1])])
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
    chartGroup.selectAll("staplar").data(result[1]).enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(data, i) { return chartHeight - yScale(data) } )
        .attr("x", function(data, i) { return i * (chartWidth / antalKlasser) } ) //  barWidth + barPadding
        .attr("y", function(data, i) { return yScale(data) } );
    
    // Rita axlar
    chartGroup.append("g").call(yAxis);
    chartGroup.append("g").call(xAxis)
        .attr("transform", "translate(0,"+chartHeight+")");

};