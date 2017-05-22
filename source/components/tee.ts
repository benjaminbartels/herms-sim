import * as PIXI from "pixi.js";
import { Liquid } from "./enums";

class Tee {
    public name: string;
    public position: [number, number];
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentC: any;
    public componentAPressure: number;
    public componentBPressure: number;
    public componentCPressure: number;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    public componentCPort: [number, number];
    public isOpen: boolean;
    private g: PIXI.Graphics;
    private readonly size = 5;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquid = Liquid.None;
        this.componentAPressure = 0;
        this.componentBPressure = 0;
        this.componentCPressure = 0;
        this.componentAPort = [position[0], position[1]];
        this.componentBPort = [position[0], position[1]];
        this.componentCPort = [position[0], position[1]];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.drawCircle(this.position[0], this.position[1], this.size);
    }

    public connectToA(component: any) {
        this.componentA = component;
        return this.componentAPort;
    }

    public connectToB(component: any) {
        this.componentB = component;
        return this.componentBPort;
    }

    public connectToC(component: any) {
        this.componentC = component;
        return this.componentCPort;
    }

    public fill(source: any) {
        console.log("fill called on", this.name);

        this.liquid = source.liquid;
        this.draw();

        switch (source.name) {

            case this.componentA.name:
                if (this.componentAPressure !== 1) {
                    this.componentAPressure = 1;
                    this.componentB.fill(this);
                    this.componentC.fill(this);
                }
                break;
            case this.componentB.name:
                if (this.componentBPressure !== 1) {
                    this.componentBPressure = 1;
                    this.componentA.fill(this);
                    this.componentC.fill(this);
                }
                break;
            case this.componentC.name:
                if (this.componentCPressure !== 1) {
                    this.componentCPressure = 1;
                    this.componentA.fill(this);
                    this.componentB.fill(this);
                }
                break;

        }
    }

    public suck(source: any) {
        console.log("suck called on", this.name);

        switch (source.name) {

            case this.componentA.name:
                if (this.componentAPressure !== -1) {
                    this.componentAPressure = -1;
                    this.componentB.suck(this);
                    this.componentC.suck(this);
                }
                break;
            case this.componentB.name:
                if (this.componentBPressure !== -1) {
                    this.componentBPressure = -1;
                    this.componentA.suck(this);
                    this.componentC.suck(this);
                }
                break;
            case this.componentC.name:
                if (this.componentCPressure !== -1) {
                    this.componentCPressure = -1;
                    this.componentA.suck(this);
                    this.componentB.suck(this);
                }
                break;

        }
    }

    public stop(source: any) {
        console.log("stop called on", this.name);

        this.liquid = Liquid.None;
        this.draw();

        switch (source.name) {

            case this.componentA.name:
                if (this.componentAPressure !== 0) {
                    this.componentAPressure = 0;
                    this.componentB.stop(this);
                    this.componentC.stop(this);
                }
                break;
            case this.componentB.name:
                if (this.componentBPressure !== 0) {
                    this.componentBPressure = 0;
                    this.componentA.stop(this);
                    this.componentC.stop(this);
                }
                break;
            case this.componentC.name:
                if (this.componentCPressure !== 0) {
                    this.componentCPressure = 0;
                    this.componentA.stop(this);
                    this.componentB.stop(this);
                }
                break;

        }
    }

    public notify(source: any) {
        console.log("notify called on", this.name);

        this.liquid = source.liquid;
        this.draw();


        switch (source.name) {

            case this.componentA.name:
                if (this.componentBPressure === -1) {
                    this.componentB.notify(this);
                }
                if (this.componentCPressure === -1) {
                    this.componentC.notify(this);
                }
                break;
            case this.componentB.name:
                if (this.componentAPressure === -1) {
                    this.componentA.notify(this);
                }
                if (this.componentCPressure === -1) {
                    this.componentC.notify(this);
                }
                break;
            case this.componentC.name:
                if (this.componentAPressure === -1) {
                    this.componentA.notify(this);
                }
                if (this.componentBPressure === -1) {
                    this.componentB.notify(this);
                }
                break;

        }

    }
}

export default Tee;
