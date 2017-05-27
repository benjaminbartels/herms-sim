import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class HotLiquorTank {
    public name: string;
    public position: [number, number];
    public topComponent: any;
    public bottomComponent: any;
    public coilTopComponent: any;
    public coilBottomComponent: any;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    public coilTopComponentPort: [number, number];
    public coilBottomComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
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
        this.topComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2) + this.topOffset];
        this.bottomComponentPort = [position[0], position[1] + (this.height / 2)];
        this.coilTopComponentPort = [position[0] + (this.width / 2), position[1] - (this.height / 2) + this.coilTopOffset];
        this.coilBottomComponentPort = [position[0] + (this.width / 2), position[1] + (this.height / 2) - this.coilBottomOffset];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.draw();
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
        this.g.moveTo(this.coilTopComponentPort[0], this.coilTopComponentPort[1]);
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.lineTo(this.coilBottomComponentPort[0], this.coilBottomComponentPort[1]);
        this.g.drawCircle(this.position[0], this.position[1], this.coilSize);
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (source === this.topComponent.name) {
            this.liquid = liquid;
            this.bottomComponent.fill(this.name, this.liquid);
            this.draw();
        } else if (source === this.bottomComponent.name) {
            console.log(this.name + " suck - Can't fill from the bottom port of brewkettle.");
        }
    }

    public suck(source: string) {
        console.log(this.name + " suck - source: " + source);

        if (source === this.topComponent.name) {
            console.log(this.name + " suck - Can't suck out of the top port of brewkettle.");
        } else if (source === this.bottomComponent.name) {
            this.bottomComponent.updateLiquid(this.name, this.liquid);
            this.draw();
        }
    }

    public stop(source: string) {
        console.log(this.name + " stop - source: " + source);
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);
    }

    public heatOn() {
        console.log(this.name + " heatOn");
        if (this.liquid === Liquid.ColdWater) {
            this.liquid = Liquid.HotWater;
            this.draw();
            this.bottomComponent.updateLiquid(this.name, this.liquid);
        }
    }

    public heatOff() {
        console.log(this.name + " heatOff");
        if (this.liquid === Liquid.HotWater) {
            this.draw();
            this.bottomComponent.updateLiquid(this.name, this.liquid);
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
