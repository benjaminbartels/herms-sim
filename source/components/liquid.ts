import { LiquidType } from "./enums";
import * as tinycolor from "tinycolor2";

export class Liquid {
    public id: number;
    public type: LiquidType;
    public temperature: number;

    constructor(id: number, type: LiquidType, temperature: number) {
        this.id = id;
        this.type = type;
        this.temperature = temperature;
    }

    public getColor(): number {

        let hotColor = 0;

        switch (this.type) {

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

        return this.blend(this.type, hotColor, this.temperature);
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

        return parseInt(tinycolor(rgba).toHex().replace(/^#/, ""), 16);
    }
}

