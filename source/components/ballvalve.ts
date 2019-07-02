import * as PIXI from "pixi.js";
import { Orientation } from "./enums";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class BallValve extends Fixture {
    private isMotorized: boolean;
    private componentA: Component;
    private componentB: Component;
    private componentAPort: Port;
    private componentBPort: Port;
    private isOpen: boolean;
    private drainTimer: number;
    private readonly openColor = 0x2ECC40;      // Green
    private readonly closedColor = 0x85144b;    // Maroon
    private readonly unpoweredColor = 0x001F3F; // Navy
    private readonly poweredColor = 0xFFDC00;   // Yellow
    private readonly drainInterval = 1000;

    constructor(name: string, x: number, y: number, orientation: Orientation, isMotorized: boolean) {
        super(name, x, y, orientation);
        this.isMotorized = isMotorized;
        this.liquid = null;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);

        if (!isMotorized) {
            this.interactive = true;
            this.buttonMode = true;
            this.on("pointerdown", () => { this.toggle(); });
        }

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.componentAPort = new Port(x - 20, y);
                this.componentBPort = new Port(x + 20, y);
                break;
            case Orientation.TopToBottom:
                this.componentAPort = new Port(x, y - 20);
                this.componentBPort = new Port(x, y + 20);
                break;
            case Orientation.RightToLeft:
                this.componentAPort = new Port(x + 20, y);
                this.componentBPort = new Port(x - 20, y);
                break;
            case Orientation.BottomToTop:
                this.componentAPort = new Port(x, y + 20);
                this.componentBPort = new Port(x, y - 20);
                break;
        }

        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {

        let result = false;

        if (this.isOpen) {

            clearInterval(this.drainTimer);

            if (this.liquid == null && liquid != null) {
                this.liquid = liquid;
                result = true;
            } else {
                result = false;
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
        }

        return result;
    }

    public suck(source: Component): Liquid {

        let returnLiquid = null;

        if (this.isOpen) {

            returnLiquid = this.liquid;

            if (this.componentA.name === source.name) {
                this.liquid = this.componentB.suck(this);
            } else if (this.componentB.name === source.name) {
                this.liquid = this.componentA.suck(this);
            }
            this.draw();
        }

        return returnLiquid;
    }

    public connectToA(component: Component) {
        this.componentA = component;
        return this.componentAPort;
    }

    public connectToB(component: Component) {
        this.componentB = component;
        return this.componentBPort;
    }

    public toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    public open() {
        console.log(this.name + " open");

        if (!this.isOpen) {
            this.isOpen = true;
            this.draw();
        }
    }

    public close() {
        console.log(this.name + " close");

        if (this.isOpen) {
            this.isOpen = false;
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
                console.warn(this.name + " drain - failed");
            }
        }

        clearInterval(this.drainTimer);
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();

        if (this.isOpen) {
            if (this.isMotorized) {
                g.lineStyle(1, this.poweredColor);
            } else {
                g.lineStyle(1, this.openColor);
            }
        } else {
            if (this.isMotorized) {
                g.lineStyle(1, this.unpoweredColor);
            } else {
                g.lineStyle(1, this.closedColor);
            }
        }
        g.beginFill(this.getColor());
        g.moveTo(0, 0);
        g.lineTo(-20, -10);
        g.lineTo(-20, 10);  // ToDo: make private vars
        g.lineTo(0, 0);
        g.lineTo(20, 10);
        g.lineTo(20, -10);
        g.lineTo(0, 0);
        g.drawCircle(0, 0, 7);
        g.endFill();
        if (this.orientation === Orientation.TopToBottom || this.orientation === Orientation.BottomToTop) {
            g.rotation = 1.5708;
        }
        this.children[0] = g;
    }

}

export default BallValve;
