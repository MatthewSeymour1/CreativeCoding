class RadialHistogram {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartRadius = obj.chartRadius || 800;
        this.chartPosX = obj.chartPosX || 800;
        this.chartPosY = obj.chartPosY || 2000;
        this.titleGap = (obj.titleGap + this.chartRadius) || (20 + this.chartHeight);
        this.title = obj.title || "Graph Title";
        this.gap = obj.gap || 1;

        this.gap;
        this.scaler;

        this.axisColour = color(0, 0, 0);
        this.barColour1 = color(74, 103, 199);
        this.barColour2 = color(247, 117, 10);
        this.randomColour = color(random(255), random(255), random(255));
        this.barColours = [this.barColour1, this.barColour2, this.randomColour];
        this.axisTextColour = color(0, 0, 0);
    }

    // DATA.LENGTH * ARCS + DATA.LENGTH * MARGIN = 360
    renderBarChart() {
        if (this.gap > 32) {
            this.gap = 32;
        }
        else if (this.gap < 0) {
            this.gap = 0;
        }
        push();
            translate(this.chartPosX, this.chartPosY);
            ellipse(0, 0, this.chartRadius);
            let maxValue = max(this.data.map(row => row[this.yValue]));
            let arcLength;
            this.scaler = this.chartRadius/maxValue;
            for (let i = 0; i < this.data.length; i++) {
                arcLength = this.data[i][this.yValue] * this.scaler;
                console.log(this.data[i][this.yValue], maxValue);
                fill(color((255 * (this.data[i][this.yValue]/maxValue)), 0, 0));
                arc(0, 0, arcLength, arcLength, 0, 360/this.data.length - this.gap);
                rotate(360/this.data.length);
            }

        pop();
    }
}