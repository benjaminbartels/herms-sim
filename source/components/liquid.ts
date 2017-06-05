import { LiquidType } from "./enums";

export class Liquid {
    public id: number;
    public type: LiquidType;

    constructor(id: number, type: LiquidType) {
        this.id = id;
        this.type = type;
    }
}

