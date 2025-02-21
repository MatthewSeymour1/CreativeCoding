let data;
let cleanedData = [];
let barCharts = [];
let font;

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
    font = loadFont('/fonts/Poppins/Poppins-Black.ttf');
}

function setup() {
    textFont(font);
    createCanvas(8000, 6000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    //Vertical Bar Chart
    barCharts.push(new BarChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValue: "Female",
        direction: "vertical",
        numOfLines: 11,
        chartHeight: 200,
        chartWidth: 200,
        chartPosX: 100,
        chartPosY: 250,
    }));
    //Horizontal Bar Chart
    barCharts.push(new BarChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValue: "Female",
        direction: "horizontal",
        numOfLines: 11,
        chartHeight: 200,
        chartWidth: 200,
        chartPosX: 500,
        chartPosY: 250,
        wordGap: 35,
    }));
    //Vertical Stacked Chart
    barCharts.push(new StackedChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValues: ["Male", "Female", "Total"],
        direction: "vertical",
        relativeOrAbsolute: "absolute",
        numOfLines: 8,
        chartHeight: 150,
        chartWidth: 450,
        chartPosX: 100,
        chartPosY: 550
    }));
    //Horizontal Stacked Chart
    barCharts.push(new StackedChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValues: ["Male", "Female", "Total"],
        direction: "horizontal",
        relativeOrAbsolute: "absolute",
        numOfLines: 7,
        chartHeight: 450,
        chartWidth: 250,
        chartPosX: 900,
        chartPosY: 550,
        wordGap: 35,
    }));
    //Vertical 100% Chart
    barCharts.push(new StackedChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValues: ["Male", "Female", "Total"],
        direction: "vertical",
        relativeOrAbsolute: "relative",
        numOfLines: 7,
        chartHeight: 150,
        chartWidth: 450,
        chartPosX: 100,
        chartPosY: 850,
        title: "Look at this graph!",
    }));
    //Horizontal 100% Chart
    barCharts.push(new StackedChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValues: ["Male", "Female", "Total"],
        direction: "horizontal",
        relativeOrAbsolute: "relative",
        numOfLines: 7,
        chartHeight: 450,
        chartWidth: 250,
        chartPosX: 900,
        chartPosY: 1150,
        wordGap: 40,
    }));
    //Radial Histogram
    barCharts.push(new RadialHistogram({
        data: cleanedData,
        xValue: "Age_Group",
        yValue: "Male",
        chartPosX: 500,
        chartPosY: 1500,
        gap: 1,
    }));

    // barCharts.push(new StackedChart(cleanedData, "Age_Group", "Male", "Female", "horizontal", "relative", 4, 400, 450, 30, 15, 50, 2, 1000, 1000));
    console.log(barCharts);
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
