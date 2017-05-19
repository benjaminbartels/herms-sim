import * as PIXI from "pixi.js";

class Pump {
    public name: string;
    public position: [number, number];
    public isOn: boolean;
    public inComponent: any;
    // public outComponent: any
    public state: string;
    public liquid: string;
    public inPort: [number, number];
    public outPort: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.inPort = position;
        this.state = "none";
        this.liquid = "none";
        // this.outPort = position
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

    public connectToIn(component: any) {
        this.inComponent = component;
        return this.inPort;
    }

    public draw() {

        this.g.clear();

        if (this.isOn) {
            this.g.beginFill(0x0074D9);
        } else {
            this.g.beginFill(0x7FDBFF);
        }

        this.g.drawRect(this.position[0], this.position[1], 10, 10);
    }

    private on() {
        this.isOn = true;
        let result = this.inComponent.suck(this);
        console.log(this.name + " HAS " + result.liquid);
        this.draw();
    }

    private off() {
        this.isOn = false;
        this.inComponent.stopAffecting(this);
        this.draw();
    }

}
export default Pump;
