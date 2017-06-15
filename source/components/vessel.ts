import * as PIXI from "pixi.js";
import * as tinycolor from "tinycolor2";
import { Liquid } from "./liquid";
import { LiquidType } from "./enums";
import { Port } from "./port";
import { Component } from "./component";

// bucket, fermenter
class Vessel extends PIXI.Container implements Component {
    protected _name: string;
    protected _topComponentPort: Port;
    protected topComponent: Component;
    protected liquids: Liquid[];
    protected waterCtr = 0;
    protected wertCtr = 0;
    protected sanitizerCtr = 0;
    protected cleanerCtr = 0;
    protected readonly lineColor = 0x111111;
    protected readonly emptyColor = 0xAAAAAA;

    constructor(name: string, x: number, y: number) {
        super();
        this._name = name;
        this.x = x;
        this.y = y;
        this.liquids = new Array<Liquid>();
        this._topComponentPort = new Port(x, y - 50);
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

    public get topComponentPort(): Port {
        return this._topComponentPort;
    }

    public connectToTop(component: Component) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public fill(source: Component, liquid: Liquid): boolean {
        if (liquid == null) {
            return true;
        }

        this.addLiquid(liquid, 1);

        this.draw();
        return true;
    }

    public suck(source: Component): Liquid {

        let result = null;

        if (this.liquids.length > 0) {
            result = this.liquids.shift();
            this.decrementLiquidCount(result.type);
        }

        this.draw();
        return result;
    }

    public getTemperature(): number {
        if (this.liquids != null && this.liquids.length > 0) {

            let total = 0;


            for (let i = 0; i < this.liquids.length; i++) {

                total = total + this.liquids[i].temperature;

            }


            let avg = total / this.liquids.length;

            return avg;

        } else {
            return null;
        }
    }

    public addLiquid(liquid: Liquid, amount: number) {

        for (let i = 0; i < amount; i++) {
            this.incrementLiquidCount(liquid.type);
            this.liquids.push(liquid);
        }

        this.draw();
    }

    protected draw() {
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

    protected getColor(): number {

        let temperature = this.getTemperature();

        if (temperature > 0) {

            let type = this.getLargestConcentration();

            let hotColor = 0;

            switch (type) {

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
            return this.blend(type, hotColor, temperature);

        } else {
            return this.emptyColor;
        }

    }

    protected blend(color1: number, color2: number, amount: number): number {

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

    protected getLargestConcentration(): LiquidType {

        if (this.waterCtr === 0 &&
            this.wertCtr === 0 &&
            this.sanitizerCtr === 0 &&
            this.cleanerCtr === 0) {
            return null;
        }

        let result = LiquidType.Water;
        let most = this.waterCtr;

        if (this.wertCtr > most) {
            result = LiquidType.Wert;
            most = this.wertCtr;
        } else if (this.sanitizerCtr > most) {
            result = LiquidType.Sanitizer;
            most = this.sanitizerCtr;
        } else if (this.cleanerCtr > most) {
            result = LiquidType.Cleaner;
        }

        return result;
    }

    protected incrementLiquidCount(type: LiquidType) {
        switch (type) {

            case LiquidType.Water:
                this.waterCtr++;
                break;
            case LiquidType.Wert:
                this.wertCtr++;
                break;
            case LiquidType.Sanitizer:
                this.sanitizerCtr++;
                break;
            case LiquidType.Cleaner:
                this.cleanerCtr++;
                break;
        }
    }

    protected decrementLiquidCount(type: LiquidType) {
        switch (type) {

            case LiquidType.Water:
                this.waterCtr--;
                break;
            case LiquidType.Wert:
                this.wertCtr--;
                break;
            case LiquidType.Sanitizer:
                this.sanitizerCtr--;
                break;
            case LiquidType.Cleaner:
                this.cleanerCtr--;
                break;
        }
    }
}
export default Vessel;
