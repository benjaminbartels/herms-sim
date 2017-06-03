
export enum LiquidType {
    // None = 0xAAAAAA,        // Gray
    ColdWater = 0x7FDBFF,   // Aqua
    HotWater = 0xFF4136,    // Red
    Wert = 0xFF851B,        // Orange
    Sanitizer = 0xB10DC9,   // Purple
    Cleaner = 0x01FF70,     /// Lime
}

export enum Orientation {
    LeftToRight = 1,
    TopToBottom,
    RightToLeft,
    BottomToTop,
}

export enum State {
    None = 0,
    FilledByA,
    SuckedByA,
    FilledByB,
    SuckedByB,
    FilledByC,
    SuckedByC,
    FilledByD,
    SuckedByD,
    FromA,
    FromB,
    FromC,
    ToA,
    ToB,
    ToC,
}
