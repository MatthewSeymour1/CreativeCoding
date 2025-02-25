let data;
let newData;
let cleanedData = [];
let newCleanedData = [];
let barCharts = [];
let font;

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
    newData = loadTable("data/newData.csv", "csv", "header");
    font = loadFont('/fonts/Poppins/Poppins-Black.ttf');
}

function setup() {
    textFont(font);
    createCanvas(8000, 6000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    newCleanData();

    // Master Vertical Bar Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "BarChart",
        xValue: "YEAR",
        yValues: ["Dublin"],
        direction: "vertical",
        numOfLines: 11,
        chartHeight: 200,
        chartWidth: 400,
        chartPosX: 200,
        chartPosY: 250,
        yTitleGap: 40,
    }));
    // Master Horizontal Bar Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "BarChart",
        xValue: "YEAR",
        yValues: ["Dublin"],
        direction: "horizontal",
        numOfLines: 11,
        chartHeight: 400,
        chartWidth: 200,
        chartPosX: 800,
        chartPosY: 500,
        wordGap: 35,
    }));
    // Master Vertical Stacked Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "StackedChart",
        xValue: "YEAR",
        yValues: ["Dublin", "Cork", "Galway"],
        direction: "vertical",
        relativeOrAbsolute: "absolute",
        numOfLines: 8,
        chartHeight: 150,
        chartWidth: 450,
        chartPosX: 100,
        chartPosY: 550,
        barWidth: 30,
        yTitleGap: 40,
    }));
    // Master Horizontal Stacked Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "StackedChart",
        xValue: "YEAR",
        yValues: ["Dublin", "Cork", "Galway", "Limerick"],
        direction: "horizontal",
        relativeOrAbsolute: "absolute",
        numOfLines: 7,
        chartHeight: 450,
        chartWidth: 250,
        chartPosX: 1400,
        chartPosY: 1150,
        wordGap: 35,
        barWidth: 30,
    }));
    // Master Vertical 100% Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "StackedChart",
        xValue: "YEAR",
        yValues: ["Dublin", "Cork", "Galway"],
        direction: "vertical",
        relativeOrAbsolute: "relative",
        numOfLines: 7,
        chartHeight: 150,
        chartWidth: 450,
        chartPosX: 100,
        chartPosY: 850,
        title: "Look at this graph!",
        barWidth: 30,
    }));
    // Master Horizontal 100% Chart
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "StackedChart",
        xValue: "YEAR",
        yValues: ["Dublin", "Cork", "Galway", "Limerick"],
        direction: "horizontal",
        relativeOrAbsolute: "relative",
        numOfLines: 7,
        chartHeight: 450,
        chartWidth: 250,
        chartPosX: 900,
        chartPosY: 1150,
        wordGap: 40,
        barWidth: 30,
    }));
    // Master Radial Histogram
    barCharts.push(new MasterChart({
        data: newCleanedData,
        chartType: "RadialHistogram",
        xValue: "YEAR",
        yValues: ["Dublin"],
        chartPosX: 1400,
        chartPosY: 400,
        chartDiameter: 250,
        wordGap: 40,
        gap: 1,
        numOfGridLines: 5,
        titleGap: 30,
    }));
}

function draw() {
    // background(20, 230, 230);
    background(192);
    barCharts.forEach(chart => chart.renderBarChart());
}

function cleanData() {
    for (i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}

function newCleanData() {
    for (i = 0; i < newData.rows.length; i++) {
        newCleanedData.push(newData.rows[i].obj);
    }

    for (i = 0; i < newCleanedData.length; i++) {
        newCleanedData[i].Dublin = parseInt(newCleanedData[i].Dublin);
        newCleanedData[i].Cork = parseInt(newCleanedData[i].Cork);
        newCleanedData[i].Galway = parseInt(newCleanedData[i].Galway);
        newCleanedData[i].Limerick = parseInt(newCleanedData[i].Limerick);
        newCleanedData[i].Waterford = parseInt(newCleanedData[i].Waterford);
        newCleanedData[i].Other_Areas = parseInt(newCleanedData[i].Other_Areas);
    }
}