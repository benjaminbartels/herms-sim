import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class Tube extends Fixture {
    private componentA: Component;
    private componentB: Component;
    private componentAPort: Port;
    private componentBPort: Port;
    private drainTimer: number;
    private readonly drainInterval = 1000;


    constructor(name: string) {
        super(name);
        this.liquid = null;
        this.x = 0;
        this.y = 0;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);
    }

    public fill(source: Component, liquid: Liquid): boolean {
        let result = false;

        clearInterval(this.drainTimer);

        if (this.liquid == null && liquid != null) {
            this.liquid = liquid;
            result = true;
        } else {
            if (this.componentA != null && this.componentA.name === source.name) {
                result = this.componentB.fill(this, this.liquid);
            } else if (this.componentB != null && this.componentB.name === source.name) {
                result = this.componentA.fill(this, this.liquid);
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

        let returnLiquid = this.liquid;

        if (this.componentA.name === source.name) {
            this.liquid = this.componentB.suck(this);
        } else if (this.componentB.name === source.name) {
            this.liquid = this.componentA.suck(this);
        }

        this.draw();
        return returnLiquid;
    }

    public connectToA(component: Component, port: Port) {
        this.componentA = component;
        this.componentAPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    public connectToB(component: Component, port: Port) {
        this.componentB = component;
        this.componentBPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    private drain() {
        console.log(this.name + " drain");

        if (this.liquid != null) {
            let result = this.componentB.fill(this, this.liquid);

            if (!result) {
                result = this.componentA.fill(this, this.liquid);
            }

            if (result) {
                this.liquid = null;
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }

        clearInterval(this.drainTimer);
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(3, this.getColor());
        g.moveTo(this.componentAPort.x, this.componentAPort.y);
        g.lineTo(this.componentBPort.x, this.componentBPort.y);
        this.children[0] = g;

        let t = <PIXI.Text>this.getChildAt(1);
        t.x = (this.componentAPort.x + this.componentBPort.x) / 2;
        t.y = (this.componentAPort.y + this.componentBPort.y) / 2;
        this.children[1] = t;
    }

} export default Tube;
