import { Tank } from "./tank";

// BrewKettle
export class HeatedTank extends Tank {
    protected heatTimer: number;
    protected isOn: boolean;
    protected readonly temperatureInterval = 300;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.draw();
    }

    public heatOn() {
        if (!this.isOn) {
            console.log(this.name + " heatOn");
            this.isOn = true;
            this.heatTimer = setInterval(() => this.heat(), this.temperatureInterval);
        }
    }

    public heatOff() {
        if (this.heatOn) {
            console.log(this.name + " heatOff");
            this.isOn = false;
            clearInterval(this.heatTimer);
        }
    }

    private heat() {

        for (let i = 0; i < this.liquids.length; i++) {
            let t = this.liquids[i].temperature;
            t = t + 1;
            this.liquids[i].temperature = t;
        }

        this.draw();
    }
}
export default HeatedTank;
