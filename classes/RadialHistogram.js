class RadialHistogram {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartDiameter = obj.chartDiameter || 800;
        this.chartPosX = obj.chartPosX || 800;
        this.chartPosY = obj.chartPosY || 2000;
        this.titleGap = (obj.titleGap + this.chartDiameter) || (20 + this.chartHeight);
        this.title = obj.title || "Graph Title";
        this.gap = obj.gap || 1;
        this.wordGap = obj.wordGap || 35;
        this.numOfGridLines = obj.numOfGridLines || 5;

        this.gap;
        this.scaler;

        this.axisColour = color(0, 0, 0);
        this.barColour1 = color(74, 103, 199);
        this.barColour2 = color(247, 117, 10);
        this.randomColour = color(random(255), random(255), random(255));
        this.barColours = [this.barColour1, this.barColour2, this.randomColour];
        this.axisTextColour = color(0, 0, 0);
    }

    renderBarChart() {
        if (this.gap > 32) {
            this.gap = 32;
        }
        else if (this.gap < 0) {
            this.gap = 0;
        }
        push();
            translate(this.chartPosX, this.chartPosY);
            ellipse(0, 0, this.chartDiameter);
            let distance = this.chartDiameter/this.numOfGridLines;
            console.log(this.chartDiameter, this.numOfGridLines, distance);
            for (let i = 0; i < this.numOfGridLines; i++) {
                noFill();
                stroke(0);
                ellipse(0, 0, (distance * i));
            }
            let maxValue = max(this.data.map(row => row[this.yValue]));
            let arcLength;
            this.scaler = this.chartDiameter/maxValue;
            textAlign(CENTER);
            for (let i = 0; i < this.data.length; i++) {
                arcLength = this.data[i][this.yValue] * this.scaler;
                fill(color((255 * (this.data[i][this.yValue]/maxValue)), 0, 0));

                //Draws the grid.
                push();
                    beginShape();
                        rotate(((360/this.data.length) * (i + 0.5)) - this.gap);
                        vertex(0, 0);
                        vertex(this.chartDiameter/2, 0);
                    endShape();
                pop();

                //Draws the arcs.
                push();
                    rotate((360/this.data.length) * i);
                    arc(0, 0, arcLength, arcLength, 0, 360/this.data.length - this.gap);
                    rotate(((360/this.data.length))/2);
                    translate(this.chartDiameter/2 + this.wordGap, 0);
                    rotate(((-360/this.data.length) * i) - (((360/this.data.length))/2));
                    fill(0); //Makes the text black.
                    noStroke();
                    text(this.data[i][this.xValue], 0, 0);
                pop();

            }
        pop();
    }
}