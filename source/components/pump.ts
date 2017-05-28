import * as PIXI from "pixi.js";
import { Liquid, Orientation } from "./enums";

class Pump {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public liquid: Liquid;
    public inComponent: any;
    public outComponent: any;
    public inPort: [number, number];
    public outPort: [number, number];
    public isOn: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly size = 20;
    private readonly unpoweredColor = 0x001F3F; // Navy
    private readonly poweredColor = 0xFFDC00;   // Yellow

    constructor(name: string, position: [number, number], orientation: Orientation, app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.orientation = orientation;
        this.isOn = false;
        this.liquid = Liquid.None;
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
                this.inPort = [position[0] - 20, position[1]];
                this.outPort = [position[0] + 20, position[1]];
                break;
            case Orientation.TopToBottom:
                this.inPort = [position[0], position[1] - 20];
                this.outPort = [position[0], position[1] + 20];
                break;
            case Orientation.RightToLeft:
                this.inPort = [position[0] + 20, position[1]];
                this.outPort = [position[0] - 20, position[1]];
                break;
            case Orientation.BottomToTop:
                this.inPort = [position[0], position[1] + 20];
                this.outPort = [position[0], position[1] - 20];
                break;
        }
        this.t.x = this.position[0];
        this.t.y = this.position[1];
    }

    public draw() {
        console.log(this.name + " draw");

        this.g.clear();
        if (this.isOn) {
            this.g.lineStyle(1, this.poweredColor);
        } else {
            this.g.lineStyle(1, this.unpoweredColor);
        }
        this.g.beginFill(this.liquid);
        this.g.drawCircle(this.position[0], this.position[1], this.size);
        this.g.moveTo(this.position[0] - 10, this.position[1] - 15);
        this.g.lineTo(this.position[0] + 20, this.position[1]);
        this.g.lineTo(this.position[0] - 10, this.position[1] + 15);
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
        return this.inPort;
    }

    public connectToOut(component: any) {
        this.outComponent = component;
        return this.outPort;
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);
    }

    public stop(source: any) {
        console.log(this.name + " stop - source: " + source);
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);


        if (source === this.inComponent.name) {
            if (this.isOn) {
                this.liquid = liquid;
                this.outComponent.fill(this.name, this.liquid);
            }
        } else if (source === this.outComponent.name) {
            console.log(this.name + " updateLiquid - Can't update Liquid from the out port of a pump.");
        }

        this.draw();
    }

    public on() {
        console.log(this.name + " on");
        if (!this.isOn) {
            this.isOn = true;
            this.inComponent.suck(this.name);
            this.draw();
        }
    }

    public off() {
        console.log(this.name + " off");
        if (this.isOn) {
            this.isOn = false;
            this.liquid = Liquid.None;
            this.inComponent.stop(this.name);
            this.outComponent.stop(this.name);
            this.draw();
        }
    }

}
export default Pump;
