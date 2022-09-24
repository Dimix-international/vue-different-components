class Bar {
    constructor(x, y, width, height, color, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = index;
    }
    update (micInput) {
        const sound = micInput * 1000;
        if (sound > this.height ) {
            this.height = sound
        } else {
            this.height -= this.height * 0.03
        }
    }
    draw (context, canvasWidth, canvasHeight, volume) {
        context.strokeStyle = this.color;
        context.save();

        context.rotate(this.index * 0.03);
        context.scale(1 + volume * 0.2, 1 + volume * 0.2)

        context.beginPath();
      context.moveTo(this.x, this.y);
        context.lineTo(this.y, this.height);
       // context.bezierCurveTo(0,0,this.height,this.height,this.x ,this.y);
        context.stroke();

        context.rotate(this.index * 0.02);
   //    context.strokeRect(this.y + this.index * 1.5, this.height, this.height / 2, this.height);
        context.beginPath();
     //  context.arc(this.x + this.index * 2.5, this.y, this.height * 0.2, 0, Math.PI * 2);
        context.stroke();

        context.restore();
    }
}

export default Bar;