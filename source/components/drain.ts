import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";

class Drain {
    public name: string;
    public position: [number, number];
    public component: any;
    public port: [number, number];
    public isOn: boolean;
    private count: number;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private c: PIXI.Text;
    private readonly size = 20;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.port = position;
        this.count = 0;
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.c = new PIXI.Text("0");
        this.c.style.fontSize = 10;
        this.c.anchor.set(0.5, -0.5);
        this.c.x = this.position[0];
        this.c.y = this.position[1];
        app.stage.addChild(this.c);
        this.draw();
    }

    public draw() {
        this.g.clear();
        this.g.lineStyle(1, 0x111111);
        this.g.drawCircle(this.position[0], this.position[1], this.size);
        this.c.text = this.count.toString();

    }

    public connect(component: any) {
        this.component = component;
        return this.port;
    }

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        this.count++;
        this.draw();
        return true;
    }
}

export default Drain;
