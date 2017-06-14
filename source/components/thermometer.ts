import { Component } from "./component";

class Thermometer extends PIXI.Container {

    protected _name: string;
    private component: Component;
    private timer: number;
    private readonly size = 12;
    private readonly lineColor = 0x111111;
    private readonly interval = 1000;

    constructor(name: string, component: Component, x: number, y: number) {
        super();
        this._name = name;
        this.component = component;
        this.x = x;
        this.y = y;
        this.addChild(new PIXI.Graphics());
        let t = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        t.anchor.set(0.5, 0.9);
        this.addChild(t);
        let c = new PIXI.Text(this.name, new PIXI.TextStyle({ fontSize: 10 }));
        c.anchor.set(0.5, 0.1);
        this.addChild(c);
        this.timer = setInterval(() => this.draw(), this.interval);
        this.draw();
    }

    public get name(): string {
        return this._name;
    }

    public readTemperature() {
        return this.component.getTemperature();
    }

    private draw() {
        let g = <PIXI.Graphics>this.getChildAt(0);
        g.clear();
        g.lineStyle(1, this.lineColor);
        g.drawCircle(0, 0, this.size);
        g.endFill();
        this.children[0] = g;
        let c = <PIXI.Text>this.getChildAt(2);
        let t = this.component.getTemperature();
        if (t != null) {
            let f = t * 1.8 + 32;
            c.text = Math.round(f).toString();
        } else {
            c.text = "";
        }

        this.children[2] = c;
    }

}
export default Thermometer;
