import * as PIXI from "pixi.js";
import { LiquidType } from "./enums";
import { Liquid } from "./liquid";

class HotLiquorTank {
    public name: string;
    public position: [number, number];
    // public coilState: State;
    public topComponent: any;
    public bottomComponent: any;
    public coilTopComponent: any;
    public coilBottomComponent: any;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    public coilTopComponentPort: [number, number];
    public coilBottomComponentPort: [number, number];
    public liquids: Liquid[];
    public coilLiquid: Liquid;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private c: PIXI.Text;
    private timer: number;
    private coilTimer: number;
    private isHeating: boolean;
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
        this.coilLiquid = null;
        this.liquids = new Array<Liquid>();
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
        this.c = new PIXI.Text(this.liquids.length.toString());
        this.c.style.fontSize = 10;
        this.c.anchor.set(0.5, -1.0);
        this.c.x = this.position[0];
        this.c.y = this.position[1];
        app.stage.addChild(this.c);
        this.timer = setInterval(() => this.drain(), 1000);
        this.draw();
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.beginFill(this.getColor());
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
        this.g.moveTo(this.coilTopComponentPort[0], this.coilTopComponentPort[1]);
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.lineTo(this.coilBottomComponentPort[0], this.coilBottomComponentPort[1]);
        this.g.drawCircle(this.position[0], this.position[1], this.coilSize);
        this.c.text = this.liquids.length.toString();

    }

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        if ((this.topComponent != null && this.topComponent.name === source) ||
            (this.bottomComponent != null && this.bottomComponent.name === source)) {

            if (liquid == null) {
                console.log(this.name + " fill - null liquid");
                return true;
            }

            if (this.bottomComponent != null && this.bottomComponent.name === source) {
                console.error(this.name + " fill - Can't fill from the bottom port of HotLiquorTank.");
                result = false;
            } else if (this.topComponent != null && this.topComponent.name === source) {
                if (this.isHeating) {
                    liquid.type = LiquidType.HotWater;
                }
                this.liquids.push(liquid);
                this.draw();
                result = true;

            }

        } else if ((this.coilTopComponent != null && this.coilTopComponent.name === source) ||
            (this.coilBottomComponent != null && this.coilBottomComponent.name === source)) {

            clearTimeout(this.coilTimer);

            if (this.coilLiquid == null && liquid != null) {
                this.coilLiquid = liquid;
                result = true;
            } else {
                if (this.coilTopComponent != null && this.coilTopComponent.name === source) {
                    result = this.coilBottomComponent.fill(this.name, this.coilLiquid);
                } else if (this.coilBottomComponent != null && this.coilBottomComponent.name === source) {
                    result = this.coilTopComponent.fill(this.name, this.coilLiquid);
                }
                if (result) {
                    this.coilLiquid = liquid;
                }
            }

            this.coilTimer = setInterval(() => this.drainCoil(), 1000);

        }
        this.draw();
        return result;
    }

    public suck(source: string): Liquid {
        console.log(this.name + " suck - source: " + source);

        let returnLiquid = null;

        if ((this.topComponent != null && this.topComponent.name === source) ||
            (this.bottomComponent != null && this.bottomComponent.name === source)) {

            clearTimeout(this.timer);

            if (this.topComponent != null && this.topComponent.name === source) {
                console.log(this.name + " suck - Can't suck out of the top port of HotLiquorTank.");
            } else if (this.bottomComponent != null && this.bottomComponent.name === source) {
                if (this.liquids.length > 0) {
                    returnLiquid = this.liquids.pop();
                }
            }

            this.timer = setInterval(() => this.drain(), 1000);

        } else if ((this.coilTopComponent != null && this.coilTopComponent.name === source) ||
            (this.coilBottomComponent != null && this.coilBottomComponent.name === source)) {

            returnLiquid = this.coilLiquid;

            if (this.coilTopComponent.name === source) {
                this.coilLiquid = this.coilBottomComponent.suck(this.name);
            } else if (this.coilBottomComponent.name === source) {
                this.coilLiquid = this.coilTopComponent.suck(this.name);
            }
        }
        this.draw();
        return returnLiquid;
    }

    public heatOn() {
        console.log(this.name + " heatOn");
        this.isHeating = true;
        for (let i = 0; i < this.liquids.length; i++) {
            this.liquids[i].type = LiquidType.HotWater;
        }
        this.draw();
    }

    public heatOff() {
        console.log(this.name + " heatOff");
        this.isHeating = false;
        // ToDo: What to do here?
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

    private drain() {
        console.log(this.name + " drain");

        if (this.liquids.length > 0) {
            let liquid = this.liquids.pop();

            let result = this.bottomComponent.fill(this.name, liquid);

            if (!result) {
                console.error(this.name + " drain - failed");
                this.liquids.push(liquid);
            }

            this.draw();
        }
    }

    private drainCoil() {
        console.log(this.name + " drainCoil");

        if (this.coilLiquid != null) {

            let result = this.coilBottomComponent.fill(this.name, this.coilLiquid);

            if (result) {
                this.coilLiquid = null;
                clearTimeout(this.coilTimer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }
    }

    private getColor(): number {
        if (this.liquids.length > 0) {
            return this.liquids[0].type;
        } else {
            return 0xAAAAAA;
        }
    }
}

export default HotLiquorTank;
