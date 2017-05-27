import * as PIXI from "pixi.js";
import { Liquid, State, Orientation } from "./enums";

class BallValve {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public isMotorized: boolean;
    public state: State;
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    public isOpen: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly width = 40;
    private readonly height = 20;
    private readonly openColor = 0x2ECC40;      // Green
    private readonly closedColor = 0x85144b;    // Maroon
    private readonly unpoweredColor = 0x001F3F; // Navy
    private readonly poweredColor = 0xFFDC00;   // Yellow

    constructor(name: string, position: [number, number], orientation: Orientation, isMotorized: boolean,
        app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.orientation = orientation;
        this.isMotorized = isMotorized;
        this.liquid = Liquid.None;
        this.state = State.None;
        this.g = new PIXI.Graphics;
        if (!isMotorized) {
            this.g.interactive = true;
            this.g.buttonMode = true;
            this.g.on("pointerdown", () => { this.toggle(); });
        }
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.draw();

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.componentAPort = [position[0] - (this.width / 2), position[1]];
                this.componentBPort = [position[0] + (this.width / 2), position[1]];
                break;
            case Orientation.TopToBottom:
                this.componentAPort = [position[0], position[1] - (this.width / 2)];
                this.componentBPort = [position[0], position[1] + (this.width / 2)];
                break;
            case Orientation.RightToLeft:
                this.componentAPort = [position[0] + (this.width / 2), position[1]];
                this.componentBPort = [position[0] - (this.width / 2), position[1]];
                break;
            case Orientation.BottomToTop:
                this.componentAPort = [position[0], position[1] + (this.width / 2)];
                this.componentBPort = [position[0], position[1] - (this.width / 2)];
                break;
        }
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        if (this.isOpen) {
            if (this.isMotorized) {
                this.g.lineStyle(1, this.poweredColor);
            } else {
                this.g.lineStyle(1, this.openColor);
            }
        } else {
            if (this.isMotorized) {
                this.g.lineStyle(1, this.unpoweredColor);
            } else {
                this.g.lineStyle(1, this.closedColor);
            }
        }
        this.g.beginFill(this.liquid);
        this.g.moveTo(this.position[0], this.position[1]);
        this.g.lineTo(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2));
        this.g.lineTo(this.position[0] - (this.width / 2), this.position[1] + (this.height / 2));
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.lineTo(this.position[0] + (this.width / 2), this.position[1] + (this.height / 2));
        this.g.lineTo(this.position[0] + (this.width / 2), this.position[1] - (this.height / 2));
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.drawCircle(this.position[0], this.position[1], 7);
        this.g.position.x = this.position[0];
        this.g.position.y = this.position[1];
        this.g.pivot = new PIXI.Point(this.position[0], this.position[1]);
        if (this.orientation === Orientation.TopToBottom || this.orientation === Orientation.BottomToTop) {
            this.g.rotation = 1.5708;
        }
    }

    public connectToA(component: any) {
        this.componentA = component;
        return this.componentAPort;
    }

    public connectToB(component: any) {
        this.componentB = component;
        return this.componentBPort;
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (this.componentA.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill B.");
                    this.state = State.FilledByA;
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentB.fill(this.name, this.liquid);
                    }
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to " + Liquid[liquid] + " and fill B.");
                    this.state = State.FilledByA;
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentB.fill(this.name, this.liquid);
                    }
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and suck B.");
                    this.state = State.FilledByA;
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentB.fill(this.name, this.liquid);
                    }
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
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentA.fill(this.name, this.liquid);
                    }
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
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentA.fill(this.name, this.liquid);
                    }
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and suck A.");
                    this.state = State.FilledByB;
                    if (this.isOpen) {
                        this.liquid = liquid;
                        this.componentA.fill(this.name, this.liquid);
                    }
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
                    if (this.isOpen) {
                        this.componentB.suck(this.name);
                    }
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck B.");
                    this.state = State.SuckedByA;
                    if (this.isOpen) {
                        this.componentB.suck(this.name);
                    }
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
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.componentB.name === source) {
            switch (this.state) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A.");
                    this.state = State.SuckedByB;
                    if (this.isOpen) {
                        this.componentA.suck(this.name);
                    }
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change. but......");
                    if (this.isOpen) {
                        this.componentA.updateLiquid(this.liquid);
                    }
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck A");
                    this.state = State.SuckedByB;
                    if (this.isOpen) {
                        this.componentA.suck(this.name);
                    }
                    break;
                case State.SuckedByB:
                    console.log(this.name + " suck - State is SuckedByB. Do nothing.");
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
                if (this.isOpen && this.componentB != null) {
                    this.componentB.stop(this.name);
                }
            }
        } else if (this.componentB.name === source) {
            if (this.state === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop A.");
                this.state = State.None;
                this.liquid = Liquid.None;
                if (this.isOpen && this.componentA != null) {
                    this.componentA.stop(this.name);
                }
            }
        }
        this.draw();
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);
        if (this.isOpen) {
            this.liquid = liquid;

            if (source === this.componentA.name) {
                this.componentB.updateLiquid(this.name, this.liquid);
            } else if (source === this.componentB.name) {
                this.componentA.updateLiquid(this.name, this.liquid);
            }
        }
        this.draw();
    }

    public toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    public open() {
        console.log(this.name + " open");

        if (!this.isOpen) {

            this.isOpen = true;

            switch (this.state) {
                case State.None:
                    console.log(this.name + " open - State is None. Do nothing.");
                    break;
                case State.FilledByA:
                    console.log(this.name + " open - State is FilledByA. Fill B.");
                    this.liquid = this.componentA.liquid;
                    this.componentB.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " open - State is SuckedByA. Suck B.");
                    this.componentB.suck(this.name);
                    break;
                case State.FilledByB:
                    console.log(this.name + " open - State is FilledByB. Fill A.");
                    this.liquid = this.componentB.liquid;
                    this.componentA.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.error(this.name + " open - State is SuckedByB. Suck A.");
                    this.componentA.suck(this.name);
                    break;
                default:
                    console.error(this.name + " open - Invalid State.");
            }

            this.draw();
        }
    }

    public close() {
        console.log(this.name + " close");

        if (this.isOpen) {

            this.isOpen = false;
            this.liquid = Liquid.None;

            switch (this.state) {
                case State.None:
                    console.log(this.name + " close - State is None. Do nothing.");
                    break;
                case State.FilledByA:
                    console.log(this.name + " close - State is FilledByA. Fill B.");
                    this.componentB.stop(this.name);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " close - State is SuckedByA. Suck B.");
                    this.componentB.stop(this.name);
                    this.componentA.updateLiquid(this.name, this.liquid);
                    break;
                case State.FilledByB:
                    console.error(this.name + " close - State is FilledByB. Fill A.");
                    this.componentA.stop(this.name);
                    break;
                case State.SuckedByB:
                    console.error(this.name + " close - State is SuckedByB. Suck A.");
                    this.componentA.stop(this.name);
                    this.componentB.updateLiquid(this.name, this.liquid);
                    break;
                default:
                    console.error(this.name + " close - Invalid State.");
            }

            this.draw();
        }
    }
}

export default BallValve;
