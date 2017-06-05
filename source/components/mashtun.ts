import * as PIXI from "pixi.js";
import { LiquidType } from "./enums";
import { Liquid } from "./liquid";

class MashTun {
    public name: string;
    public position: [number, number];
    public liquids: Liquid[];
    public topComponent: any;
    public bottomComponent: any;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private c: PIXI.Text;
    private timer: number;
    private readonly lineColor = 0x111111;
    private readonly width = 150;
    private readonly height = 200;
    private readonly topOffset = 10;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquids = new Array<Liquid>();
        this.topComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2) + this.topOffset];
        this.bottomComponentPort = [position[0], position[1] + (this.height / 2)];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.c = new PIXI.Text(this.liquids.length.toString());
        this.c.style.fontSize = 10;
        this.c.anchor.set(0.5, -1.0);
        this.c.x = this.position[0];
        this.c.y = this.position[1];
        app.stage.addChild(this.c);
        this.timer = setInterval(() => this.drain(), 1000);
        this.draw();
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.beginFill(this.getColor());
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
        this.c.text = this.liquids.length.toString();
    }

    public connectToTop(component: any) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public connectToBottom(component: any) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        if (liquid == null) {
            console.log(this.name + " fill - null liquid");
            return true;
        }

        let result = false;

        if (this.bottomComponent != null && this.bottomComponent.name === source) {
            console.error(this.name + " fill - Can't fill from the bottom port of MashTun.");
            result = false;
        } else if (this.topComponent != null && this.topComponent.name === source) {
            liquid.type = LiquidType.Wert;
            this.liquids.push(liquid);
            this.draw();
            result = true;
        }

        this.draw();
        return result;
    }

    public suck(source: string): Liquid {
        console.log(this.name + " suck - source: " + source);

        let result = null;

        clearTimeout(this.timer);
        if (this.topComponent != null && this.topComponent.name === source) {
            console.log(this.name + " suck - Can't suck out of the top port of MashTun.");
        } else if (this.bottomComponent != null && this.bottomComponent.name === source) {
            if (this.liquids.length > 0) {
                result = this.liquids.pop();
            }
        }
        this.timer = setInterval(() => this.drain(), 1000);


        this.draw();
        return result;
    }

    private drain() {
        console.log(this.name + " drain");

        if (this.liquids.length > 0) {

            let liquid = this.liquids.pop();

            let result = this.bottomComponent.fill(this.name, liquid);

            if (result) {
                clearTimeout(this.timer);

            } else {
                this.liquids.push(liquid);
                console.error(this.name + " drain - failed");
            }
            this.draw();
        }

    }

    private getColor(): number {
        if (this.liquids.length > 0) {
            return this.liquids[0].type;
        } else {
            return 0xAAAAAA;
        }
    }
}

export default MashTun;
