class RadialHistogram {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues || [];
        this.chartRadius = obj.chartRadius || 800;
        this.barWidth = obj.barWidth || 30;
        this.margin = obj.margin || 15;
        this.rotationAngle = obj.rotationAngle || 50;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 800;
        this.chartPosY = obj.chartPosY || 2000;
        this.wordGap = obj.wordGap || 25;
        this.lineLength = obj.lineLength || 20;
        this.titleGap = (obj.titleGap + this.chartHeight) || (20 + this.chartHeight);
        this.title = obj.title || "Graph Title";
        this.dashLineLength = obj.dashLineLength || 10;
        this.dashLineGap = obj.dashLineGap || 10;
        this.dashLineColour = obj.dashLineColour || color(220);

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
        console.log("Hello");

        push();
            translate(this.chartPosX, this.chartPosY);
            ellipse(0, 0, this.chartRadius);
            fill(this.barColour1);
            arc(50, 50, 50, 50);
        pop();
    }
}