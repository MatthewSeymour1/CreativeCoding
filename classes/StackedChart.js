//Error: When I make a relative stacked bar chart, it changes all future bar charts to be relative even if they are set to absolute.


class StackedChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.direction = obj.direction || "vertical";
        this.relativeOrAbsolute = obj.relativeOrAbsolute || "absolute";
        this.numOfLines = obj.numOfLines || 5;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 30;
        this.margin = obj.margin || 15;
        this.rotationAngle = obj.rotationAngle || 50;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 400;
        this.wordGap = obj.wordGap || 25;
        this.lineLength = obj.lineLength || 20;

        this.gap;
        this.scaler;

        this.axisColour = color(0, 0, 0);
        this.barColour1 = color(74, 103, 199);
        this.barColour2 = color(247, 117, 10);
        this.barColour3 = color(255, 0, 0);
        this.barColours = [color(74, 103, 199), color(247, 117, 10), color(random(255), random(255), random(255))];
        this.axisTextColour = color(0, 0, 0);
    }

    //Psudo Code
    //For a vertical stacked graph:
    //For arrayA
    //arrayA has 2 categories, Male and Female
    //The heigh of the graph should equal the max(Male+Female)


    /*
    get each value in this.yValues
    add them up for each xValue (so that'd be in the map)
    find the max of those
    */

    renderBarChart() {
        if (this.relativeOrAbsolute == "absolute") {
            if (this.direction == "vertical") {
                this.gap = (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
                let maxTotal = max(this.data.map((row) => {
                    let sum = 0;
                    for (let i = 0; i < this.yValues.length; i++) {
                        sum += row[this.yValues[i]];
                    }
                    return sum;
                }));
                this.scaler = this.chartHeight / maxTotal;
                console.log(maxTotal);
                push();
                    translate(this.chartPosX, this.chartPosY);
                    noFill();
                    stroke(this.axisColour);
                    strokeWeight(this.axisThickness);
                    // y axis
                    line(0, 0, 0, -(this.numOfLines * ceil(this.chartHeight/this.numOfLines)));
                    push();
                        fill(this.axisTextColour);
                        textAlign(RIGHT, CENTER);
                        textStyle(BOLD);
                        textSize(13);
                        for (let i = 0; i < this.numOfLines; i++) {
                            stroke(this.axisColour);
                            let distance = ceil(this.chartHeight/this.numOfLines);
                            let textVar = ceil(maxTotal / this.numOfLines);
                            translate(0, -distance);
                            line(0, 0, -this.lineLength, 0);
                            noStroke();
                            text(textVar * (i + 1), -this.wordGap, 0);
                        }
                    pop();

                    // x axis
                    line(-this.lineLength, 0, this.chartWidth, 0);
                    fill(this.axisTextColour);
                    textAlign(RIGHT, CENTER);
                    textStyle(BOLD);
                    textSize(13);
                    noStroke();
                    text("0", -this.wordGap, 0);
                    push();
                        translate(this.margin, 0);
                        for (i = 0; i < this.data.length; i++) {
                            let xPos = (this.barWidth + this.gap) * i;
                            noStroke();
                            push()
                                translate(xPos, 0);
                                for (let j = 0; j < this.yValues.length; j++) {
                                    if (j < 2) {
                                        fill(this.barColours[j]);
                                    }
                                    else {
                                        fill(this.barColours[2]); //barColours[2] is a random colour.
                                    }
                                    rect(0, 0, this.barWidth, -(this.data[i][this.yValues[j]] * this.scaler));
                                    translate(0, -(this.data[i][this.yValues[j]] * this.scaler));
                                }
                            pop();
                            fill(this.axisTextColour);
                            textAlign(LEFT);
                            textStyle(BOLD);
                            textSize(13);
                            push();
                                translate(xPos + this.barWidth / 2, 15);
                                rotate(this.rotationAngle);
                                text(this.data[i][this.xValue], 0, 0);
                            pop();
                        }
                    pop();
                pop();
            }
            else if (this.direction == "horizontal") {
                this.gap = (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
                this.scaler = this.chartWidth / max(this.data.map(row => row[this.yValue1] + row[this.yValue2]));
                push();
                    translate(this.chartPosX, this.chartPosY);
                    noFill();
                    stroke(this.axisColour);
                    strokeWeight(this.axisThickness);
                    // y axis
                    line(0, this.lineLength, 0, -this.chartHeight);
                    fill(this.axisTextColour);
                    textAlign(CENTER);
                    textStyle(BOLD);
                    textSize(13);
                    push();
                        noStroke();
                        translate(0, this.wordGap);
                        rotate(this.rotationAngle);
                        text("0", 0, 0);
                    pop();
                    // x axis
                    line(0, 0, (this.numOfLines * ceil(this.chartWidth/this.numOfLines)), 0);
                    push();
                        fill(this.axisTextColour);
                        textAlign(CENTER);
                        textStyle(BOLD);
                        textSize(13);
                        for (let i = 0; i < this.numOfLines; i++) {
                            stroke(this.axisColour);
                            let distance = ceil(this.chartWidth/this.numOfLines);
                            translate(distance, 0);
                            line(0, 0, 0, this.lineLength);
                            noStroke();
                            push();
                                translate(0, this.wordGap);
                                rotate(this.rotationAngle);
                                text(distance * (i + 1), 0, 0);
                            pop();
                        }
                    pop();


                    line(0, 0, this.chartWidth, 0);
                    push();
                        translate(0, -this.margin);
                        for (i = 0; i < this.data.length; i++) {
                            let yPos = (this.barWidth + this.gap) * i;
                            fill(this.barColour1);
                            noStroke();
                            rect(0, -yPos, (this.data[i][this.yValue1] * this.scaler), -this.barWidth);
                            push();
                                translate((this.data[i][this.yValue1] * this.scaler), -yPos);
                                fill(this.barColour2)
                                rect(0, 0, (this.data[i][this.yValue2] * this.scaler), -this.barWidth,);
                            pop();
                            fill(this.axisTextColour);
                            textAlign(RIGHT);
                            textStyle(BOLD);
                            textSize(13);
                            push();
                                translate(-15, -(yPos + this.barWidth / 2));
                                text(this.data[i][this.xValue], 0, 0);
                            pop();
                        }
                    pop();
                pop();
            }
    
            else {
                console.log("Direction must be vertical or horizontal");
                console.log(this.direction);
            }
        }

        else if (this.relativeOrAbsolute == "relative") {
            if (this.direction == "vertical") {
                this.gap = (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
                this.data.map((row) => {
                    let rowTotal = row[this.yValue1] + row[this.yValue2];

                    row[this.yValue1] = row[this.yValue1]/rowTotal;
                    row[this.yValue2] = row[this.yValue2]/rowTotal;
                    // console.log(row[this.yValue1]);
                    // console.log(row[this.yValue2]);
                });
                push();
                    translate(this.chartPosX, this.chartPosY);
                    noFill();
                    stroke(this.axisColour);
                    strokeWeight(this.axisThickness);
                    // y axis
                    line(0, 0, 0, -this.chartHeight);
                    push();
                        fill(this.axisTextColour);
                        textAlign(RIGHT, CENTER);
                        textStyle(BOLD);
                        textSize(13);
                        for (let i = 0; i < this.numOfLines; i++) {
                            stroke(this.axisColour);
                            let distance = (this.chartHeight/this.numOfLines);
                            translate(0, -distance);
                            line(0, 0, -20, 0);
                            noStroke();
                            text(round((100/this.numOfLines) * (i + 1)) + "%", -20, 0);
                        }
                    pop();
                    // x axis
                    line(-this.lineLength , 0, this.chartWidth, 0);
                    fill(this.axisTextColour);
                    textAlign(RIGHT, CENTER);
                    textStyle(BOLD);
                    textSize(13);
                    noStroke();
                    text("0%", -this.lineLength, 0);
                    push();
                        translate(this.margin, 0);
                        for (i = 0; i < this.data.length; i++) {
                            let xPos = (this.barWidth + this.gap) * i;
                            fill(this.barColour1);
                            noStroke();
                            rect(xPos, 0, this.barWidth, -(this.data[i][this.yValue1] * this.chartHeight));
                            push();
                                translate(xPos, -(this.data[i][this.yValue1] * this.chartHeight));
                                fill(this.barColour2)
                                rect(0, 0, this.barWidth, -(this.data[i][this.yValue2] * this.chartHeight));
                            pop();
                            fill(this.axisTextColour);
                            textAlign(LEFT);
                            textStyle(BOLD);
                            textSize(13);
                            push();
                                translate(xPos + this.barWidth / 2, 15);
                                rotate(this.rotationAngle);
                                text(this.data[i][this.xValue], 0, 0);
                            pop();
                        }
                    pop();
                pop();
            }
            else if (this.direction == "horizontal") {
                this.gap = (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
                this.data.map((row) => {
                    let rowTotal = row[this.yValue1] + row[this.yValue2];
                    row[this.yValue1] = row[this.yValue1]/rowTotal;
                    row[this.yValue2] = row[this.yValue2]/rowTotal;
                    // console.log(row[this.yValue1]);
                    // console.log(row[this.yValue2]);
                });
                push();
                    translate(this.chartPosX, this.chartPosY);
                    noFill();
                    stroke(this.axisColour);
                    strokeWeight(this.axisThickness);
                    // y axis
                    line(0, this.lineLength, 0, -this.chartHeight);
                    fill(this.axisTextColour);
                    textAlign(CENTER);
                    textStyle(BOLD);
                    textSize(13);
                    push();
                        noStroke();
                        translate(0, this.wordGap);
                        rotate(this.rotationAngle);
                        text("0%", 0, 0);
                    pop();
                    // x axis
                    line(0, 0, this.chartWidth, 0);
                    push();
                        fill(this.axisTextColour);
                        textAlign(CENTER);
                        textStyle(BOLD);
                        textSize(13);
                        for (let i = 0; i < this.numOfLines; i++) {
                            stroke(this.axisColour);
                            let distance = (this.chartWidth/this.numOfLines);
                            translate(distance, 0);
                            line(0, 0, 0, this.lineLength);
                            noStroke();
                            push();
                                translate(0, this.wordGap);
                                rotate(this.rotationAngle);
                                text(round((100/this.numOfLines) * (i + 1)) + "%", 0, 0);
                            pop();
                        }
                    pop();
                    push();
                        translate(0, -this.margin);
                        for (i = 0; i < this.data.length; i++) {
                            let yPos = (this.barWidth + this.gap) * i;
                            fill(this.barColour1);
                            noStroke();
                            rect(0, -yPos, (this.data[i][this.yValue1] * this.chartWidth), -this.barWidth);
                            push();
                                translate((this.data[i][this.yValue1] * this.chartWidth), -yPos);
                                fill(this.barColour2)
                                rect(0, 0, (this.data[i][this.yValue2] * this.chartWidth), -this.barWidth,);
                            pop();
                            fill(this.axisTextColour);
                            textAlign(RIGHT);
                            textStyle(BOLD);
                            textSize(13);
                            push();
                                translate(-15, -(yPos + this.barWidth / 2));
                                text(this.data[i][this.xValue], 0, 0);
                            pop();
                        }
                    pop();
                pop();
            }
    
            else {
                console.log("Direction must be vertical or horizontal");
                console.log(this.direction);
            }
        }
        
        else {
            console.log("relativeOrAbsolute must be relative or absolute");
        }
    }
}