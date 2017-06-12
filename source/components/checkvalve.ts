import * as PIXI from "pixi.js";
import { Orientation } from "./enums";
import { Liquid } from "./liquid";
import { Port } from "./Port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class CheckValve extends Fixture {
    public inComponent: Component;
    public outComponent: Component;
    public inComponentPort: Port;
    public outComponentPort: Port;
    private readonly lineColor = 0x111111;
    private drainTimer: number;
    private readonly drainInterval = 100;

    constructor(name: string, x: number, y: number, orientation: Orientation) {
        super(name, x, y, orientation);
        this.liquid = null;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.inComponentPort = new Port(x - 10, y);
                this.outComponentPort = new Port(x + 10, y);
                break;
            case Orientation.TopToBottom:
                this.inComponentPort = new Port(x, y - 10);
                this.outComponentPort = new Port(x, y + 10);
                break;
            case Orientation.RightToLeft:
                this.inComponentPort = new Port(x + 10, y);
                this.outComponentPort = new Port(x - 10, y);
                break;
            case Orientation.BottomToTop:
                this.inComponentPort = new Port(x, y + 10);
                this.outComponentPort = new Port(x, y - 10);
                break;
        }

        this.draw();
    }



    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " suck - source: " + source.name);

        if (this.outComponent != null && source.name === this.outComponent.name) {
            console.warn(this.name + " fill - Can't fill into the out port of check valve.");
            return false;
        }

        let result = false;

        clearTimeout(this.drainTimer);

        if (this.liquid == null && liquid != null) {
            this.liquid = liquid;
            result = true;
        } else {
            result = false;
            if (this.outComponent != null) {
                result = this.outComponent.fill(this, this.liquid);
            }

            if (result) {
                this.liquid = liquid;
            }
        }
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);
        this.draw();
        return result;

    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source.name);

        if (this.inComponent != null && source.name === this.inComponent.name) {
            console.warn(this.name + " suck - Can't suck out of the in port of check valve.");
            return null;
        }

        let returnLiquid = this.liquid;
        if (this.inComponent != null) {
            this.liquid = this.inComponent.suck(this);
        }
        this.draw();
        return returnLiquid;
    }

    public connectToIn(component: any) {
        this.inComponent = component;
        return this.inComponentPort;
    }

    public connectToOut(component: any) {
        this.outComponent = component;
        return this.outComponentPort;
    }

    private drain() {
        console.log(this.name + " drain");

        if (this.liquid != null) {
            let result = this.outComponent.fill(this, this.liquid);

            if (result) {
                this.liquid = null;
                clearTimeout(this.drainTimer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.beginFill(this.getColor());
        g.lineStyle(1, this.lineColor);
        g.moveTo(-10, -10);
        g.lineTo(10, 0);
        g.lineTo(-10, 10);
        g.lineTo(-10, -10);
        g.moveTo(10, 10);
        g.lineTo(10, -10);
        g.endFill();
        if (this.orientation === Orientation.TopToBottom) {
            g.rotation = 1.5708;
        } else if (this.orientation === Orientation.RightToLeft) {
            g.rotation = 3.1416;
        } else if (this.orientation === Orientation.BottomToTop) {
            g.rotation = 4.7124;
        }
        this.children[0] = g;
    }
}

export default CheckValve;
