import * as PIXI from "pixi.js";
import * as tinycolor from "tinycolor2";
import { Liquid } from "./liquid";
import { LiquidType } from "./enums";
import { Port } from "./port";
import { Component } from "./component";

class Vessel extends PIXI.Container implements Component {
    private _name: string;
    private liquids: Liquid[];
    private component: Component;
    private port: Port;
    private readonly lineColor = 0x111111;
    private readonly emptyColor = 0xAAAAAA;

    constructor(name: string, x: number, y: number) {
        super();
        this._name = name;
        this.x = x;
        this.y = y;
        this.liquids = new Array<Liquid>();
        this.port = new Port(x, y - 50);
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);
        let c = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        c.anchor.set(0.5, -0.5);
        this.addChild(c);

        this.draw();
    }

    public get name(): string {
        return this._name;
    }

    public connect(component: Component) {
        this.component = component;
        return this.port;
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        if (liquid == null) {
            console.log(this.name + " fill - null liquid");
            return true;
        }

        this.liquids.push(liquid);
        this.draw();
        return true;
    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source);

        let result = null;

        if (this.liquids.length > 0) {
            result = this.liquids.pop();
        }

        this.draw();
        return result;
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawRect(-35, -50, 70, 100);
        g.endFill();
        this.children[0] = g;

        let c = <PIXI.Text>this.getChildAt(2);

        c.text = this.liquids.length.toString();
        this.children[2] = c;
    }

    private getColor(): number {
        if (this.liquids != null && this.liquids.length > 0) {

            let total = 0;
            for (let i = 0; i < this.liquids.length; i++) {
                total = total + this.liquids[i].temperature;
            }
            let avg = total / this.liquids.length;

            let hotColor = 0;

            switch (this.liquids[0].type) { // ToDo: fix this...

                case LiquidType.Water:
                    hotColor = 0xA8A8FF;
                    break;
                case LiquidType.Wert:
                    hotColor = 0xFFFF00;
                    break;
                case LiquidType.Sanitizer:
                    hotColor = 0xFFCCFF;
                    break;
                case LiquidType.Cleaner:
                    hotColor = 0xCCFF33;
                    break;
            }

            return this.blend(this.liquids[0].type, hotColor, avg);

        } else {
            return this.emptyColor;
        }
    }

    private blend(color1: number, color2: number, amount: number): number {

        let oldMin = 0;
        let oldMax = 100;
        let newMin = 7;
        let newMax = 100;

        let oldRange = (oldMax - oldMin);
        let newRange = (newMax - newMin);

        amount = (((amount - oldMin) * newRange) / oldRange) + newMin;

        let rgb1 = tinycolor(color1.toString(16)).toRgb();
        let rgb2 = tinycolor(color2.toString(16)).toRgb();

        amount = amount / 100;

        let rgba = {
            a: ((rgb2.a - rgb1.a) * amount) + rgb1.a,
            b: ((rgb2.b - rgb1.b) * amount) + rgb1.b,
            g: ((rgb2.g - rgb1.g) * amount) + rgb1.g,
            r: ((rgb2.r - rgb1.r) * amount) + rgb1.r,
        };

        let c = tinycolor(rgba).toHex();

        return parseInt(c.replace(/^#/, ""), 16);

    }
}

export default Vessel;
