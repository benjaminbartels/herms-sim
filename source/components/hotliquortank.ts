import * as PIXI from "pixi.js";
import { Liquid, State } from "./enums";

class HotLiquorTank {
    public name: string;
    public position: [number, number];
    public coilState: State;
    public topComponent: any;
    public bottomComponent: any;
    public coilTopComponent: any;
    public coilBottomComponent: any;
    public topComponentPort: [number, number];
    public bottomComponentPort: [number, number];
    public coilTopComponentPort: [number, number];
    public coilBottomComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly lineColor = 0x111111;
    private readonly width = 150;
    private readonly height = 200;
    private readonly topOffset = 10;
    private readonly coilSize = 40;
    private readonly coilTopOffset = 25;
    private readonly coilBottomOffset = 25;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.coilState = State.None;
        this.liquid = Liquid.None;
        this.topComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2) + this.topOffset];
        this.bottomComponentPort = [position[0], position[1] + (this.height / 2)];
        this.coilTopComponentPort = [position[0] + (this.width / 2), position[1] - (this.height / 2) + this.coilTopOffset];
        this.coilBottomComponentPort = [position[0] + (this.width / 2), position[1] + (this.height / 2) - this.coilBottomOffset];
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.t = new PIXI.Text(name);
        this.t.style.fontSize = 10;
        this.t.anchor.set(0.5, 0.5);
        this.t.x = this.position[0];
        this.t.y = this.position[1];
        app.stage.addChild(this.t);
        this.draw();
    }

    public draw() {
        console.log(this.name + " draw");
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
        this.g.moveTo(this.coilTopComponentPort[0], this.coilTopComponentPort[1]);
        this.g.lineTo(this.position[0], this.position[1]);
        this.g.lineTo(this.coilBottomComponentPort[0], this.coilBottomComponentPort[1]);
        this.g.drawCircle(this.position[0], this.position[1], this.coilSize);
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (source === this.topComponent.name) {
            if (liquid !== Liquid.None) {
                this.liquid = liquid;
                this.bottomComponent.fill(this.name, this.liquid);
                this.draw();
            }
        } else if (source === this.bottomComponent.name) {
            console.log(this.name + " suck - Can't fill from the bottom port of HotLiquorTank.");
        } else if (source === this.coilTopComponent.name) {
            switch (this.coilState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill Coil Bottom.");
                    this.coilState = State.FilledByA;
                    this.liquid = liquid;
                    this.coilBottomComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to " + Liquid[liquid] + " and fill Coil Bottom.");
                    this.coilState = State.FilledByA;
                    this.liquid = liquid;
                    this.coilBottomComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and fill Coil Bottom.");
                    this.coilState = State.FilledByA;
                    this.liquid = liquid;
                    this.coilBottomComponent.fill(this.name, this.liquid);
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
        } else if (this.coilBottomComponent.name === source) {
            switch (this.coilState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill Coil Top.");
                    this.coilState = State.FilledByB;
                    this.liquid = liquid;
                    this.coilTopComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " fill - State is FilledByB. Set liquid to " + Liquid[liquid] + " and fill Coil Top.");
                    this.coilState = State.FilledByB;
                    this.liquid = liquid;
                    this.coilTopComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and fill Coil Top.");
                    this.coilState = State.FilledByB;
                    this.liquid = liquid;
                    this.coilTopComponent.fill(this.name, this.liquid);
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        }
    }

    public suck(source: string) {
        console.log(this.name + " suck - source: " + source);

        if (source === this.topComponent.name) {
            console.log(this.name + " suck - Can't suck out of the top port of HotLiquorTank.");
        } else if (source === this.bottomComponent.name) {
            this.bottomComponent.updateLiquid(this.name, this.liquid);
            this.draw();
        } else if (this.coilTopComponent.name === source) {
            switch (this.coilState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck Coil Bottom.");
                    this.coilState = State.SuckedByA;
                    this.coilBottomComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck Coil Bottom.");
                    this.coilState = State.SuckedByA;
                    this.coilBottomComponent.suck(this.name);
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
        } else if (this.coilBottomComponent.name === source) {
            switch (this.coilState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck A Coil Top.");
                    this.coilState = State.SuckedByB;
                    this.coilTopComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck Coil Top");
                    this.coilState = State.SuckedByB;
                    this.coilTopComponent.suck(this.name);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " suck - State is SuckedByB. Do nothing.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        }
    }

    public stop(source: string) {
        console.log(this.name + " stop - source: " + source);

        if (this.coilTopComponent.name === source) {
            if (this.coilState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop Coil Bottom.");
                this.coilState = State.None;
                this.liquid = Liquid.None;
                this.coilBottomComponent.stop(this.name);
            }
        } else if (this.coilBottomComponent.name === source) {
            if (this.coilState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop Coil Top.");
                this.coilState = State.None;
                this.liquid = Liquid.None;
                this.coilTopComponent.stop(this.name);
            }
        }
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);

        if (source === this.coilTopComponent.name) {
            this.coilBottomComponent.updateLiquid(this.name, this.liquid);
        } else if (source === this.coilBottomComponent.name) {
            this.coilTopComponent.updateLiquid(this.name, this.liquid);
        }
    }

    public heatOn() {
        console.log(this.name + " heatOn");
        if (this.liquid === Liquid.ColdWater) {
            this.liquid = Liquid.HotWater;
            this.draw();
            this.bottomComponent.updateLiquid(this.name, this.liquid);
        }
    }

    public heatOff() {
        console.log(this.name + " heatOff");
        if (this.liquid === Liquid.HotWater) {
            this.draw();
            this.bottomComponent.updateLiquid(this.name, this.liquid);
        }
    }

    public connectToTop(component: any) {
        this.topComponent = component;
        return this.topComponentPort;
    }

    public connectToBottom(component: any) {
        this.bottomComponent = component;
        return this.bottomComponentPort;
    }

    public connectToCoilTop(component: any) {
        this.coilTopComponent = component;
        return this.coilTopComponentPort;
    }

    public connectToCoilBottom(component: any) {
        this.coilBottomComponent = component;
        return this.coilBottomComponentPort;
    }
}

export default HotLiquorTank;
