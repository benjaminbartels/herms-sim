import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class Faucet {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public component: any;
    public componentPressure: number;
    public port: [number, number];
    public isOn: boolean;
    private g: PIXI.Graphics;
    private readonly size = 20;
    private readonly onColor = 0x2ECC40;    // Green
    private readonly offColor = 0x85144b;   // Maroon

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.liquid = Liquid.None;
        this.componentPressure = 0;
        this.port = position;
        this.g = new PIXI.Graphics;
        this.g.interactive = true;
        this.g.buttonMode = true;
        this.g.on("pointerdown", () => { this.toggle(); });
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {
        console.log("draw called on", this.name);

        this.g.clear();

        if (this.isOn) {
            this.g.lineStyle(1, this.onColor);
        } else {
            this.g.lineStyle(1, this.offColor);
        }

        this.g.beginFill(this.liquid);
        this.g.drawCircle(this.position[0], this.position[1], this.size);
    }

    public connect(component: any) {
        this.component = component;
        return this.port;
    }

    public notify(source: any) {
        console.log("notify called on", this.name);
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
        this.liquid = Liquid.Water;
        this.draw();
        this.component.fill(this);
    }

    private off() {
        this.isOn = false;
        this.liquid = Liquid.None;
        this.draw();
        this.component.stop(this);
    }
}

export default Faucet;
