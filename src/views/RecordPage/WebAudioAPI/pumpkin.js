class Pumpkin {
    constructor(x,y,rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    draw (ctx, opennes) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.rad, this.rad);
/*
        ctx.fillStyle = 'gray';
        ctx.beginPath();
      //  ctx.rect(this.x - this.rad, this.y - this.rad, this.rad * 2, this.rad * 2);
        ctx.rect(-1, -1, 2, 2); //-1 - 100% //скоратили благодаря translate и scale
        ctx.fill();
*/

        this.#drawHead(ctx, opennes);
        this.#drawEyes(ctx, opennes);
        this.#drawNose(ctx, opennes);
        this.#drawMouth(ctx, opennes);

        ctx.restore();
    }

    #drawHead(ctx, opennes) {
        //рисуем голову
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.rect(-0.05, -1, 0.1, 0.1);
        ctx.fill();


        ctx.fillStyle = 'rgb(255, 150, 0)';
        ctx.beginPath();
        ctx.ellipse(-0.6, 0.03, 0.4, 0.92, -opennes * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0.6, 0.03, 0.4,  0.92, opennes * 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgb(255, 170, 0)';
        ctx.beginPath();
        ctx.ellipse(-0.3, 0.03, 0.4,  0.95, -opennes * 0.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0.3, 0.03, 0.4, 0.95, opennes * 0.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgb(255,190,0)';
        ctx.beginPath();
        ctx.ellipse(0, 0.03, 0.4, 0.97, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    #drawEyes(ctx, opennes) {
        ctx.save();
        ctx.translate(-0.4, -0.4);

        ctx.scale(1 + opennes * 0.3, 1.2 - opennes);

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(-0.15, 0);
        ctx.lineTo(0.15, -0.15);
        ctx.lineTo(0.15, 0.15);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        ctx.save();
        ctx.translate(0.4, -0.4);

        ctx.scale(1 + opennes * 0.3, 1.2 - opennes);

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0.15, 0);
        ctx.lineTo(-0.15, -0.15);
        ctx.lineTo(-0.15, 0.15);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    #drawNose(ctx, opennes) {
        ctx.save();
        ctx.translate(-0.08, -opennes * 0.05)

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(-0.05, 0);
        ctx.lineTo(0.05, -0.05);
        ctx.lineTo(0.05, 0.05);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        ctx.save();
        ctx.translate(0.08, -opennes * 0.05)

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0.05, 0);
        ctx.lineTo(-0.05, -0.05);
        ctx.lineTo(-0.05, 0.05);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    #drawMouth(ctx, opennes) {
        ctx.fillStyle = 'black';
        ctx.save();
        ctx.translate(0, 0.4);
        ctx.scale(1 - opennes * 0.2, 0.2 + opennes);

        ctx.moveTo(-0.6, 0);
        ctx.lineTo(-0.4, -0.17);
        ctx.lineTo(-0.2, -0.08);
        ctx.lineTo(0, -0.2);
        ctx.lineTo(0.2, -0.08);
        ctx.lineTo(0.4, -0.17);
        ctx.lineTo(0.6, 0);
        ctx.lineTo(0.4, 0.17);
        ctx.lineTo(0.2, 0.08);
        ctx.lineTo(0, 0.2);
        ctx.lineTo(-0.2, 0.08);
        ctx.lineTo(-0.4, 0.17);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

export default Pumpkin;