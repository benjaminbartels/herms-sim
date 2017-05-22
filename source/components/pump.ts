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
    private readonly size = 20;
    private readonly onColor = 0x2ECC40;    // Green
    private readonly offColor = 0x85144b;   // Maroon

    constructor(name: string, position: [number, number], orientation: Orientation, app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.orientation = orientation;
        this.isOn = false;
        this.liquid = Liquid.None;
        this.g = new PIXI.Graphics;
        this.g.interactive = true;
        this.g.buttonMode = true;
        this.g.on("pointerdown", () => { this.toggle(); });
        app.stage.addChild(this.g);
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
    }

    public draw() {
        this.g.clear();
        if (this.isOn) {
            this.g.lineStyle(1, this.onColor);
        } else {
            this.g.lineStyle(1, this.offColor);
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

    public notify(source: any) {
        console.log("notify called on", this.name);
        this.liquid = source.liquid;
        if (this.isOn) {
            if (source.name === this.inComponent.name) {
                this.outComponent.notify(this);
            } else if (source.name === this.outComponent.name) {
                this.inComponent.notify(this);
            }
        }
        this.draw();
    }

    public toggle() {
        if (this.isOn) {
            this.off();
        } else {
            this.on();
        }
    }

    private on() {
        this.isOn = true;
        this.inComponent.suck(this);
        this.outComponent.fill(this);
        this.draw();
    }

    private off() {
        this.isOn = false;
        this.liquid = Liquid.None;
        this.inComponent.stop(this);
        this.outComponent.stop(this);
        this.draw();
    }

}
export default Pump;
