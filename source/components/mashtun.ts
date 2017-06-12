import { Tank } from "./tank";
import { Component } from "./component";
import { Liquid } from "./liquid";
import { LiquidType } from "./enums";

class MashTun extends Tank {

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.draw();
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
            liquid.type = LiquidType.Wert;
            this.incrementLiquid(liquid.type);
            this.liquids.push(liquid);
            result = true;
        }

        this.draw();
        return result;
    }
}


export default MashTun;
