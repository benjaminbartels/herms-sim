import * as PIXI from "pixi.js";
import * as tinycolor from "tinycolor2";
import { Liquid } from "./liquid";
import { LiquidType } from "./enums";
import { Port } from "./Port";
import { Component } from "./component";


export abstract class Tank extends PIXI.Container implements Component {
    protected _name: string;
    protected _topComponentPort: Port;
    protected _bottomComponentPort: Port;
    protected liquids: Liquid[];
    protected topComponent: Component;
    protected bottomComponent: Component;
    protected drainTimer: number;
    protected readonly lineColor = 0x111111;
    private readonly emptyColor = 0xAAAAAA;
    private readonly drainInterval = 1000;
    private waterCtr = 0;
    private wertCtr = 0;
    private sanitizerCtr = 0;
    private cleanerCtr = 0;

    constructor(name: string, x: number, y: number) {
        super();
        this._name = name;
        this.x = x;
        this.y = y;
        this.liquids = new Array<Liquid>();
        this._topComponentPort = new Port(x, y - 100);
        this._bottomComponentPort = new Port(x, y + 100);
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.5);
        this.addChild(t);
        let c = new PIXI.Text(this.liquids.length.toString(), new PIXI.TextStyle({ fontSize: 10 }));
        c.anchor.set(0.5, -1.0);
        this.addChild(c);
    }

    public get name(): string {
        return this._name;
    }

    public get topComponentPort(): Port {
        return this._topComponentPort;
    }

    public get bottomComponentPort(): Port {
        return this._bottomComponentPort;
    }

    public fill(source: Component, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        if (liquid == null) {
            console.log(this.name + " fill - null liquid");
            return true;
        }

        let result = false;

        if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            console.warn(this.name + " fill - Can't fill from the bottom port of MashTun.");
            result = false;
        } else if (this.topComponent != null && this.topComponent.name === source.name) {
            this.incrementLiquid(liquid.type);
            liquid.type = this.getLargestConcentration();
            this.liquids.push(liquid);
            result = true;
        }

        this.draw();
        return result;
    }

    public suck(source: Component): Liquid {
        console.log(this.name + " suck - source: " + source);

        let result = null;

        clearTimeout(this.drainTimer);
        if (this.topComponent != null && this.topComponent.name === source.name) {
            console.warn(this.name + " suck - Can't suck out of the top port of MashTun.");
        } else if (this.bottomComponent != null && this.bottomComponent.name === source.name) {
            if (this.liquids.length > 0) {
                result = this.liquids.pop();
                this.decrementLiquid(result.type);
            }
        }
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);

        this.draw();
        return result;
    }

    public connectToTop(component: Component) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public connectToBottom(component: Component) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }

    protected draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.beginFill(this.getColor());
        g.drawRect(-75, -100, 150, 200);
        g.endFill();
        this.children[0] = g;

        let c = <PIXI.Text>this.getChildAt(2);

        c.text = this.liquids.length.toString();
        this.children[2] = c;
    }



    protected drain() {
        console.log(this.name + " drain");

        if (this.liquids.length > 0) {

            let liquid = this.liquids.pop();
            this.decrementLiquid(liquid.type);
            let originalType = liquid.type;
            liquid.type = this.getLargestConcentration();
            let result = this.bottomComponent.fill(this, liquid);

            if (result) {
                clearTimeout(this.drainTimer);
            } else {
                liquid.type = originalType;
                this.incrementLiquid(liquid.type);
                this.liquids.push(liquid);
                console.warn(this.name + " drain - failed");
            }
            this.draw();
        }
    }

    protected getColor(): number {

        if (this.liquids != null && this.liquids.length > 0) {

            let total = 0;

            for (let i = 0; i < this.liquids.length; i++) {
                total = total + this.liquids[i].temperature;
            }

            let avg = total / this.liquids.length;

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

            return this.blend(type, hotColor, avg);

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

    protected incrementLiquid(type: LiquidType) {
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

    protected decrementLiquid(type: LiquidType) {
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
