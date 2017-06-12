import * as PIXI from "pixi.js";
import { Orientation } from "./enums";
import { Liquid } from "./liquid";
import { Port } from "./port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class Drain extends Fixture {
    private component: Component;
    private port: Port;
    private count = 0;
    private readonly size = 20;
    private readonly lineColor = 0x111111;

    constructor(name: string, x: number, y: number, orientation: Orientation) {
        super(name, x, y, orientation);
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
                this.port = new Port(this.x - this.size, this.y);
                break;
            case Orientation.TopToBottom:
                this.port = new Port(this.x, this.y - this.size);
                break;
            case Orientation.RightToLeft:
                this.port = new Port(this.x + this.size, this.y);
                break;
            case Orientation.BottomToTop:
                this.port = new Port(this.x, this.y + this.size);
                break;
        }
        this.draw();
    }

    public connect(component: Component) {
        this.component = component;
        return this.port;
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source.name);
        this.count++;
        this.draw();
        return true;
    }

    public suck(source: Component): Liquid {
        console.warn(this.name + " suck - Can't suck a drain.");
        return null;
    }

    public draw() {
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
}

export default Drain;
