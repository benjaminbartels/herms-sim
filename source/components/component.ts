import { Liquid } from "./liquid";

export interface Component {
    name: string; // ToDo:  Can this be removed?

    fill(source: Component, liquid: Liquid): boolean;
    suck(source: Component): Liquid;
    getTemperature(): number;
}
