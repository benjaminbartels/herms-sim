import { LiquidType } from "./enums";

export class Liquid {
    public id: number;
    public type: LiquidType;
    public isPressurized: boolean;

    constructor(id: number, type: LiquidType, isPressurized: boolean) {
        this.id = id;
        this.type = type;
        this.isPressurized = isPressurized;
    }
}

