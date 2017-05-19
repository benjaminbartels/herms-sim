import * as PIXI from "pixi.js";

class Faucet {
    public name: string;
    public position: [number, number];
    public isOn: boolean;
    public component: any;
    public state: string;
    public liquid: string;
    public port: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.port = position;
        this.liquid = "water";
        this.g = new PIXI.Graphics;
        this.g.interactive = true;
        this.g.buttonMode = true;
        this.g.on("pointerdown", () => { this.toggle(); });
        app.stage.addChild(this.g);
        this.draw();
    }

    public toggle() {
        if (this.isOn) {
            this.off();
        } else {
            this.on();
        }
    }

    public connect(component: any) {
        this.component = component;
        return this.position;
    }

    public draw() {

        this.g.clear();

        if (this.isOn) {
            this.g.beginFill(0x0074D9);
        } else {
            this.g.beginFill(0x7FDBFF);
        }

        this.g.drawCircle(this.position[0], this.position[1], 20);
    }


    private on() {
        this.isOn = true;
        this.component.fill(this);
        this.draw();
    }

    private off() {
        this.isOn = false;
        this.component.stopAffecting(this);
        this.draw();
    }
}

export default Faucet;
