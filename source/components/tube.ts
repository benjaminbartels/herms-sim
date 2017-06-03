import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";

class Tube {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private timer: number;

    constructor(name: string, app: PIXI.Application) {
        this.name = name;
        this.liquid = null;
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        app.stage.addChild(this.t);
    }


    public draw() {
        this.g.clear();
        this.g.lineStyle(3, this.getColor());
        this.g.moveTo(this.componentAPort[0], this.componentAPort[1]);
        this.g.lineTo(this.componentBPort[0], this.componentBPort[1]);
        this.t.x = (this.componentAPort[0] + this.componentBPort[0]) / 2;
        this.t.y = (this.componentAPort[1] + this.componentBPort[1]) / 2;
    }

    public connectToA(component: any, port: [number, number]) {
        this.componentA = component;
        this.componentAPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    public connectToB(component: any, port: [number, number]) {
        this.componentB = component;
        this.componentBPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        clearTimeout(this.timer);

        if (this.liquid == null && liquid != null) {
            this.liquid = liquid;
            result = true;
        } else {
            if (this.componentA != null && this.componentA.name === source) {
                result = this.componentB.fill(this.name, this.liquid);
            } else if (this.componentB != null && this.componentB.name === source) {
                result = this.componentA.fill(this.name, this.liquid);
            }
            if (result) {
                this.liquid = liquid;
            }
        }
        this.timer = setInterval(() => this.drain(), 1000);
        this.draw();

        console.log(this.name + " fill - result: " + result);

        return result;
    }

    public suck(source: any): Liquid {
        console.log(this.name + " suck - source: " + source);

        let returnLiquid = this.liquid;

        if (this.componentA.name === source) {
            this.liquid = this.componentB.suck(this.name);
        } else if (this.componentB.name === source) {
            this.liquid = this.componentA.suck(this.name);
        }

        this.draw();
        return returnLiquid;
    }

    private drain() {
        console.log(this.name + " drain");

        if (this.liquid != null) {
            this.liquid.isPressurized = false;

            let result = this.componentB.fill(this.name, this.liquid);

            if (!result) {
                result = this.componentA.fill(this.name, this.liquid);
            }

            if (result) {
                this.liquid = null;
                clearTimeout(this.timer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }
    }

    private getColor(): number {
        if (this.liquid != null) {
            return this.liquid.type;
        } else {
            return 0xAAAAAA;
        }
    }

} export default Tube;
