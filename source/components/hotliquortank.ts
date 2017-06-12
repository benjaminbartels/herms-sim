import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Tank } from "./tank";

class HotLiquorTank extends Tank {

    public coilTopComponent: Component;
    public coilBottomComponent: Component;
    public coilTopComponentPort: Port;
    public coilBottomComponentPort: Port;

    public coilLiquid: Liquid;
    public temperature: number;
    private temperatureTimer: number;
    private coilTimer: number;
    private isOn: boolean;
    private readonly coilSize = 40;
    private readonly coilTopOffset = 25;
    private readonly coilBottomOffset = 25;
    private readonly drainCoilInterval = 1000;
    private readonly temperatureInterval = 1000;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.coilLiquid = null;
        this.temperature = 71;
        this.coilTopComponentPort = new Port(this.x + 75, this.y - 100 + this.coilTopOffset);
        this.coilBottomComponentPort = new Port(this.x + 75, this.y + 100 - this.coilBottomOffset);
        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        if ((this.topComponent != null && this.topComponent.name === source.name) ||
            (this.bottomComponent != null && this.bottomComponent.name === source.name)) {

            result = super.fill(source, liquid);

            // if (liquid == null) {
            //     console.log(this.name + " fill - null liquid");
            //     return true;
            // }

            // if (this.bottomComponent != null && this.bottomComponent.name === source) {
            //     console.error(this.name + " fill - Can't fill from the bottom port of HotLiquorTank.");
            //     result = false;
            // } else if (this.topComponent != null && this.topComponent.name === source) {
            //     this.liquids.push(liquid);
            //     result = true;

            // }

        } else if ((this.coilTopComponent != null && this.coilTopComponent.name === source.name) ||
            (this.coilBottomComponent != null && this.coilBottomComponent.name === source.name)) {

            clearTimeout(this.coilTimer);

            if (this.coilLiquid == null && liquid != null) {
                this.coilLiquid = liquid;
                result = true;
            } else {
                if (this.coilTopComponent != null && this.coilTopComponent.name === source.name) {
                    result = this.coilBottomComponent.fill(this, this.coilLiquid);
                } else if (this.coilBottomComponent != null && this.coilBottomComponent.name === source.name) {
                    result = this.coilTopComponent.fill(this, this.coilLiquid);
                }
                if (result) {
                    this.coilLiquid = liquid;
                }
            }

            this.coilTimer = setInterval(() => this.drainCoil(), this.drainCoilInterval);

        }
        this.draw();
        return result;
    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source);

        let returnLiquid = null;

        if ((this.topComponent != null && this.topComponent.name === source.name) ||
            (this.bottomComponent != null && this.bottomComponent.name === source.name)) {

            returnLiquid = super.suck(source);

            // clearTimeout(this.timer);

            // if (this.topComponent != null && this.topComponent.name === source) {
            //     console.warn(this.name + " suck - Can't suck out of the top port of HotLiquorTank.");
            // } else if (this.bottomComponent != null && this.bottomComponent.name === source) {
            //     if (this.liquids.length > 0) {
            //         returnLiquid = this.liquids.shift();
            //     }
            // }

            // this.timer = setInterval(() => this.drain(), 1000);

        } else if ((this.coilTopComponent != null && this.coilTopComponent.name === source.name) ||
            (this.coilBottomComponent != null && this.coilBottomComponent.name === source.name)) {

            returnLiquid = this.coilLiquid;

            if (this.coilTopComponent.name === source.name) {
                this.coilLiquid = this.coilBottomComponent.suck(this);
            } else if (this.coilBottomComponent.name === source.name) {
                this.coilLiquid = this.coilTopComponent.suck(this);
            }
        }
        this.draw();
        return returnLiquid;
    }

    public heatOn() {
        console.log(this.name + " heatOn");
        this.isOn = true;
        this.temperatureTimer = setInterval(() => this.applyHeat(), this.temperatureInterval);
    }

    public heatOff() {
        console.log(this.name + " heatOff");
        this.isOn = false;
        clearInterval(this.temperatureTimer);
    }

    public setTemperature(temperature: number) {
        this.temperature = temperature;
    }

    public connectToCoilTop(component: any) {
        this.coilTopComponent = component;
        return this.coilTopComponentPort;
    }

    public connectToCoilBottom(component: any) {
        this.coilBottomComponent = component;
        return this.coilBottomComponentPort;
    }

    protected draw() {
        super.draw();
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.beginFill(this.getColor());
        g.lineStyle(3, 0x666666);
        g.moveTo(75, -100 + this.coilTopOffset);
        g.lineTo(0, 0);
        g.lineTo(75, 100 - this.coilBottomOffset);
        g.drawCircle(0, 0, this.coilSize);
        g.endFill();
        this.children[0] = g;
    }

    private applyHeat() {

        for (let i = 0; i < this.liquids.length; i++) {
            let t = this.liquids[i].temperature;
            if (t < this.temperature) {
                t = t + 5;
                this.liquids[i].temperature = t;
            }
        }

        this.draw();
    }

    private drainCoil() {
        console.log(this.name + " drainCoil");

        if (this.coilLiquid != null) {

            let result = this.coilBottomComponent.fill(this, this.coilLiquid);

            if (result) {
                this.coilLiquid = null;
                clearTimeout(this.coilTimer);
            } else {
                console.error(this.name + " drain - failed");
            }
        }
    }
}

export default HotLiquorTank;
