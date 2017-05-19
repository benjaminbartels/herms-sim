import * as PIXI from "pixi.js";

class Tube {
    public name: string;
    public position: [number, number];
    public componentA: any;
    public componentB: any;
    public state: string;
    public liquid: string;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, app: PIXI.Application) {
        this.name = name;
        this.state = "none";
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
    }


    public fill(source: any) {

        console.log("fill called on", this.name);

        this.state = "filling";
        this.liquid = source.liquid;
        this.draw();

        if (this.componentA.name === source.name) {
            this.componentB.fill(this);
        } else if (this.componentB.name === source.name) {
            this.componentA.fill(this);
        }
    }

    public suck(source: any) {
        console.log("suck called on", this.name);
        this.state = "sucking";
        let result = null;
        if (this.componentA.name === source.name) {
            result = this.componentB.suck(this);
            if (result != null) {
                this.liquid = result.liquid;
            }
        } else if (this.componentB.name === source.name) {
            result = this.componentB.suck(this);
            if (result != null) {
                this.liquid = result.liquid;
            }
        }
        console.log(this.name + " returning " + this.liquid);
        this.draw();
        return result;
    }

    public stopAffecting(source: any) {

        console.log("stopAffecting called on", this.name);

        this.state = "none";
        this.liquid = "none";
        this.draw();

        if (this.componentA.name === source.name) {
            this.componentB.stopAffecting(this);
            return;
        } else if (this.componentB.name === source.name) {
            this.componentA.stopAffecting(this);
            return;
        }
    }

    public connectToA(component: any, port: [number, number]) {
        this.componentA = component;
        this.componentAPort = port;
    }

    public connectToB(component: any, port: [number, number]) {
        this.componentB = component;
        this.componentBPort = port;
    }

    public draw() {

        console.log("draw called on", this.name);

        this.g.clear();

        if (this.liquid === "water") {
            this.g.lineStyle(3, 0x0074D9);
        } else {
            this.g.lineStyle(3, 0xAAAAAA);
        }

        this.g.moveTo(this.componentAPort[0], this.componentAPort[1]);
        this.g.lineTo(this.componentBPort[0], this.componentBPort[1]);
    }
}

export default Tube;
