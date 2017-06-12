import { Tank } from "./tank";

class BrewKettle extends Tank {

    public temperature: number;
    private temperatureTimer: number;
    private isOn: boolean;
    private readonly temperatureInterval = 1000;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.temperature = 71;
        this.draw();
    }

    public heatOn() {
        console.log(this.name + " heatOn");
        this.isOn = true;
        this.temperatureTimer = setInterval(() => this.applyHeat(), this.temperatureInterval);
    }

    public heatOff() {
        console.log(this.name + " heatOff");
        this.isOn = false;
        clearInterval(this.temperatureTimer);
    }

    public setTemperature(temperature: number) {
        this.temperature = temperature;
    }

    private applyHeat() {

        for (let i = 0; i < this.liquids.length; i++) {
            let t = this.liquids[i].temperature;
            if (t < this.temperature) {
                t = t + 5;
                this.liquids[i].temperature = t;
            }
        }

        this.draw();
    }
}

export default BrewKettle;
