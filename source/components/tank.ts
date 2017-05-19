import * as PIXI from "pixi.js";

class Tank {
    public name: string;
    public position: [number, number];
    public topComponent: any;
    public state: string;
    public liquid: string;
    public topComponentPort: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.state = "none";
        this.liquid = "water";
        this.topComponentPort = [position[0], position[1] + 10];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.draw();
    }

    public fill(source: any) {
        console.log("fill " + this.name + " called");
        this.state = "filling";
        this.liquid = source.liquid;
        this.draw();
    }

    public suck(source: any) {
        console.log("suck called on", this.name);
        this.state = "sucking";
        this.draw();
        console.log(this.name + " returning " + this.liquid);
        return this;
    }

    public stopAffecting(source: any) {
        console.log("stopAffecting called on", this.name);
        this.state = "none";
        if (this.state === "filling") {
            this.liquid = "none";
        }
        this.draw();
    }

    public connectToTop(component: any) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public draw() {

        console.log("draw called on", this.name);

        this.g.clear();

        if (this.liquid === "water") {
            this.g.beginFill(0x0074D9);
        } else {
            this.g.beginFill(0xAAAAAA);
        }

        this.g.drawRect(this.position[0], this.position[1], 150, 200);
    }
}

export default Tank;
