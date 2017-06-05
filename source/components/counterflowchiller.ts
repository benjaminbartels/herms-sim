import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";

class CounterFlowChiller {
    public name: string;
    public position: [number, number];
    public wertInComponent: any;
    public wertOutComponent: any;
    public waterInComponent: any;
    public waterOutComponent: any;
    public wertInComponentPort: [number, number];
    public wertOutComponentPort: [number, number];
    public waterInComponentPort: [number, number];
    public waterOutComponentPort: [number, number];
    public wertLiquid: Liquid;
    public waterLiquid: Liquid;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private timer: number;
    private readonly lineColor = 0x111111;      // Green
    private readonly height = 40;
    private readonly width = 90;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.wertInComponentPort = [this.position[0] - (this.width / 2), this.position[1] + (this.height / 2)];
        this.wertOutComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2)];
        this.waterInComponentPort = [this.position[0] + (this.width / 2), this.position[1] - (this.height / 2)];
        this.waterOutComponentPort = [this.position[0] + (this.width / 2), this.position[1] + (this.height / 2)];
        this.wertLiquid = null;
        this.waterLiquid = null;
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
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.beginFill(this.getWertColor());
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        clearTimeout(this.timer);

        if ((this.wertInComponent != null && this.wertInComponent.name === source) ||
            (this.wertOutComponent != null && this.wertOutComponent.name === source)) {

            if (this.wertLiquid == null && liquid != null) {
                this.wertLiquid = liquid;
                result = true;
            } else {
                if (this.wertInComponent != null && this.wertInComponent.name === source) {
                    result = this.wertOutComponent.fill(this.name, this.wertLiquid);
                } else if (this.wertOutComponent != null && this.wertOutComponent.name === source) {
                    result = this.wertInComponent.fill(this.name, this.wertLiquid);
                }
                if (result) {
                    this.wertLiquid = liquid;
                }
            }
        } else if ((this.waterInComponent != null && this.waterInComponent.name === source) ||
            (this.waterOutComponent != null && this.waterOutComponent.name === source)) {

            if (this.waterLiquid == null && liquid != null) {
                this.waterLiquid = liquid;
                result = true;
            } else {
                if (this.waterInComponent != null && this.waterInComponent.name === source) {
                    result = this.waterOutComponent.fill(this.name, this.waterLiquid);
                } else if (this.waterOutComponent != null && this.waterOutComponent.name === source) {
                    result = this.waterInComponent.fill(this.name, this.waterLiquid);
                }
                if (result) {
                    this.waterLiquid = liquid;
                }
            }
        }

        this.draw();
        this.timer = setInterval(() => this.drain(), 1000);
        return result;
    }

    public suck(source: any): Liquid {
        console.log(this.name + " suck - source: " + source);


        let result = null;
        if ((this.wertInComponent != null && this.wertInComponent.name === source) ||
            (this.wertOutComponent != null && this.wertOutComponent.name === source)) {

            result = this.wertLiquid;
            if (this.wertInComponent.name === source) {
                this.wertLiquid = this.wertOutComponent.suck(this.name);
            } else if (this.wertOutComponent.name === source) {
                this.wertLiquid = this.wertInComponent.suck(this.name);
            }


        } else if ((this.waterInComponent != null && this.waterInComponent.name === source) ||
            (this.waterOutComponent != null && this.waterOutComponent.name === source)) {

            result = this.waterLiquid;
            if (this.waterInComponent.name === source) {
                this.waterLiquid = this.waterOutComponent.suck(this.name);
            } else if (this.waterOutComponent.name === source) {
                this.waterLiquid = this.waterInComponent.suck(this.name);
            }
        }

        this.draw();
        return result;
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

    private getWertColor(): number {
        if (this.wertLiquid != null) {
            return this.wertLiquid.type;
        } else {
            return 0xAAAAAA;
        }
    }

    // private getWaterColor(): number {
    //     if (this.waterLiquid != null) {
    //         return this.waterLiquid.type;
    //     } else {
    //         return 0xAAAAAA;
    //     }
    // }

    private drain() {
        console.log(this.name + " drain");

        if (this.wertLiquid != null) {

            let result = this.wertOutComponent.fill(this.name, this.wertLiquid);

            if (result) {
                this.wertLiquid = null;
                clearTimeout(this.timer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }


        if (this.waterLiquid != null) {

            let result = this.waterOutComponent.fill(this.name, this.waterLiquid);

            if (result) {
                this.waterLiquid = null;
                clearTimeout(this.timer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }
    }
}

export default CounterFlowChiller;
