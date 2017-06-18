import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./Port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class CounterFlowChiller extends Fixture {
    public wertInComponent: Component;
    public wertOutComponent: Component;
    public waterInComponent: Component;
    public waterOutComponent: Component;
    public wertInComponentPort: Port;
    public wertOutComponentPort: Port;
    public waterInComponentPort: Port;
    public waterOutComponentPort: Port;
    public waterLiquid: Liquid;
    private drainTimer: number;
    private waterDrainTimer: number;
    private readonly lineColor = 0x111111;
    private readonly drainInterval = 1000;
    private readonly waterDrainInterval = 1000;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.wertInComponentPort = new Port(this.x - 40, this.y + 20);
        this.wertOutComponentPort = new Port(this.x - 40, this.y - 20);
        this.waterInComponentPort = new Port(this.x + 40, this.y - 20);
        this.waterOutComponentPort = new Port(this.x + 40, this.y + 20);
        this.liquid = null;
        this.waterLiquid = null;
        this.addChild(new PIXI.Graphics);
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);
        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {

        let result = false;

        if ((this.wertInComponent != null && this.wertInComponent.name === source.name) ||
            (this.wertOutComponent != null && this.wertOutComponent.name === source.name)) {
            clearInterval(this.drainTimer);
            if (this.liquid == null && liquid != null) {
                this.liquid = liquid;
                result = true;
            } else {
                if (this.wertInComponent != null && this.wertInComponent.name === source.name) {
                    result = this.wertOutComponent.fill(this, this.liquid);
                } else if (this.wertOutComponent != null && this.wertOutComponent.name === source.name) {
                    result = this.wertInComponent.fill(this, this.liquid);
                }
                if (result) {
                    this.liquid = liquid;

                    if (this.waterLiquid != null && this.liquid != null
                        && this.waterLiquid.temperature < this.liquid.temperature) {
                        this.liquid.temperature--;
                    }
                }
            }
            this.drainTimer = setInterval(() => this.drain(), this.drainInterval); // ToDo: move drain to Fixture
        } else if ((this.waterInComponent != null && this.waterInComponent.name === source.name) ||

            (this.waterOutComponent != null && this.waterOutComponent.name === source.name)) {
            clearInterval(this.waterDrainTimer);
            if (this.waterLiquid == null && liquid != null) {
                this.waterLiquid = liquid;
                result = true;
            } else {
                if (this.waterInComponent != null && this.waterInComponent.name === source.name) {
                    result = this.waterOutComponent.fill(this, this.waterLiquid);
                } else if (this.waterOutComponent != null && this.waterOutComponent.name === source.name) {
                    result = this.waterInComponent.fill(this, this.waterLiquid);
                }
                if (result) {
                    this.waterLiquid = liquid;
                }
            }
            this.waterDrainTimer = setInterval(() => this.drainWater(), this.waterDrainInterval);
        }

        this.draw();
        return result;
    }

    public suck(source: Component): Liquid {

        let result = null;
        if ((this.wertInComponent != null && this.wertInComponent.name === source.name) ||
            (this.wertOutComponent != null && this.wertOutComponent.name === source.name)) {

            result = this.liquid;
            if (this.wertInComponent.name === source.name) {
                this.liquid = this.wertOutComponent.suck(this);
            } else if (this.wertOutComponent.name === source.name) {
                this.liquid = this.wertInComponent.suck(this);
            }

            if (this.waterLiquid != null && this.liquid != null
                && this.waterLiquid.temperature < this.liquid.temperature) {
                this.liquid.temperature--;
            }

        } else if ((this.waterInComponent != null && this.waterInComponent.name === source.name) ||
            (this.waterOutComponent != null && this.waterOutComponent.name === source.name)) {

            result = this.waterLiquid;
            if (this.waterInComponent.name === source.name) {
                this.waterLiquid = this.waterOutComponent.suck(this);
            } else if (this.waterOutComponent.name === source.name) {
                this.waterLiquid = this.waterInComponent.suck(this);
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

    private drain() {
        console.log(this.name + " drain");

        if (this.liquid != null) {

            let result = this.wertOutComponent.fill(this, this.liquid);

            if (result) {
                this.liquid = null;
                clearInterval(this.drainTimer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }

        clearInterval(this.drainTimer);
    }

    private drainWater() {
        console.log(this.name + " drainWater");

        if (this.waterLiquid != null) {

            let result = this.waterOutComponent.fill(this, this.waterLiquid);

            if (result) {
                this.waterLiquid = null;
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }

        clearInterval(this.waterDrainTimer);
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawRect(-45, -20, 90, 5);
        g.drawRect(-45, -10, 90, 5);
        g.drawRect(-45, 0, 90, 5);
        g.drawRect(-45, 10, 90, 5);
        g.beginFill(this.getWaterColor());
        g.drawRect(-45, -15, 90, 5);
        g.drawRect(-45, -5, 90, 5);
        g.drawRect(-45, 5, 90, 5);
        g.drawRect(-45, 15, 90, 5);
        g.endFill();
        this.children[0] = g;
    }

    private getWaterColor(): number {
        if (this.waterLiquid != null) {
            return this.waterLiquid.getColor();
        } else {
            return this.emptyColor;
        }
    }

}

export default CounterFlowChiller;
