import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class CounterFlowChiller {
    public name: string;
    public position: [number, number];
    public initialLiquid: Liquid;
    public wertInComponent: any;
    public wertOutComponent: any;
    public waterInComponent: any;
    public waterOutComponent: any;
    public wertInComponentPressure: number;
    public wertOutComponentPressure: number;
    public waterInComponentPressure: number;
    public waterOutComponentPressure: number;
    public wertInComponentPort: [number, number];
    public wertOutComponentPort: [number, number];
    public waterInComponentPort: [number, number];
    public waterOutComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private readonly lineColor = 0x111111;      // Green
    private readonly width = 40;

    constructor(name: string, position: [number, number], initialLiquid: Liquid, app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.initialLiquid = initialLiquid;
        this.liquid = initialLiquid;
        this.wertInComponentPressure = 0;
        this.wertInComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.width / 2)];
        this.wertOutComponentPressure = 0;
        this.wertOutComponentPort = [this.position[0] - (this.width / 2), this.position[1] + (this.width / 2)];
        this.waterInComponentPressure = 0;
        this.waterInComponentPort = [this.position[0] + (this.width / 2), this.position[1] - (this.width / 2)];
        this.waterOutComponentPressure = 0;
        this.waterOutComponentPort = [this.position[0] + (this.width / 2), this.position[1] + (this.width / 2)];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.width / 2), this.width, this.width);
    }

    public fill(source: any) {
        console.log("fill called on", this.name);
    }

    public suck(source: any) {
        console.log("suck called on", this.name);
    }

    public stop(source: any) {
        console.log("stop called on", this.name);
    }

    public notify(source: any) {
        console.log("notify called on", this.name);
    }

    public connectToWertIn(component: any) {
        this.wertInComponent = component;
        return this.wertInComponentPort;
    }

    public connectToWertOut(component: any) {
        this.wertOutComponent = component;
        return this.wertOutComponentPort;
    }

    public connectToWaterIn(component: any) {
        this.waterInComponent = component;
        return this.waterInComponentPort;
    }

    public connectToWaterOut(component: any) {
        this.waterOutComponent = component;
        return this.waterOutComponentPort;
    }
}

export default CounterFlowChiller;
