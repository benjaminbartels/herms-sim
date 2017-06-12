import * as PIXI from "pixi.js";
import { Orientation, LiquidType } from "./enums";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class Faucet extends Fixture {
    private component: Component;
    private port: Port;
    private isOn: boolean;
    private timer: number;
    private count = 0;
    private readonly size = 20;
    private readonly lineColor = 0x111111;
    private readonly temperature = 23;
    private readonly interval = 100;

    constructor(name: string, x: number, y: number, orientation: Orientation) {
        super(name, x, y, orientation);
        this.isOn = false;
        this.count = 0;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);
        let c = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        c.anchor.set(0.5, -0.5);
        this.addChild(c);

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.port = new Port(x + this.size, y);
                break;
            case Orientation.TopToBottom:
                this.port = new Port(x, y + this.size);
                break;
            case Orientation.RightToLeft:
                this.port = new Port(x - this.size, y);
                break;
            case Orientation.BottomToTop:
                this.port = new Port(x, y - this.size);
                break;
        }

        this.timer = setInterval(() => this.fire(), this.interval);
        this.draw();
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.warn(this.name + " fill - Can't fill a faucet.");
        return false;
    }

    public suck(source: Component): Liquid {
        console.warn(this.name + " suck - Can't suck a faucet.");
        return null;
    }

    public connect(component: Component): Port {
        this.component = component;
        return this.port;
    }

    private fire() {
        let id = this.count + 1;
        this.liquid = new Liquid(id, LiquidType.Water, this.temperature);
        let result = this.component.fill(this, this.liquid);
        if (result) {
            this.count = id;
            this.draw();
        }
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawCircle(0, 0, this.size);
        g.endFill();
        this.children[0] = g;

        let c = <PIXI.Text>this.getChildAt(2);
        c.text = this.count.toString();
        this.children[2] = c;
    }

} export default Faucet;
