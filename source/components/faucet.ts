import * as PIXI from "pixi.js";
import { LiquidType } from "./enums";
import { Liquid } from "./liquid";

class Faucet {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public component: any;
    public port: [number, number];
    public isOn: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private c: PIXI.Text;
    private timer: number;
    private lastId: number;
    private readonly size = 20;
    private readonly lineColor = 0x111111;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.port = position;
        this.lastId = 0;
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
        this.timer = setInterval(() => this.fire(), 100);

        this.draw();
    }

    public draw() {
        this.g.clear();
        this.g.lineStyle(1, this.lineColor);
        this.g.beginFill(LiquidType.ColdWater);
        this.g.drawCircle(this.position[0], this.position[1], this.size);
        this.c.text = this.lastId.toString();

    }

    public connect(component: any) {
        this.component = component;
        return this.port;
    }

    public fill(source: string, liquid: Liquid): boolean {
        console.warn(this.name + " fill - Can't fill a faucet.");
        return false;
    }

    public suck(source: string): Liquid {
        console.warn(this.name + " suck - Can't suck a faucet.");
        return null;
    }

    private fire() {
        let id = this.lastId + 1;
        let liquid = new Liquid(id, LiquidType.ColdWater);
        let result = this.component.fill(this.name, liquid);
        if (result) {
            this.lastId = id;
            this.draw();
        }
    }


} export default Faucet;
