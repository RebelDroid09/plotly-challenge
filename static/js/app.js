const dataset;

d3.json("./data/samples.json").then(function(data)
{ 
    dataset = data;

    console.log(data);

    subjectNames = dataset.names;

    var dropdown = d3.select("#selDataset");

    var subjectOptions = dropdown.selectAll('option')
        .data(subjectNames)
        .enter()
        .append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        }); 
});

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

    var dropdownMenu = d3.select("#selDataset");

    var desiredDataset = dropdownMenu.property("value");

    var desiredIndex = dataset.names.indexOf(desiredDataset);

    var sampleSet = dataset.samples[desiredIndex];

    var otuIdSet = sampleSet.otu_ids.slice(0, 11);
    var otuLabelSet = sampleSet.otu_labels.slice(0, 11);
    var sampleValueSet = sampleSet.sample_values.slice(0, 11);

    var trace = [
        {
            x: otuLabelSet,
            y: sampleValueSet,
            type: 'bar'
        }
    ];

    Plotly.newPlot('')
};

