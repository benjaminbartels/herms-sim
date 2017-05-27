import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class Faucet {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public component: any;
    public port: [number, number];
    public isOn: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly size = 20;
    private readonly onColor = 0x2ECC40;    // Green
    private readonly offColor = 0x85144b;   // Maroon

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.liquid = Liquid.None;
        this.port = position;
        this.g = new PIXI.Graphics;
        this.g.interactive = true;
        this.g.buttonMode = true;
        this.g.on("pointerdown", () => { this.toggle(); });
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.draw();
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        if (this.isOn) {
            this.g.lineStyle(1, this.onColor);
        } else {
            this.g.lineStyle(1, this.offColor);
        }
        this.g.beginFill(this.liquid);
        this.g.drawCircle(this.position[0], this.position[1], this.size);

    }

    public connect(component: any) {
        this.component = component;
        return this.port;
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);
        console.warn(this.name + " fill - Can't fill a faucet.");
    }

    public suck(source: string) {
        console.log(this.name + " suck - source: " + source);
        console.warn(this.name + " suck - Can't suck a faucet.");
    }

    public stop(source: string) {
        console.log(this.name + " stop - source: " + source);
        console.warn(this.name + " stop - Can't stop a faucet.");
    }

    public toggle() {
        if (this.isOn) {
            this.off();
        } else {
            this.on();
        }
    }

    private on() {
        console.log(this.name + " on");
        this.isOn = true;
        this.liquid = Liquid.ColdWater;
        this.draw();
        this.component.fill(this.name, this.liquid);
    }

    private off() {
        console.log(this.name + " off");
        this.isOn = false;
        this.liquid = Liquid.None;
        this.draw();
        this.component.stop(this.name);
    }
}

export default Faucet;
