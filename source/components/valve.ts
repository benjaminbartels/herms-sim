import * as PIXI from "pixi.js";

class Valve {
    public name: string;
    public position: [number, number];
    public componentA: any;
    public componentB: any;
    public width: number;
    public height: number;
    public state: string;
    public liquid: string;
    public isOpen: boolean;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    private g: PIXI.Graphics;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.width = 40;
        this.height = 20;
        this.state = "none";
        this.liquid = "none";
        this.componentAPort = [position[0] + 0, position[1] + 10];
        this.componentBPort = [position[0] + 40, position[1] + 10];
        this.g = new PIXI.Graphics;
        this.g.interactive = true;
        this.g.buttonMode = true;
        this.g.on("pointerdown", () => { this.toggle(); });
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {

        console.log("draw called on", this.name);

        this.g.clear();

        if (this.isOpen) {
            this.g.lineStyle(1, 0x2ECC40);
        } else {
            this.g.lineStyle(1, 0xFF4136);
        }

        if (this.liquid === "water") {
            this.g.beginFill(0x0074D9);
        } else {
            this.g.beginFill(0xAAAAAA);
        }

        this.g.drawRect(this.position[0], this.position[1], this.width, this.height);
    }

    public connectToA(component: any) {
        this.componentA = component;
        return this.componentAPort;
    }

    public connectToB(component: any) {
        this.componentB = component;
        return this.componentBPort;
    }

    public toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }



    public fill(source: any) {
        console.log("fill called on", this.name);

        if (this.isOpen) {

            this.state = "filling";
            this.liquid = source.liquid;
            this.draw();

            if (this.componentA.name === source.name) {
                this.componentB.fill(this);
            } else if (this.componentB.name === source.name) {
                this.componentA.fill(this);
            }

        }
    }

    public suck(source: any) {
        console.log("suck called on", this.name);

        if (this.isOpen) {

            this.state = "sucking";
            let result = null;
            if (this.componentA.name === source.name) {
                result = this.componentB.suck(this);
                this.liquid = result.liquid;
            } else if (this.componentB.name === source.name) {
                result = this.componentB.suck(this);
                this.liquid = result.liquid;
            }
            console.log(this.name + " returning " + this.liquid);
            this.draw();
            return result;
        }


    }

    public stopAffecting(source: any) {

        console.log("stopAffecting called on", this.name);

        this.state = "none";
        this.liquid = "none";
        this.draw();

        if (this.componentA.name === source.name) {
            this.componentB.stopAffecting(this);
        } else if (this.componentB.name === source.name) {
            this.componentA.stopAffecting(this);
        }
    }

    private open() {
        console.log("open " + this.name + " called");
        this.isOpen = true;

        if (this.componentA.state === "filling") {
            this.fill(this.componentA);
        } else if (this.componentB.state === "filling") {
            this.fill(this.componentB);
        } else if (this.componentA.state === "sucking") {
            this.suck(this.componentA);
        } else if (this.componentB.state === "sucking") {
            this.suck(this.componentB);
        }

        this.draw();
    }

    private close() {
        console.log("close " + this.name + " called");
        this.isOpen = false;

        if (this.componentA.state === "filling") {
            this.stopAffecting(this.componentA);
        } else if (this.componentB.state === "filling") {
            this.stopAffecting(this.componentB);
        }

        this.draw();
    }
}

export default Valve;
