import * as PIXI from "pixi.js";

class Drain {
    public name: string;
    public position: [number, number];
    public component: any;
    public port: [number, number];
    public isOn: boolean;
    private g: PIXI.Graphics;
    private t: PIXI.Text;
    private readonly size = 20;

    constructor(name: string, position: [number, number], app: PIXI.Application) {
        this.position = position;
        this.name = name;
        this.isOn = false;
        this.port = position;
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
        this.g.clear();
        this.g.lineStyle(1, 0x111111);
        this.g.drawCircle(this.position[0], this.position[1], this.size);

    }

    public connect(component: any) {
        this.component = component;
        return this.port;
    }
}

export default Drain;
