// Denna funktion tar en array och ger tillbaka två. RÄknar hur många gånger något occur i en array
function arrayOccurrences(array) {
    var number = [], occurrences = [], prev;
    // Vi vill behålla vår array, så vi använder slice istället för push
    var arr = array.slice();
    // Denna functions klarar av att sortera Integers
    arr.sort(function(a, b){return a - b});
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
    var width = 600, height = 300, margin = 40;
    var chartWidth = 255; //width - (margin*2);
    var chartHeight = height - (margin*2);
    var barWidth = 1, barPadding = 1;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.height = img.height; // Set canvas
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    var bin = ["15", "45",  "75", "105", "135"
                , "165",  "195", "225"];
    

    // Laddar in datan
    var pixelData = [];
    for(var i = 0; i < data.length; i += 4)
    {
        // Avrundar värderna ifall bilden inte skulle vara svartvit
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3; 
        pixelData.push(avg);
    }

    var result = arrayOccurrences(pixelData);
    var pixels = [], amount = [];
    pixels.push(result[0]);
    amount.push(result[1]);

    var antalKlasser = result[1].length;

    // Ändra y axeln till frekvenser
    var frekvenser = []; // Spara antalet spelare av en viss längd
    var klassStorlek = 15; // binsize 160-169
    var klass = 0; // håller koll på vilken klass vi är i. Börjar med minsta
    var binsize = bin.length;

    // Räkna antalet spelare i varje längdklass
    for(i=0; i<binsize; i++)
    {
        var frekvens = 0; // Iterand som räknar hur många som hör till en klass
        for (j=0; j < pixels.length; j++)
        {
            if (pixels[j] >= klass && pixels[j] < klass+klassStorlek)
            {
                frekvens++;
            }
        }
        klass += klassStorlek;
        frekvenser.push(frekvens);
    }


    var xScale = d3.scaleBand()
    .domain(bin)
    .range([0,chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(amount[0])])
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
    chartGroup.append("g").call(yAxis).style("color", "grey");
    chartGroup.append("g").call(xAxis)
        .attr("transform", "translate(0,"+chartHeight+")").style("color", "grey");

};