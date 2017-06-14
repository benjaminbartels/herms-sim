import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./Port";
import { Component } from "./component";
import Vessel from "./vessel";

// mashtun
export class Tank extends Vessel {
    protected _bottomComponentPort: Port;
    protected bottomComponent: Component;
    protected drainTimer: number;
    private readonly drainInterval = 1000;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this._topComponentPort = new Port(x, y - 100);
        this._bottomComponentPort = new Port(x, y + 100);
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);
        this.draw();
    }

    public get bottomComponentPort(): Port {
        return this._bottomComponentPort;
    }

    public connectToBottom(component: Component) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill (tank) - source: " + source.name);

        if (liquid == null) {
            console.log(this.name + " fill - null liquid");
            return true;
        }

        let result = false;

        if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            console.warn(this.name + " fill - Can't fill from the bottom port of Tank.");
            result = false;
        } else if (this.topComponent != null && this.topComponent.name === source.name) {
            this.addLiquid(liquid, 1);
            result = true;
        }

        this.draw();
        return result;
    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source.name);

        let result = null;

        clearTimeout(this.drainTimer);
        if (this.topComponent != null && this.topComponent.name === source.name) {
            console.warn(this.name + " suck - Can't suck out of the top port of Tank.");
        } else if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            if (this.liquids.length > 0) {
                result = this.liquids.pop();
                this.decrementLiquidCount(result.type);
            }
        }
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);

        this.draw();
        return result;
    }

    protected draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawRect(-75, -100, 150, 200);
        g.endFill();
        this.children[0] = g;

        let c = <PIXI.Text>this.getChildAt(2);
        c.text = this.liquids.length.toString();
        this.children[2] = c;
    }

    protected drain() {
        console.log(this.name + " drain" + this.liquids.length.toString());

        if (this.liquids.length > 0) {

            let liquid = this.liquids.pop();
            this.decrementLiquidCount(liquid.type);
            let originalType = liquid.type;
            liquid.type = this.getLargestConcentration();
            let result = this.bottomComponent.fill(this, liquid);

            if (result) {
                clearTimeout(this.drainTimer);
            } else {
                liquid.type = originalType;
                this.incrementLiquidCount(liquid.type);
                this.liquids.push(liquid);
                console.warn(this.name + " drain - failed");
            }
            this.draw();
        }
    }
}
export default Tank;
