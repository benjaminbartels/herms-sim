import * as PIXI from "pixi.js";
import { Orientation } from "./enums";
import { Liquid } from "./liquid";

class BallValve {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public isMotorized: boolean;
    public liquid: Liquid;
    public componentA: any;
    public componentB: any;
    public componentAPort: [number, number];
    public componentBPort: [number, number];
    public isOpen: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private timer: number;
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
        this.liquid = null;
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
        this.g.beginFill(this.getColor());
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

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        if (this.isOpen) {

            clearTimeout(this.timer);

            if (this.liquid == null && liquid != null) {
                this.liquid = liquid;
                result = true;
            } else {
                result = false;
                if (this.componentA != null && this.componentA.name === source) {
                    result = this.componentB.fill(this.name, this.liquid);
                } else if (this.componentB != null && this.componentB.name === source) {
                    result = this.componentA.fill(this.name, this.liquid);
                }
                if (result) {
                    this.liquid = liquid;
                }
            }
            this.timer = setInterval(() => this.drain(), 1000);
            this.draw();
        }

        return result;
    }

    public suck(source: any): Liquid {
        console.log(this.name + " suck - source: " + source);

        let returnLiquid = null;

        if (this.isOpen) {

            returnLiquid = this.liquid;

            if (this.componentA.name === source) {
                this.liquid = this.componentB.suck(this.name);
            } else if (this.componentB.name === source) {
                this.liquid = this.componentA.suck(this.name);
            }
            this.draw();
        }

        return returnLiquid;
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
            this.draw();
        }
    }

    public close() {
        console.log(this.name + " close");

        if (this.isOpen) {
            this.isOpen = false;
            // this.liquid = Liquid.None; // ToDo: maybe?
            this.draw();
        }
    }

    private drain() {
        console.log(this.name + " drain");

        // if (this.isOpen) {

        if (this.liquid != null) {
            let result = this.componentB.fill(this.name, this.liquid);

            if (!result) {
                result = this.componentA.fill(this.name, this.liquid);
            }

            if (result) {

                this.liquid = null;
                clearTimeout(this.timer);
                this.draw();
            } else {
                console.error(this.name + " drain - failed");
            }
        }
        // }
    }

    private getColor(): number {
        if (this.liquid != null) {
            return this.liquid.type;
        } else {
            return 0xAAAAAA;
        }
    }
}

export default BallValve;
