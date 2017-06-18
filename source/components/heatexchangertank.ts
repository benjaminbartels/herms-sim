import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { HeatedTank } from "./heatedtank";

// HotLiquorTank
export class HeatExchangerTank extends HeatedTank {

    public coilTopComponent: Component;
    public coilBottomComponent: Component;
    public coilTopComponentPort: Port;
    public coilBottomComponentPort: Port;

    public coilLiquid: Liquid;
    private coilTimer: number;
    private readonly coilSize = 40;
    private readonly coilTopOffset = 25;
    private readonly coilBottomOffset = 25;
    private readonly drainCoilInterval = 1000;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.coilLiquid = null;
        this.coilTopComponentPort = new Port(this.x + 75, this.y - 100 + this.coilTopOffset);
        this.coilBottomComponentPort = new Port(this.x + 75, this.y + 100 - this.coilBottomOffset);
        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {

        let result = false;

        if ((this.topComponent != null && this.topComponent.name === source.name) ||
            (this.bottomComponent != null && this.bottomComponent.name === source.name)) {

            result = super.fill(source, liquid);

        } else if ((this.coilTopComponent != null && this.coilTopComponent.name === source.name) ||
            (this.coilBottomComponent != null && this.coilBottomComponent.name === source.name)) {

            clearInterval(this.coilTimer);

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

                    if (this.coilLiquid != null && this.liquids.length > 0
                        && this.coilLiquid.temperature < this.getTemperature()) {
                        this.coilLiquid.temperature--;
                    }

                }
            }

            this.coilTimer = setInterval(() => this.drainCoil(), this.drainCoilInterval);

        }
        this.draw();
        return result;
    }

    public suck(source: Component): Liquid {


        let returnLiquid = null;

        if ((this.topComponent != null && this.topComponent.name === source.name) ||
            (this.bottomComponent != null && this.bottomComponent.name === source.name)) {

            returnLiquid = super.suck(source);

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

    private drainCoil() {
        console.log(this.name + " drainCoil");

        if (this.coilLiquid != null) {

            let result = this.coilBottomComponent.fill(this, this.coilLiquid);

            if (result) {
                this.coilLiquid = null;
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }

        clearInterval(this.coilTimer);
    }
}
export default HeatExchangerTank;
