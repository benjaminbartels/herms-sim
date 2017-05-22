import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class BrewKettle {
    public name: string;
    public position: [number, number];
    public topComponent: any;
    public bottomComponent: any;
    public topComponentPressure: number;
    public bottomComponentPressure: number;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private readonly lineColor = 0x111111;
    private readonly width = 150;
    private readonly height = 200;
    private readonly topOffset = 10;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquid = Liquid.None;
        this.topComponentPressure = 0;
        this.topComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2) + this.topOffset];
        this.bottomComponentPressure = 0;
        this.bottomComponentPort = [position[0], position[1] + (this.height / 2)];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }

    public fill(source: any) {
        console.log("fill called on", this.name);
        this.topComponentPressure = 1;
        this.liquid = source.liquid;
        this.draw();
    }

    public suck(source: any) {
        console.log("suck called on", this.name);
        this.topComponentPressure = -1;
        this.draw();
        this.topComponent.notify(this);
    }

    public stop(source: any) {
        console.log("stop called on", this.name);
        this.topComponentPressure = 0;
        this.draw();
    }

    public notify(source: any) {
        console.log("notify called on", this.name);
        this.liquid = source.liquid;
        this.draw();
    }

    public connectToTop(component: any) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public connectToBottom(component: any) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }
}

export default BrewKettle;
