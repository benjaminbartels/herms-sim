import * as PIXI from "pixi.js";
import { Liquid } from "./liquid";

class Cross {
    public name: string;
    public position: [number, number];
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
    private timer: number;
    private lastFill: string;
    private lastSuck: string;
    private readonly size = 5;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.name = name;
        this.position = position;
        this.liquid = null;
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
        this.g.beginFill(this.getColor());
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

    public fill(source: string, liquid: Liquid): boolean {
        console.log(this.name + " fill - source: " + source);

        let result = false;

        clearTimeout(this.timer);

        if (this.liquid == null && liquid != null) {
            this.liquid = liquid;
            result = true;
        } else {

            if (this.componentA != null && this.componentA.name === source) {
                //  console.log(this.name + " fill - from A " + liquid.id);
                if (this.lastFill === "B") {
                    result = this.componentC.fill(this.name, this.liquid);
                    this.lastFill = "C";
                } else if (this.lastFill === "C") {
                    result = this.componentD.fill(this.name, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentB.fill(this.name, this.liquid);
                    this.lastFill = "B";
                }

                if (!result) {
                    if (this.lastFill === "B") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    }
                }

                if (!result) {
                    if (this.lastFill === "B") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    }
                }

            } else if (this.componentB != null && this.componentB.name === source) {

                //    console.log(this.name + " fill - from B " + liquid.id);

                if (this.lastFill === "A") {
                    result = this.componentC.fill(this.name, this.liquid);
                    this.lastFill = "C";
                } else if (this.lastFill === "C") {
                    result = this.componentD.fill(this.name, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentA.fill(this.name, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else if (this.lastFill === "C") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }

            } else if (this.componentC != null && this.componentC.name === source) {
                //  console.log(this.name + " fill - from C" + liquid.id);

                if (this.lastFill === "A") {
                    result = this.componentB.fill(this.name, this.liquid);
                    this.lastFill = "B";
                } else if (this.lastFill === "B") {
                    result = this.componentD.fill(this.name, this.liquid);
                    this.lastFill = "D";
                } else {
                    result = this.componentA.fill(this.name, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentD.fill(this.name, this.liquid);
                        this.lastFill = "D";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }


            } else if (this.componentD != null && this.componentD.name === source) {
                // console.log(this.name + " fill - from D" + liquid.id);

                if (this.lastFill === "A") {
                    result = this.componentB.fill(this.name, this.liquid);
                    this.lastFill = "B";
                } else if (this.lastFill === "B") {
                    result = this.componentC.fill(this.name, this.liquid);
                    this.lastFill = "C";
                } else {
                    result = this.componentA.fill(this.name, this.liquid);
                    this.lastFill = "A";
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }

                if (!result) {
                    if (this.lastFill === "A") {
                        result = this.componentB.fill(this.name, this.liquid);
                        this.lastFill = "B";
                    } else if (this.lastFill === "B") {
                        result = this.componentC.fill(this.name, this.liquid);
                        this.lastFill = "C";
                    } else {
                        result = this.componentA.fill(this.name, this.liquid);
                        this.lastFill = "A";
                    }
                }

            }

            if (result) {
                this.liquid = liquid;
            }
        }
        this.draw();
        this.timer = setInterval(() => this.drain(), 1000);
        return result;
    }


    public suck(source: any): Liquid {
        console.log(this.name + " suck - source: " + source);

        let returnLiquid = this.liquid;

        if (this.componentA.name === source) {

            if (this.lastSuck === "B") {
                this.liquid = this.componentC.suck(this.name);
                this.lastSuck = "C";
            } else if (this.lastSuck === "C") {
                this.liquid = this.componentD.suck(this.name);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentB.suck(this.name);
                this.lastSuck = "B";
            }

            if (!this.liquid) {
                if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                }
            }

        } else if (this.componentB.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentC.suck(this.name);
                this.lastSuck = "C";
            } else if (this.lastSuck === "C") {
                this.liquid = this.componentD.suck(this.name);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentA.suck(this.name);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this.name);
                    this.lastSuck = "A";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else if (this.lastSuck === "C") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this.name);
                    this.lastSuck = "A";
                }
            }

        } else if (this.componentC.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentB.suck(this.name);
                this.lastSuck = "B";
            } else if (this.lastSuck === "B") {
                this.liquid = this.componentD.suck(this.name);
                this.lastSuck = "D";
            } else {
                this.liquid = this.componentA.suck(this.name);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this.name);
                    this.lastSuck = "A";
                }
            }
            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentD.suck(this.name);
                    this.lastSuck = "D";
                } else {
                    this.liquid = this.componentA.suck(this.name);
                    this.lastSuck = "A";
                }
            }
        } else if (this.componentD.name === source) {
            if (this.lastSuck === "A") {
                this.liquid = this.componentB.suck(this.name);
                this.lastSuck = "B";
            } else if (this.lastSuck === "B") {
                this.liquid = this.componentC.suck(this.name);
                this.lastSuck = "C";
            } else {
                this.liquid = this.componentA.suck(this.name);
                this.lastSuck = "A";
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else {
                    this.liquid = this.componentA.suck(this.name);
                    this.lastSuck = "A";
                }
            }

            if (!this.liquid) {
                if (this.lastSuck === "A") {
                    this.liquid = this.componentB.suck(this.name);
                    this.lastSuck = "B";
                } else if (this.lastSuck === "B") {
                    this.liquid = this.componentC.suck(this.name);
                    this.lastSuck = "C";
                } else {
                    this.liquid = this.componentA.suck(this.name);
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
            this.liquid.isPressurized = false;

            let result = this.componentD.fill(this.name, this.liquid);

            if (!result) {
                result = this.componentC.fill(this.name, this.liquid);
            }

            if (!result) {
                result = this.componentB.fill(this.name, this.liquid);
            }

            if (!result) {
                result = this.componentA.fill(this.name, this.liquid);
            }

            if (result) {
                this.liquid = null;
                clearTimeout(this.timer);
                this.draw();
            }
        }
    }

    private getColor(): number {
        if (this.liquid != null) {
            return this.liquid.type;
        } else {
            return 0xAAAAAA;
        }
    }
}

export default Cross;
