import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./Port";
import { Component } from "./component";
import Vessel from "./vessel";
import { LiquidType } from "./enums";

// mashtun
export class Tank extends Vessel {
    protected _bottomComponentPort: Port;
    protected bottomComponent: Component;
    protected drainTimer: number;
    private readonly drainInterval = 1000;
    private readonly grainColor = 0x954535;
    private hasGrains = false;


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

        if (liquid == null) {
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

        let result = null;

        clearTimeout(this.drainTimer);
        if (this.topComponent != null && this.topComponent.name === source.name) {
            console.warn(this.name + " suck - Can't suck out of the top port of Tank.");
        } else if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            if (this.liquids.length > 0) {
                let type = this.getLargestConcentration();
                result = this.liquids.shift();
                this.decrementLiquidCount(result.type);
                result.type = type;
            }
        }
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);

        this.draw();
        return result;
    }

    public addGrains() {
        this.hasGrains = true;
        this.draw();
    }

    public dumpGrains() {
        this.hasGrains = false;
        this.draw();
    }

    public addLiquid(liquid: Liquid, amount: number) {
        if (this.hasGrains) {
            if (liquid.type === LiquidType.Water) {
                liquid.type = LiquidType.Wert;
            }
        }

        for (let i = 0; i < amount; i++) {
            this.incrementLiquidCount(liquid.type);
            this.liquids.push(liquid);
        }

        this.draw();
    }

    protected draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawRect(-75, -100, 150, 200);
        g.endFill();

        if (this.hasGrains) {
            g.beginFill(this.grainColor);
            g.drawRect(-70, 20, 140, 75);
            g.endFill();
        }

        this.children[0] = g;

        let c = <PIXI.Text>this.getChildAt(2);
        c.text = this.liquids.length.toString();
        this.children[2] = c;
    }

    protected drain() {
        if (this.liquids.length > 0) {

            let type = this.getLargestConcentration();
            let liquid = this.liquids.shift();
            this.decrementLiquidCount(liquid.type);
            let originalType = liquid.type;
            liquid.type = type;

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
