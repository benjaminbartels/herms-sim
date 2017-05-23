import * as PIXI from "pixi.js";
import { Liquid, Orientation } from "./enums";

class BallValve {
    public name: string;
    public position: [number, number];
    public orientation: Orientation;
    public isMotorized: boolean;
    public liquid: Liquid;
    public component1: any;
    public component2: any;
    public component1Pressure: number;
    public component2Pressure: number;
    public component1Port: [number, number];
    public component2Port: [number, number];
    public isOpen: boolean;
    private g: PIXI.Graphics;
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
        this.component1Pressure = 0;
        this.component2Pressure = 0;
        this.g = new PIXI.Graphics;
        if (!isMotorized) {
            this.g.interactive = true;
            this.g.buttonMode = true;
            this.g.on("pointerdown", () => { this.toggle(); });
        }
        app.stage.addChild(this.g);
        this.draw();

        switch (this.orientation) {

            case Orientation.LeftToRight:
                this.component1Port = [position[0] - (this.width / 2), position[1]];
                this.component2Port = [position[0] + (this.width / 2), position[1]];
                break;
            case Orientation.TopToBottom:
                this.component1Port = [position[0], position[1] - (this.width / 2)];
                this.component2Port = [position[0], position[1] + (this.width / 2)];
                break;
            case Orientation.RightToLeft:
                this.component1Port = [position[0] + (this.width / 2), position[1]];
                this.component2Port = [position[0] - (this.width / 2), position[1]];
                break;
            case Orientation.BottomToTop:
                this.component1Port = [position[0], position[1] + (this.width / 2)];
                this.component2Port = [position[0], position[1] - (this.width / 2)];
                break;
        }
    }

    public draw() {
        console.log("draw called on", this.name);

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
        this.component1 = component;
        return this.component1Port;
    }

    public connectToB(component: any) {
        this.component2 = component;
        return this.component2Port;
    }

    public fill(source: any) {
        console.log("fill called on", this.name);

        if (this.component1 != null && this.component1.name === source.name) {
            if (this.component1Pressure !== 1) {
                this.component1Pressure = 1;
                if (this.isOpen) {
                    this.liquid = source.liquid;
                    this.component2.fill(this);
                }
            }
        } else if (this.component2 != null && this.component2.name === source.name) {
            if (this.component2Pressure !== 1) {
                this.component2Pressure = 1;
                if (this.isOpen) {
                    this.liquid = source.liquid;
                    this.component1.fill(this);
                }
            }
        }
        this.draw();
    }

    public suck(source: any) {
        console.log("suck called on", this.name);

        if (this.component1 != null && this.component1.name === source.name) {
            if (this.component1Pressure !== -1) {
                this.component1Pressure = -1;
                if (this.isOpen) {
                    this.component2.suck(this);
                }
            }
        } else if (this.component2 != null && this.component2.name === source.name) {
            if (this.component2Pressure !== -1) {
                this.component2Pressure = -1;
                if (this.isOpen) {
                    this.component1.suck(this);
                }
            }
        }
    }

    public stop(source: any) {
        console.log("stop called on", this.name);

        if (this.component1 != null && this.component1.name === source.name) {
            if (this.component1Pressure !== 0) {
                this.component1Pressure = 0;
                if (this.component2Pressure === 0) {
                    this.liquid = Liquid.None;
                    if (this.component2 != null && this.component2.stop != null) {
                        this.component2.stop(this);
                    }
                }
            }
        } else if (this.component2 != null && this.component2.name === source.name) {
            if (this.component2Pressure !== 0) {
                this.component2Pressure = 0;
                if (this.component1Pressure === 0) {
                    this.liquid = Liquid.None;
                    if (this.component1 != null && this.component1.stop != null) {
                        this.component1.stop(this);
                    }
                }
            }
        }
        this.draw();
    }

    public notify(source: any) {
        console.log("notify called on", this.name);

        if (this.isOpen) {
            this.liquid = source.liquid;
            if (this.component1 != null && this.component1.name === source.name) {
                this.component2.notify(this);
            } else if (this.component2 != null && this.component2.name === source.name) {
                this.component1.notify(this);
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
        console.log("open " + this.name + " called.");

        if (!this.isOpen) {

            this.isOpen = true;

            if (this.component1Pressure === 1) {
                this.liquid = this.component1.liquid;
                this.component2.fill(this);
            } else if (this.component1Pressure === -1) {
                this.component2.suck(this);
            }

            if (this.component2Pressure === 1) {
                this.liquid = this.component2.liquid;
                this.component1.fill(this);
            } else if (this.component2Pressure === -1) {
                this.component1.suck(this);
            }

            this.draw();
        }
    }

    public close() {
        console.log("close " + this.name + " called.");

        if (this.isOpen) {

            this.isOpen = false;
            this.liquid = Liquid.None;

            if (this.component1Pressure === -1) {
                this.component2.stop(this);
                this.component1.notify(this);
            } else if (this.component1Pressure === 1) {
                this.component2.stop(this);
            }

            if (this.component2Pressure === -1) {
                this.component1.stop(this);
                this.component2.notify(this);
            } else if (this.component2Pressure === 1) {
                this.component1.stop(this);
            }

            this.draw();
        }
    }
}

export default BallValve;
