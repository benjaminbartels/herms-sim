import * as PIXI from "pixi.js";
import { Liquid, State } from "./enums";

class CounterFlowChiller {
    public name: string;
    public position: [number, number];
    public waterState: State;
    public wertState: State;
    public wertInComponent: any;
    public wertOutComponent: any;
    public waterInComponent: any;
    public waterOutComponent: any;
    public wertInComponentPort: [number, number];
    public wertOutComponentPort: [number, number];
    public waterInComponentPort: [number, number];
    public waterOutComponentPort: [number, number];
    public liquid: Liquid;
    private g: PIXI.Graphics;
    private readonly lineColor = 0x111111;      // Green
    private readonly height = 40;
    private readonly width = 90;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.waterState = State.None;
        this.wertState = State.None;
        this.wertInComponentPort = [this.position[0] - (this.width / 2), this.position[1] + (this.height / 2)];
        this.wertOutComponentPort = [this.position[0] - (this.width / 2), this.position[1] - (this.height / 2)];
        this.waterInComponentPort = [this.position[0] + (this.width / 2), this.position[1] - (this.height / 2)];
        this.waterOutComponentPort = [this.position[0] + (this.width / 2), this.position[1] + (this.height / 2)];
        this.liquid = Liquid.None;
        this.g = new PIXI.Graphics;
        app.stage.addChild(this.g);
        this.draw();
    }

    public draw() {
        console.log("draw called on", this.name);
        this.g.clear();
        this.g.beginFill(this.liquid);
        this.g.lineStyle(1, this.lineColor);
        this.g.drawRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }

    public fill(source: string, liquid: Liquid) {
        console.log(this.name + " fill - source: " + source + " liquid: " + Liquid[liquid]);

        if (this.waterInComponent.name === source) {
            switch (this.waterState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill WaterOut.");
                    this.waterState = State.FilledByA;
                    this.liquid = liquid;
                    this.waterOutComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to " + Liquid[liquid] + " and fill WaterOut.");
                    this.waterState = State.FilledByA;
                    this.liquid = liquid;
                    this.waterOutComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and fill WaterOut.");
                    this.waterState = State.FilledByA;
                    this.liquid = liquid;
                    this.waterOutComponent.fill(this.name, this.liquid);
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
        } else if (this.waterOutComponent.name === source) {
            switch (this.waterState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill WaterIn.");
                    this.waterState = State.FilledByB;
                    this.liquid = liquid;
                    this.waterInComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " fill - State is FilledByB. Set liquid to " + Liquid[liquid] + " and fill WaterIn.");
                    this.waterState = State.FilledByB;
                    this.liquid = liquid;
                    this.waterInComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and fill WaterIn.");
                    this.waterState = State.FilledByB;
                    this.liquid = liquid;
                    this.waterInComponent.fill(this.name, this.liquid);
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        } else if (this.wertInComponent.name === source) {
            switch (this.wertState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill WaterOut.");
                    this.wertState = State.FilledByA;
                    this.liquid = liquid;
                    this.wertOutComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.log(this.name + " fill - State is FilledByA. Set liquid to " + Liquid[liquid] + " and fill WaterOut.");
                    this.wertState = State.FilledByA;
                    this.liquid = liquid;
                    this.wertOutComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByA:
                    console.log(this.name + " fill - State is SuckedByA. Set liquid to None and fill WaterOut.");
                    this.wertState = State.FilledByA;
                    this.liquid = liquid;
                    this.wertOutComponent.fill(this.name, this.liquid);
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
        } else if (this.wertOutComponent.name === source) {
            switch (this.wertState) {
                case State.None:
                    console.log(this.name + " fill - State is None. Set liquid to " + Liquid[liquid] + " and fill WaterIn.");
                    this.wertState = State.FilledByB;
                    this.liquid = liquid;
                    this.wertInComponent.fill(this.name, this.liquid);
                    break;
                case State.FilledByA:
                    console.error(this.name + " fill - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " fill - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " fill - State is FilledByB. Set liquid to " + Liquid[liquid] + " and fill WaterIn.");
                    this.wertState = State.FilledByB;
                    this.liquid = liquid;
                    this.wertInComponent.fill(this.name, this.liquid);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " fill - State is SuckedByB. Set liquid to None and fill WaterIn.");
                    this.wertState = State.FilledByB;
                    this.liquid = liquid;
                    this.wertInComponent.fill(this.name, this.liquid);
                    break;
                default:
                    console.error(this.name + " fill - Invalid State.");
            }
        }

        this.draw();
    }

    public suck(source: any) {
        console.log(this.name + " suck - source: " + source);

        if (this.wertInComponent.name === source) {
            switch (this.waterState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck WaterOut.");
                    this.waterState = State.SuckedByA;
                    this.waterOutComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck WaterOut.");
                    this.waterState = State.SuckedByA;
                    this.waterOutComponent.suck(this.name);
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
        } else if (this.waterOutComponent.name === source) {
            switch (this.waterState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck on WaterIn.");
                    this.waterState = State.SuckedByB;
                    this.waterInComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck WaterIn");
                    this.waterState = State.SuckedByB;
                    this.waterInComponent.suck(this.name);
                    break;
                case State.SuckedByB:
                    console.log(this.name + " suck - State is SuckedByB. Do nothing.");
                    break;
                default:
                    console.error(this.name + " suck - Invalid State.");
            }
        } else if (this.wertInComponent.name === source) {
            switch (this.wertState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck WaterOut.");
                    this.wertState = State.SuckedByA;
                    this.wertOutComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.log(this.name + " suck - State is FilledByA. Suck WaterOut.");
                    this.wertState = State.SuckedByA;
                    this.wertOutComponent.suck(this.name);
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
        } else if (this.wertOutComponent.name === source) {
            switch (this.wertState) {
                case State.None:
                    console.log(this.name + " suck - State is None. Suck on WaterIn.");
                    this.wertState = State.SuckedByB;
                    this.wertInComponent.suck(this.name);
                    break;
                case State.FilledByA:
                    console.error(this.name + " suck - State is FilledByA. Invalid State Change.");
                    break;
                case State.SuckedByA:
                    console.error(this.name + " suck - State is SuckedByA. Invalid State Change.");
                    break;
                case State.FilledByB:
                    console.log(this.name + " suck - State is FilledByB. Suck WaterIn");
                    this.wertState = State.SuckedByB;
                    this.wertInComponent.suck(this.name);
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

        if (this.waterInComponent.name === source) {
            if (this.waterState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop WaterOut.");
                this.waterState = State.None;
                this.liquid = Liquid.None;
                this.waterOutComponent.stop(this.name);
            }
        } else if (this.waterOutComponent.name === source) {
            if (this.waterState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop WaterIn.");
                this.waterState = State.None;
                this.liquid = Liquid.None;
                this.waterInComponent.stop(this.name);
            }
        } else if (this.wertInComponent.name === source) {
            if (this.wertState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop WaterOut.");
                this.wertState = State.None;
                this.liquid = Liquid.None;
                this.wertOutComponent.stop(this.name);
            }
        } else if (this.wertOutComponent.name === source) {
            if (this.wertState === State.None) {
                console.log(this.name + " stop - State is None. Do nothing.");
            } else {
                console.log(this.name + " stop - State is not None. Set liquid to None and stop WaterIn.");
                this.wertState = State.None;
                this.liquid = Liquid.None;
                this.wertInComponent.stop(this.name);
            }
        }
        this.draw();
    }

    public updateLiquid(source: string, liquid: Liquid) {
        console.log(this.name + " updateLiquid - source: " + source + " liquid: " + Liquid[liquid]);

        this.liquid = liquid;

        if (source === this.waterInComponent.name) {
            this.waterOutComponent.updateLiquid(this.name, this.liquid);
        } else if (source === this.waterOutComponent.name) {
            this.waterInComponent.updateLiquid(this.name, this.liquid);
        } else if (source === this.wertInComponent.name) {
            this.wertOutComponent.updateLiquid(this.name, this.liquid);
        } else if (source === this.wertOutComponent.name) {
            this.wertInComponent.updateLiquid(this.name, this.liquid);
        }
        this.draw();
    }

    public connectToWertIn(component: any) {
        this.wertInComponent = component;
        return this.wertInComponentPort;
    }

    public connectToWertOut(component: any) {
        this.wertOutComponent = component;
        return this.wertOutComponentPort;
    }

    public connectToWaterIn(component: any) {
        this.waterInComponent = component;
        return this.waterInComponentPort;
    }

    public connectToWaterOut(component: any) {
        this.waterOutComponent = component;
        return this.waterOutComponentPort;
    }
}

export default CounterFlowChiller;
