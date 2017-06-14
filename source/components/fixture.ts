import { Liquid } from "./liquid";
import { Orientation } from "./enums";
import { Component } from "./component";
import * as PIXI from "pixi.js";

export abstract class Fixture extends PIXI.Container implements Component {
    protected _name: string;
    protected liquid: Liquid;
    protected orientation: Orientation;
    protected readonly emptyColor = 0xAAAAAA;

    constructor(name: string, x?: number, y?: number, orientation?: Orientation) {
        super();
        this._name = name;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.liquid = null;
    }

    public get name(): string {
        return this._name;
    }

    public abstract fill(source: Component, liquid: Liquid): boolean;
    public abstract suck(source: Component): Liquid;

    public getTemperature(): number {
        if (this.liquid != null) {
            return this.liquid.temperature;
        } else {
            return null;
        }
    }

    protected getColor(): number {
        if (this.liquid != null) {
            return this.liquid.getColor();
        } else {
            return this.emptyColor;
        }
    }
}
