import * as PIXI from "pixi.js";
import { Liquid, State } from "./enums";

class Cross {
    public name: string;
    public position: [number, number];
    public state: State;
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentC: any;
    public componentD: any;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    public componentCPort: [number, number];
    public componentDPort: [number, number];
    public isOpen: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly size = 5;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquid = Liquid.None;
        this.state = State.None;
        this.componentAPort = [position[0], position[1]];
        this.componentBPort = [position[0], position[1]];
        this.componentCPort = [position[0], position[1]];
        this.componentDPort = [position[0], position[1]];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
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

    public connectToD(component: any) {
        this.componentD = component;
        return this.componentDPort;
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (this.componentA.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill B, C & D.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to None and fill B, C & D.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and fill B, C & D.");
                    this.state = State.FilledByA;
                    this.liquid = liquid;
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByB:
                    console.error(this.name + " fill - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " fill - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.error(this.name + " fill - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " fill - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.error(this.name + " fill - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " fill - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        } else if (this.componentB.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill A, C & D.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " fill - State is FilledByB. Set liquid to None and fill A, C & D.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and fill A, C & D.");
                    this.state = State.FilledByB;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByC:
                    console.error(this.name + " fill - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " fill - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.error(this.name + " fill - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " fill - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        } else if (this.componentC.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill A,B & D.");
                    this.state = State.FilledByC;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.error(this.name + " fill - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " fill - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.log(this.name + " fill - State is FilledByC. Set liquid to None and fill A,B & D.");
                    this.state = State.FilledByC;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.SuckedByC:
                    console.log(this.name + " fill - State is SuckedByC. Set liquid to None and fill A,B & D.");
                    this.state = State.FilledByC;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentD.fill(this.name, this.liquid);
                    break;
                case State.FilledByD:
                    console.error(this.name + " fill - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " fill - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        } else if (this.componentD.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill A,B & C.");
                    this.state = State.FilledByD;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.error(this.name + " fill - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " fill - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.error(this.name + " fill - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " fill - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.log(this.name + " fill - State is FilledByD. Set liquid to None and fill A,B & C.");
                    this.state = State.FilledByD;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
                    break;
                case State.SuckedByD:
                    console.log(this.name + " fill - State is FilledByD. Set liquid to None and fill A,B & C.");
                    this.state = State.FilledByD;
                    this.liquid = liquid;
                    this.componentA.fill(this.name, this.liquid);
                    this.componentB.fill(this.name, this.liquid);
                    this.componentC.fill(this.name, this.liquid);
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
                    console.log(this.name + " suck - State is None. Suck B, C & D.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    this.componentC.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck B, C & D.");
                    this.state = State.SuckedByA;
                    this.componentB.suck(this.name);
                    this.componentC.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " suck - State is SuckedByA. Do nothing.");
                    break;
                case State.FilledByB:
                    console.error(this.name + " suck - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " suck - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.error(this.name + " suck - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " suck - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.error(this.name + " suck - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " suck - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.componentB.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A C & D.");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    this.componentC.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck A C & D.");
                    this.state = State.SuckedByB;
                    this.componentA.suck(this.name);
                    this.componentC.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " suck - State is SuckedByB. Do nothing.");
                    break;
                case State.FilledByC:
                    console.error(this.name + " suck - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " suck - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.error(this.name + " suck - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " suck - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.componentC.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A B & D.");
                    this.state = State.SuckedByC;
                    this.componentA.suck(this.name);
                    this.componentB.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.error(this.name + " suck - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " suck - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.log(this.name + " suck - State is FilledByC. Suck A B & D.");
                    this.state = State.SuckedByC;
                    this.componentA.suck(this.name);
                    this.componentB.suck(this.name);
                    this.componentD.suck(this.name);
                    break;
                case State.SuckedByC:
                    console.log(this.name + " suck - State is SuckedByC. Do nothing.");
                    break;
                case State.FilledByD:
                    console.error(this.name + " suck - State is FilledByD. Invalid State Change.");
                    break;
                case State.SuckedByD:
                    console.error(this.name + " suck - State is SuckedByD. Invalid State Change.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.componentD.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A B & C.");
                    this.state = State.FilledByD;
                    this.componentA.suck(this.name);
                    this.componentB.suck(this.name);
                    this.componentC.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.error(this.name + " suck - State is FilledByB. Invalid State Change.");
                    break;
                case State.SuckedByB:
                    console.error(this.name + " suck - State is SuckedByB. Invalid State Change.");
                    break;
                case State.FilledByC:
                    console.error(this.name + " suck - State is FilledByC. Invalid State Change.");
                    break;
                case State.SuckedByC:
                    console.error(this.name + " suck - State is SuckedByC. Invalid State Change.");
                    break;
                case State.FilledByD:
                    console.log(this.name + " suck - State is FilledByD. Suck A B & C.");
                    this.state = State.FilledByD;
                    this.componentA.suck(this.name);
                    this.componentB.suck(this.name);
                    this.componentC.suck(this.name);
                    break;
                case State.SuckedByD:
                    console.log(this.name + " suck - State is SuckedByD. Do nothing.");
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
                console.log(this.name + " stop - State is not None. Set liquid to None and stop B, C & D.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentB.stop(this.name);
                this.componentC.stop(this.name);
                this.componentD.stop(this.name);
            }
        } else if (this.componentB.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop A, C & D.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentA.stop(this.name);
                this.componentC.stop(this.name);
                this.componentD.stop(this.name);
            }
        } else if (this.componentC.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop A,B & D.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentA.stop(this.name);
                this.componentB.stop(this.name);
                this.componentD.stop(this.name);
            }
        } else if (this.componentD.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop A, B & C.");
                this.state = State.None;
                this.liquid = Liquid.None;
                this.componentA.stop(this.name);
                this.componentB.stop(this.name);
                this.componentC.stop(this.name);
            }
        }
        this.draw();
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);

        this.liquid = liquid;

        if (source === this.componentA.name) {
            this.componentB.updateLiquid(this.name, this.liquid);
            this.componentC.updateLiquid(this.name, this.liquid);
            this.componentD.updateLiquid(this.name, this.liquid);
        } else if (source === this.componentB.name) {
            this.componentA.updateLiquid(this.name, this.liquid);
            this.componentC.updateLiquid(this.name, this.liquid);
            this.componentD.updateLiquid(this.name, this.liquid);
        } else if (source === this.componentC.name) {
            this.componentA.updateLiquid(this.name, this.liquid);
            this.componentB.updateLiquid(this.name, this.liquid);
            this.componentD.updateLiquid(this.name, this.liquid);
        } else if (source === this.componentD.name) {
            this.componentA.updateLiquid(this.name, this.liquid);
            this.componentB.updateLiquid(this.name, this.liquid);
            this.componentC.updateLiquid(this.name, this.liquid);
        }
        this.draw();
    }
}

export default Cross;
