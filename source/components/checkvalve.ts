import * as PIXI from "pixi.js";
import { Liquid, Orientation } from "./enums";

class CheckValve {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public liquid: Liquid;
    public inComponent: any;
    public outComponent: any;
    public inComponentPort: [number, number];
    public outComponentPort: [number, number];
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly lineColor = 0x111111;
    private readonly width = 20;

    constructor(name: string, position: [number, number], orientation: Orientation, app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.orientation = orientation;
        this.liquid = Liquid.None;
        this.inComponentPort = [position[0] + 0, position[1] + 10];
        this.outComponentPort = [position[0] + 40, position[1] + 10];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.draw();

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.inComponentPort = [position[0] - (this.width / 2), position[1]];
                this.outComponentPort = [position[0] + (this.width / 2), position[1]];
                break;
            case Orientation.TopToBottom:
                this.inComponentPort = [position[0], position[1] - (this.width / 2)];
                this.outComponentPort = [position[0], position[1] + (this.width / 2)];
                break;
            case Orientation.RightToLeft:
                this.inComponentPort = [position[0] + (this.width / 2), position[1]];
                this.outComponentPort = [position[0] - (this.width / 2), position[1]];
                break;
            case Orientation.BottomToTop:
                this.inComponentPort = [position[0], position[1] + (this.width / 2)];
                this.outComponentPort = [position[0], position[1] - (this.width / 2)];
                break;
        }
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.moveTo(this.position[0] - (this.width / 2), this.position[1] - (this.width / 2));
        this.g.lineTo(this.position[0] + (this.width / 2), this.position[1]);
        this.g.lineTo(this.position[0] - (this.width / 2), this.position[1] + (this.width / 2));
        this.g.lineTo(this.position[0] - (this.width / 2), this.position[1] - (this.width / 2));
        this.g.moveTo(this.position[0] + (this.width / 2), this.position[1] + (this.width / 2));
        this.g.lineTo(this.position[0] + (this.width / 2), this.position[1] - (this.width / 2));
        this.g.position.x = this.position[0];
        this.g.position.y = this.position[1];
        this.g.pivot = new PIXI.Point(this.position[0], this.position[1]);
        if (this.orientation === Orientation.TopToBottom) {
            this.g.rotation = 1.5708;
        } else if (this.orientation === Orientation.RightToLeft) {
            this.g.rotation = 3.1416;
        } else if (this.orientation === Orientation.BottomToTop) {
            this.g.rotation = 4.7124;
        }
    }

    public connectToIn(component: any) {
        this.inComponent = component;
        return this.inComponentPort;
    }

    public connectToOut(component: any) {
        this.outComponent = component;
        return this.outComponentPort;
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (source === this.inComponent.name) {
            this.liquid = liquid;
            this.outComponent.fill(this.name, this.liquid);
            this.draw();
        } else if (source === this.outComponent.name) {
            console.log(this.name + " fill - Can't fill into the out port of check valve.");
        }
    }

    public suck(source: string) {
        console.log(this.name + " suck - source: " + source);

        if (source === this.inComponent.name) {
            console.log(this.name + " suck - Can't suck out of the in port of check valve.");
        } else if (source === this.outComponent.name) {
            this.inComponent.suck(this.name);

        }
    }

    public stop(source: string) {
        console.log(this.name + " stop - source: " + source);

        if (source === this.inComponent.name) {
            this.liquid = Liquid.None;
            this.outComponent.stop(this.name);
            this.draw();
        } else if (source === this.outComponent.name) {
            console.log(this.name + " stop - Can't stop from out port of check valve");
        }
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);

        if (source === this.inComponent.name) {
            this.liquid = liquid;
            this.outComponent.updateLiquid(this.name, this.liquid);
        } else {
            console.log(this.name + " updateLiquid - Can't update liquid from out port of check valve");
        }

        this.draw();
    }
}

export default CheckValve;
