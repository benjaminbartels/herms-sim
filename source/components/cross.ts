import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";
import { Port } from "./Port";
import { Component } from "./component";
import { Fixture } from "./fixture";

class Cross extends Fixture {
    private componentA: Component;
    private componentB: Component;
    private componentC: Component;
    private componentD: Component;
    private componentAPort: Port;
    private componentBPort: Port;
    private componentCPort: Port;
    private componentDPort: Port;
    private lastFill: string;
    private lastSuck: string;
    private drainTimer: number;
    private readonly drainInterval = 1000;
    private readonly size = 5;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.componentAPort = new Port(x, y);
        this.componentBPort = new Port(x, y);
        this.componentCPort = new Port(x, y);
        this.componentDPort = new Port(x, y);
        this.liquid = null;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        this.addChild(t);
        this.draw();
    }

    public connectToA(component: Component) {
        this.componentA = component;
        return this.componentAPort;
    }

    public connectToB(component: Component) {
        this.componentB = component;
        return this.componentBPort;
    }

    public connectToC(component: Component) {
        this.componentC = component;
        return this.componentCPort;
    }

    public connectToD(component: Component) {
        this.componentD = component;
        return this.componentDPort;
    }

    public fill(source: Component, liquid: Liquid): boolean {

        let result = false;

        clearInterval(this.drainTimer);

        if (this.liquid == null && liquid != null) {
            this.liquid = liquid;
            result = true;
        } else {
            if (this.componentA != null && this.componentA.name === source.name) {
                if (this.lastFill === "B") {
                    result = this.componentC.fill(this, this.liquid);
                    this.lastFill = "C";
                } else if (this.lastFill === "C") {
                    result = this.componentD.fill(this, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentB.fill(this, this.liquid);
                    this.lastFill = "B";
                }

                if (!result) {
                    if (this.lastFill === "B") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    }
                }

                if (!result) {
                    if (this.lastFill === "B") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    }
                }

            } else if (this.componentB != null && this.componentB.name === source.name) {
                if (this.lastFill === "A") {
                    result = this.componentC.fill(this, this.liquid);
                    this.lastFill = "C";
                } else if (this.lastFill === "C") {
                    result = this.componentD.fill(this, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentA.fill(this, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }

            } else if (this.componentC != null && this.componentC.name === source.name) {
                if (this.lastFill === "A") {
                    result = this.componentB.fill(this, this.liquid);
                    this.lastFill = "B";
                } else if (this.lastFill === "B") {
                    result = this.componentD.fill(this, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentA.fill(this, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentD.fill(this, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }


            } else if (this.componentD != null && this.componentD.name === source.name) {
                if (this.lastFill === "A") {
                    result = this.componentB.fill(this, this.liquid);
                    this.lastFill = "B";
                } else if (this.lastFill === "B") {
                    result = this.componentC.fill(this, this.liquid);
                    this.lastFill = "C";
                } else {
                    result = this.componentA.fill(this, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentC.fill(this, this.liquid);
                        this.lastFill = "C";
                    } else {
                        result = this.componentA.fill(this, this.liquid);
                        this.lastFill = "A";
                    }
                }

            }

            if (result) {
                this.liquid = liquid;
            }
        }
        this.draw();
        this.drainTimer = setInterval(() => this.drain(), this.drainInterval);
        return result;
    }


    public suck(source: any): Liquid {

        let returnLiquid = this.liquid;

        if (this.componentA.name === source) {

            if (this.lastSuck === "B") {
                this.liquid = this.componentC.suck(this);
                this.lastSuck = "C";
            } else if (this.lastSuck === "C") {
                this.liquid = this.componentD.suck(this);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentB.suck(this);
                this.lastSuck = "B";
            }

            if (!this.liquid) {
                if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                }
            }

        } else if (this.componentB.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentC.suck(this);
                this.lastSuck = "C";
            } else if (this.lastSuck === "C") {
                this.liquid = this.componentD.suck(this);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentA.suck(this);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }

        } else if (this.componentC.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentB.suck(this);
                this.lastSuck = "B";
            } else if (this.lastSuck === "B") {
                this.liquid = this.componentD.suck(this);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentA.suck(this);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }
            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentD.suck(this);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }
        } else if (this.componentD.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentB.suck(this);
                this.lastSuck = "B";
            } else if (this.lastSuck === "B") {
                this.liquid = this.componentC.suck(this);
                this.lastSuck = "C";
            } else {
                this.liquid = this.componentA.suck(this);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this);
                    this.lastSuck = "C";
                } else {
                    this.liquid = this.componentA.suck(this);
                    this.lastSuck = "A";
                }
            }
        }

        this.draw();
        return returnLiquid;
    }

    private drain() {
        console.log(this.name + " drain");

        if (this.liquid != null) {

            let result = this.componentD.fill(this, this.liquid);

            if (!result) {
                result = this.componentC.fill(this, this.liquid);
            }

            if (!result) {
                result = this.componentB.fill(this, this.liquid);
            }

            if (!result) {
                result = this.componentA.fill(this, this.liquid);
            }

            if (result) {
                this.liquid = null;
                this.draw();
            }
        }

        clearInterval(this.drainTimer);
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.beginFill(this.getColor());
        g.drawCircle(0, 0, this.size);
        g.endFill();
        this.children[0] = g;
    }
}

export default Cross;
