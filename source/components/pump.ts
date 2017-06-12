import * as PIXI from "pixi.js";
import { Orientation } from "./enums";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class Pump extends Fixture {
    private inComponent: Component;
    private outComponent: Component;
    private inPort: Port;
    private outPort: Port;
    private isOn: boolean;
    private timer: number;
    private readonly unpoweredColor = 0x001F3F; // Navy
    private readonly poweredColor = 0xFFDC00;   // Yellow
    private readonly timerInterval = 100;
    private readonly size = 20;

    constructor(name: string, x: number, y: number, orientation: Orientation) {
        super(name, x, y, orientation);
        this.liquid = null;
        this.isOn = false;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.inPort = new Port(x - this.size, y);
                this.outPort = new Port(x + this.size, y);
                break;
            case Orientation.TopToBottom:
                this.inPort = new Port(x, y - this.size);
                this.outPort = new Port(x, y + this.size);
                break;
            case Orientation.RightToLeft:
                this.inPort = new Port(x + this.size, y);
                this.outPort = new Port(x - this.size, y);
                break;
            case Orientation.BottomToTop:
                this.inPort = new Port(x, y + this.size);
                this.outPort = new Port(x, y - this.size);
                break;
        }

        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);
        return false;
    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source);
        return null;
    }

    public connectToIn(component: any) {
        this.inComponent = component;
        return this.inPort;
    }

    public connectToOut(component: any) {
        this.outComponent = component;
        return this.outPort;
    }

    public turnOn() {
        console.log(this.name + " on");
        if (!this.isOn) {
            this.isOn = true;
            this.timer = setInterval(() => this.fire(), this.timerInterval);
            this.draw();
        }
    }

    public turnOff() {
        console.log(this.name + " off");
        if (this.isOn) {
            this.isOn = false;
            clearInterval(this.timer);
            this.draw();
        }
    }

    private fire() {
        let didFill = this.outComponent.fill(this, this.liquid);

        if (didFill) {
            this.liquid = this.inComponent.suck(this);
            this.draw();
        }
    }

    private draw() {

        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();

        if (this.isOn) {
            g.lineStyle(1, this.poweredColor);
        } else {
            g.lineStyle(1, this.unpoweredColor);
        }
        g.beginFill(this.getColor());
        g.drawCircle(0, 0, this.size);
        g.moveTo(-10, -15);
        g.lineTo(20, 0);
        g.lineTo(-10, 15);
        g.pivot = new PIXI.Point(0, 0);

        if (this.orientation === Orientation.TopToBottom) {
            g.rotation = 1.5708;
        } else if (this.orientation === Orientation.RightToLeft) {
            g.rotation = 3.1416;
        } else if (this.orientation === Orientation.BottomToTop) {
            g.rotation = 4.7124;
        }
    }

}
export default Pump;
