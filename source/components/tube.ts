import * as PIXI from "pixi.js";
import { Liquid, State } from "./enums";

class Tube {
    public name: string;
    public position: [number, number];
    public state: State;
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    private g: PIXI.Graphics;
    private t: PIXI.Text;

    constructor(name: string, app: PIXI.Application) {
        this.name = name;
        this.liquid = Liquid.None;
        this.state = State.None;
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        app.stage.addChild(this.t);
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.lineStyle(3, this.liquid);
        this.g.moveTo(this.componentAPort[0], this.componentAPort[1]);
        this.g.lineTo(this.componentBPort[0], this.componentBPort[1]);
        this.t.x = (this.componentAPort[0] + this.componentBPort[0]) / 2;
        this.t.y = (this.componentAPort[1] + this.componentBPort[1]) / 2;
    }

    public connectToA(component: any, port: [number, number]) {
        this.componentA = component;
        this.componentAPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    public connectToB(component: any, port: [number, number]) {
        this.componentB = component;
        this.componentBPort = port;

        if (this.componentA != null && this.componentB != null) {
            this.draw();
        }
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (this.componentA.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill B.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to " + Liquid[liquid] + " and fill B.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and fill B.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    break;
                case State.FilledByB:
                    console.error(this.name + " fill - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " fill - State is SuckedByB. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        } else if (this.componentB.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill A.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " fill - State is FilledByB. Set liquid to " + Liquid[liquid] + " and fill A.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and fill A.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        }

        this.draw();
    }

    public suck(source: any) {
        console.log(this.name + " suck - source: " + source);

        if (this.componentA.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck B.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck B.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " suck - State is SuckedByA. Suck B.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck B.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    break;
                case State.SuckedByB:
                    console.error(this.name + " suck - State is SuckedByB. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.componentB.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A.");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Suck A.");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck A");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " suck - State is SuckedByB. Suck A.");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        }
        this.draw();

    }

    public stop(source: any) {
        console.log(this.name + " stop - source: " + source);

        if (this.componentA.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop B.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentB.stop(this.name);
            }
        } else if (this.componentB.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop A.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentA.stop(this.name);
            }
        }
        this.draw();
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);

        this.liquid = liquid;

        if (source === this.componentA.name) {
            this.componentB.updateLiquid(this.name, this.liquid);
        } else if (source === this.componentB.name) {
            this.componentA.updateLiquid(this.name, this.liquid);
        }
        this.draw();
    }
}

export default Tube;
