var  dataset;

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

    updatePlotly();
});

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

    var dropdownMenu = d3.select("#selDataset");

    var desiredDataset = dropdownMenu.property("value");

    var desiredIndex = dataset.names.indexOf(desiredDataset);

    var sampleSet = dataset.samples[desiredIndex];

    updateMetadata(desiredIndex);

    updateBubbleChart(desiredIndex);

    var otuIdSet = sampleSet.otu_ids.slice(0, 11);
    var otuLabelSet = sampleSet.otu_labels.slice(0, 11);
    var sampleValueSet = sampleSet.sample_values.slice(0, 11);

    console.log(otuIdSet);
    console.log(otuLabelSet);
    console.log(sampleValueSet);

    for(i = 0; i < otuIdSet.length; i++)
    {
        var id = otuIdSet[i];
        var text = "OTU " + id;
        otuIdSet[i] = text; 
    }

    var trace = [
        {
            x: sampleValueSet,
            y: otuIdSet,
            type: 'bar',
            text: otuLabelSet,
            orientation: 'h'
        }
    ];

    Plotly.newPlot('bar', trace);
};

function updateMetadata(index)
{
    console.log(index);

    var subjectMetadata = dataset.metadata[index];

    var id = "id: " + subjectMetadata.id;
    var ethnicity = "ethnicity: " + subjectMetadata.ethnicity;
    var gender = "gender: " + subjectMetadata.gender;
    var age = "age: " + subjectMetadata.age;
    var location = "location: " + subjectMetadata.location;
    var bbtype = "bbtype: " + subjectMetadata.bbtype;
    var wfreq = "wfreq: " + subjectMetadata.wfreq;

    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");

    metadataPanel.append("p").text(id);
    metadataPanel.append("p").text(ethnicity);
    metadataPanel.append("p").text(gender);
    metadataPanel.append("p").text(age);
    metadataPanel.append("p").text(location);
    metadataPanel.append("p").text(bbtype);
    metadataPanel.append("p").text(wfreq);
};

function updateBubbleChart(index) {
    var bubbleSet = dataset.samples[index];

    var otuIdSet = bubbleSet.otu_ids;
    var otuLabelSet = bubbleSet.otu_labels;
    var sampleValueSet = bubbleSet.sample_values;

    var bubbleTrace = {
        x: otuIdSet,
        y: sampleValueSet,
        text: otuLabelSet,
        mode: 'markers',
        marker: {
            size: sampleValueSet,
            color: otuIdSet
        }
    };

    var data = [bubbleTrace];

    var layout = {
        title: 'OTU ID',
      };

    Plotly.newPlot('bubble', data, layout);

    console.log("End of bubble chart code");
};



