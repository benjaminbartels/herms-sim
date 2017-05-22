import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class Tube {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public component1: any;
    public component2: any;
    public component1Pressure: number;
    public component2Pressure: number;
    public component1Port: [number, number];
    public component2Port: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, app: PIXI.Application) {
        this.name = name;
        this.liquid = Liquid.None;
        this.component1Pressure = 0;
        this.component2Pressure = 0;
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
    }

    public draw() {
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.lineStyle(3, this.liquid);
        this.g.moveTo(this.component1Port[0], this.component1Port[1]);
        this.g.lineTo(this.component2Port[0], this.component2Port[1]);
    }

    public connectToA(component: any, port: [number, number]) {
        this.component1 = component;
        this.component1Port = port;

        if (this.component1 != null && this.component2 != null) {
            this.draw();
        }
    }

    public connectToB(component: any, port: [number, number]) {
        this.component2 = component;
        this.component2Port = port;

        if (this.component1 != null && this.component2 != null) {
            this.draw();
        }
    }

    public fill(source: any) {
        console.log("fill called on", this.name);

        this.liquid = source.liquid;
        this.draw();

        if (this.component1.name === source.name) {
            if (this.component1Pressure !== 1) {
                this.component1Pressure = 1;
                this.component2.fill(this);
            }
        } else if (this.component2.name === source.name) {
            if (this.component2Pressure !== 1) {
                this.component2Pressure = 1;
                this.component1.fill(this);
            }
        }
    }

    public suck(source: any) {
        console.log("suck called on", this.name, "from", source.name);

        if (this.component1.name === source.name) {
            if (this.component1Pressure !== -1) {
                this.component1Pressure = -1;
                this.component2.suck(this);
            }
        } else if (this.component2.name === source.name) {
            if (this.component2Pressure !== -1) {
                this.component2Pressure = -1;
                this.component1.suck(this);
            }
        }
    }

    public stop(source: any) {
        console.log("stop called on", this.name);

        this.liquid = Liquid.None;
        this.draw();

        if (this.component1.name === source.name) {
            if (this.component1Pressure !== 0) {
                this.component1Pressure = 0;
                this.component2.stop(this);
            }
        } else if (this.component2.name === source.name) {
            if (this.component2Pressure !== 0) {
                this.component2Pressure = 0;
                this.component1.stop(this);
            }
        }
    }

    public notify(source: any) {
        console.log("notify called on", this.name);
        this.liquid = source.liquid;
        this.draw();

        if (this.component1.name === source.name) {
            if (this.component2Pressure === -1) {
                this.component2.notify(this);
            } else if (this.component1Pressure === 1) {
                this.component2.notify(this);
            }
        } else if (this.component2.name === source.name) {
            if (this.component1Pressure === -1) {
                this.component1.notify(this);
            } else if (this.component2Pressure === 1) {
                this.component1.notify(this);
            }
        }
    }
}

export default Tube;
