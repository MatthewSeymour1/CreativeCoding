class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.direction = obj.direction || "vertical";
        this.numOfLines = obj.numOfLines || 5;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.rotationAngle = obj.rotationAngle || 50;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 100;
        this.wordGap = obj.wordGap || 25;
        this.lineLength = obj.lineLength || 20;
        this.titleGap = (obj.titleGap + this.chartHeight) || (20 + this.chartHeight);
        this.title = obj.title || "Graph Title";
        this.dashLineLength = obj.dashLineLength || 10;
        this.dashLineGap = obj.dashLineGap || 10;
        this.dashLineColour = obj.dashLineColour || color(220);

        this.gap = (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
        this.scaler;

        this.axisColour = color(0, 0, 0);
        this.barColour = color(74, 103, 199);
        this.axisTextColour = color(0, 0, 0);
    }

    renderBarChart() {
        let maxVar = max(this.data.map(row => row[this.yValue]));
        if (this.direction == "vertical") {
            this.scaler = this.chartHeight / maxVar;
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
                        let textVar = ceil(maxVar / this.numOfLines);
                        translate(0, -distance);
                        line(0, 0, -this.lineLength, 0);
                        // This draws a dotted line horizontally
                        drawingContext.setLineDash([this.dashLineLength, this.dashLineGap]);
                        stroke(this.dashLineColour);
                        line(0, 0, this.chartWidth, 0);
                        noStroke();
                        text(textVar * (i + 1), -this.wordGap, 0);
                        drawingContext.setLineDash([]);
                    }
                pop();

                // Graph Title
                fill(this.axisTextColour);
                textAlign(CENTER);
                noStroke();
                textStyle(BOLD);
                text(this.title, (this.chartWidth/2), -this.titleGap);

                // x axis
                stroke(this.axisColour);
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
                        fill(this.barColour);
                        noStroke();
                        rect(xPos, 0, this.barWidth, -(this.data[i][this.yValue] * this.scaler));
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
            this.scaler = this.chartWidth / maxVar;
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

                // Graph Title
                fill(this.axisTextColour);
                textAlign(CENTER);
                noStroke();
                textStyle(BOLD);
                text(this.title, (this.chartWidth/2), -this.titleGap);

                // x axis
                stroke(this.axisColour);
                line(0, 0, (this.numOfLines * ceil(this.chartWidth/this.numOfLines)), 0);
                push();
                    fill(this.axisTextColour);
                    textAlign(CENTER);
                    textStyle(BOLD);
                    textSize(13);
                    for (let i = 0; i < this.numOfLines; i++) {
                        stroke(this.axisColour);
                        let distance = ceil(this.chartWidth/this.numOfLines);
                        let textVar = ceil(maxVar / this.numOfLines);
                        translate(distance, 0);
                        // This draws a dotted line horizontally
                        drawingContext.setLineDash([this.dashLineLength, this.dashLineGap]);
                        stroke(this.dashLineColour);
                        line(0, 0, 0, -this.chartHeight);
                        drawingContext.setLineDash([]);
                        stroke(this.axisColour);
                        line(0, 0, 0, this.lineLength);
                        noStroke();
                        push();
                            translate(0, this.wordGap);
                            rotate(this.rotationAngle);
                            text(textVar * (i + 1), 0, 0);
                        pop();
                    }
                pop();
                push();
                    translate(0, -this.margin);
                    for (i = 0; i < this.data.length; i++) {
                        let yPos = (this.barWidth + this.gap) * i;
                        fill(this.barColour);
                        noStroke();
                        rect(0, -yPos, (this.data[i][this.yValue] * this.scaler), -this.barWidth);
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
        }
    }
}