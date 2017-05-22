import * as PIXI from "pixi.js";
import { Liquid, Orientation } from "./enums";

class CheckValve {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public liquid: Liquid;
    public inComponent: any;
    public outComponent: any;
    public inComponentPressure: number;
    public outComponentPressure: number;
    public inComponentPort: [number, number];
    public outComponentPort: [number, number];
    private g: PIXI.Graphics;
    private readonly lineColor = 0x111111;
    private readonly width = 20;

    constructor(name: string, position: [number, number], orientation: Orientation, app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.orientation = orientation;
        this.liquid = Liquid.None;
        this.inComponentPressure = 0;
        this.outComponentPressure = 0;
        this.inComponentPort = [position[0] + 0, position[1] + 10];
        this.outComponentPort = [position[0] + 40, position[1] + 10];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
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
        console.log("draw called on", this.name);
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

    public fill(source: any) {
        console.log("fill called on", this.name);
        if (this.inComponent != null && this.inComponent.name === source.name) {
            if (this.inComponentPressure !== 1) {
                this.liquid = source.liquid;
                this.draw();
                this.inComponentPressure = 1;
                this.outComponent.fill(this);
            }
        } else if (this.outComponent != null && this.outComponent.name === source.name) {
            console.log("Can't fill into the out port of check valve", this.name);
        }
    }

    public suck(source: any) {
        console.log("suck called on", this.name);

        if (this.inComponent != null && this.inComponent.name === source.name) {
            console.log("Can't suck out of the in port of check valve", this.name);
        } else if (this.outComponent != null && this.outComponent.name === source.name) {
            if (this.outComponentPressure !== -1) {
                this.outComponentPressure = -1;
                this.inComponent.suck(this);
            }
        }
    }

    public stop(source: any) {
        console.log("stop called on", this.name);

        this.liquid = Liquid.None;
        this.draw();

        if (this.inComponent != null && this.inComponent.name === source.name) {
            if (this.inComponentPressure !== 0) {
                this.inComponentPressure = 0;
                this.outComponent.stop(this);

            }
        } else if (this.outComponent != null && this.outComponent.name === source.name) {
            if (this.outComponentPressure !== 0) {
                this.outComponentPressure = 0;
                this.inComponent.stop(this);
            }
        }
    }

    public notify(source: any) {
        console.log("notify called on", this.name);

        this.liquid = source.liquid;
        this.draw();

        if (this.inComponent != null && this.inComponent.name === source.name) {
            if (this.outComponentPressure === -1) {
                this.outComponent.notify(this);
            }
        } else if (this.outComponent != null && this.outComponent.name === source.name) {
            if (this.inComponentPressure === -1) {
                this.inComponent.notify(this);
            }
        }

    }
}

export default CheckValve;
