import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class HotLiquorTank {
    public name: string;
    public position: [number, number];
    public topComponent: any;
    public bottomComponent: any;
    public coilTopComponent: any;
    public coilBottomComponent: any;
    public topComponentPressure: number;
    public bottomComponentPressure: number;
    public coilTopComponentPressure: number;
    public coilBottomComponentPressure: number;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    public coilTopComponentPort: [number, number];
    public coilBottomComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private readonly lineColor = 0x111111;
    private readonly width = 150;
    private readonly height = 200;
    private readonly topOffset = 10;
    private readonly coilSize = 40;
    private readonly coilTopOffset = 25;
    private readonly coilBottomOffset = 25;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquid = Liquid.None;
        this.topComponentPressure = 0;
        this.topComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2) + this.topOffset];
        this.bottomComponentPressure = 0;
        this.bottomComponentPort = [position[0], position[1] + (this.height / 2)];
        this.coilTopComponentPressure = 0;
        this.coilTopComponentPort = [position[0] + (this.width / 2), position[1] - (this.height / 2) + this.coilTopOffset];
        this.coilBottomComponentPressure = 0;
        this.coilBottomComponentPort = [position[0] + (this.width / 2), position[1] + (this.height / 2) - this.coilBottomOffset];
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
        this.g.moveTo(this.coilTopComponentPort[0], this.coilTopComponentPort[1]);
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.lineTo(this.coilBottomComponentPort[0], this.coilBottomComponentPort[1]);
        this.g.drawCircle(this.position[0], this.position[1], this.coilSize);
    }

    public fill(source: any) {
        console.log("fill called on", this.name);


        if (this.topComponent != null && this.topComponent.name === source.name) {
            this.topComponentPressure = 1;
            this.liquid = source.liquid;
            this.draw();
        } else if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            console.error("Can't fill in from bottomComponent");
        }

        this.topComponentPressure = 1;
        this.liquid = source.liquid;
        this.draw();
    }

    public suck(source: any) {
        console.log("suck called on", this.name);

        if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            this.bottomComponentPressure = -1;
            this.draw();
            this.bottomComponent.notify(this);
        } else if (this.topComponent != null && this.topComponent.name === source.name) {
            console.error("Can't suck out of topComponent");
        }

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

    public heatOn() {
        console.log("heatOn called on", this.name);
        if (this.liquid === Liquid.ColdWater) {
            this.liquid = Liquid.HotWater;
            this.draw();
            this.bottomComponent.notify(this);
        }
    }

    public heatOff() {
        console.log("heatOff called on", this.name);
        if (this.liquid === Liquid.HotWater) {
            this.liquid = Liquid.ColdWater;
            this.draw();
            this.bottomComponent.notify(this);
        }
    }

    public connectToTop(component: any) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public connectToBottom(component: any) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }

    public connectToCoilTop(component: any) {
        this.coilTopComponent = component;
        return this.coilTopComponentPort;
    }

    public connectToCoilBottom(component: any) {
        this.coilBottomComponent = component;
        return this.coilBottomComponentPort;
    }
}

export default HotLiquorTank;
