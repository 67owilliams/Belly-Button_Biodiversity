//Initialize function at opening of webpage
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  //d3.select("#selDataset").append("option").text("SHAZAM").property("value", "SHAZAM");
  // Use the list of sample names to populate the select options
  //Read samples.json
  d3.json("samples.json").then((data) => {
    //Assign data.names array to variable sampleNames
    var sampleNames = data.names;
    //console.log(sampleNames);
    
    //for each individual sampleName store it in sample parameter
    sampleNames.forEach((sample) => {
      //reference to drop down tag
      selector
        .append("option")
        //append text from for each loop to dropdown
        .text(sample)
        //Assign value to text
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    //Call buildCharts on first Sample
    buildCharts(firstSample);
    //Call buildMetadata on first Sample
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    //console.log(data);
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    //console.log(samplesArray);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filterArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    //console.log(filterArray);
    //  5. Create a variable that holds the first sample in the array.
    var sampleFirst = filterArray[0];
    console.log(sampleFirst);
    //console.log(sampleFirst);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sampleFirst.otu_ids;
    console.log(otu_ids);
    var otu_labels = sampleFirst.otu_labels;
    console.log(otu_labels);
    var sampleValues = sampleFirst.sample_values;
    console.log(sampleValues);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_labels.map(value =>
      value).sort((a,b) => b - a).slice(0, 10);
    //var yticks = otu_labels.slice(0, 10);
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var trace = {
        x: sampleValues,
        y: yticks,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    };
    
    var data = [trace]

    // 9. Create the layout for the bar chart. 
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: otu_ids},
      yaxis: {title: sampleValues},
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, layout);
  });
}