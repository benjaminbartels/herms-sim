import * as PIXI from "pixi.js";
import { Orientation } from "./components/enums";
import Faucet from "./components/faucet";
// import Pump from "./components/pump";
import BallValve from "./components/valve";
import Tube from "./components/tube";
import CheckValve from "./components/checkvalve";
import Tee from "./components/tee";
import HotLiquorTank from "./components/hotliquortank";
import BrewKettle from "./components/brewkettle";

let app = new PIXI.Application(1000, 1000, { antialias: true });
app.renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(app.view);

// Fill HLT with water
let faucet1 = new Faucet("faucet1", [100, 100], app);
let tee1 = new Tee("tee1,", [150, 100], app);
let valve1 = new BallValve("valve1", [200, 100], Orientation.LeftToRight, false, app);
let valve2 = new BallValve("valve2", [150, 150], Orientation.TopToBottom, false, app);
let tee2 = new Tee("tee2,", [150, 200], app);
let mValve1 = new BallValve("mValve1", [200, 200], Orientation.LeftToRight, true, app);
let tee3 = new Tee("tee3,", [150, 300], app);
let mValve2 = new BallValve("mValve2", [200, 300], Orientation.LeftToRight, true, app);
let check1 = new CheckValve("check1", [150, 350], Orientation.BottomToTop, app);
let check2 = new CheckValve("check2", [400, 200], Orientation.LeftToRight, app);
let tee4 = new Tee("tee4,", [450, 200], app);
let mValve3 = new BallValve("mValve3", [450, 250], Orientation.TopToBottom, true, app);
let mValve4 = new BallValve("mValve4", [500, 200], Orientation.LeftToRight, true, app);
let tee5 = new Tee("tee5,", [550, 200], app);
let mValve5 = new BallValve("mValve5", [550, 250], Orientation.TopToBottom, true, app);
let mValve6 = new BallValve("mValve6", [600, 200], Orientation.LeftToRight, true, app);
let tee6 = new Tee("tee6,", [750, 200], app);
let mValve7 = new BallValve("mValve7", [750, 250], Orientation.TopToBottom, true, app);
let mValve8 = new BallValve("mValve8", [800, 200], Orientation.LeftToRight, true, app);


let hotLiquorTank = new HotLiquorTank("htl", [350, 450], app);
let brewKettle = new BrewKettle("brewKettle", [850, 450], app);

let tube1 = new Tube("tube1", app);
let tube2 = new Tube("tube2", app);
let tube3 = new Tube("tube3", app);
let tube4 = new Tube("tube4", app);
let tube5 = new Tube("tube5", app);
let tube6 = new Tube("tube6", app);
let tube7 = new Tube("tube7", app);
let tube8 = new Tube("tube8", app);
let tube9 = new Tube("tube9", app);
let tube10 = new Tube("tube10", app);
let tube11 = new Tube("tube11", app);
let tube12 = new Tube("tube12", app);
let tube13 = new Tube("tube13", app);
let tube14 = new Tube("tube14", app);
let tube15 = new Tube("tube15", app);
let tube16 = new Tube("tube16", app);
let tube17 = new Tube("tube17", app);
let tube18 = new Tube("tube18", app);
let tube19 = new Tube("tube19", app);
let tube20 = new Tube("tube20", app);

tube1.connectToA(faucet1, faucet1.connect(tube1));
tube1.connectToB(tee1, tee1.connectToA(tube1));

tube2.connectToA(tee1, tee1.connectToB(tube2));
tube2.connectToB(valve1, valve1.connectToA(tube2));

tube3.connectToA(tee1, tee1.connectToC(tube3));
tube3.connectToB(valve2, valve2.connectToA(tube3));

tube4.connectToA(valve2, valve2.connectToB(tube4));
tube4.connectToB(tee2, tee2.connectToA(tube4));

tube5.connectToA(tee2, tee2.connectToB(tube5));
tube5.connectToB(mValve1, mValve1.connectToA(tube5));

tube6.connectToA(tee2, tee2.connectToC(tube6));
tube6.connectToB(tee3, tee3.connectToA(tube6));

tube7.connectToA(tee3, tee3.connectToB(tube7));
tube7.connectToB(mValve2, mValve2.connectToA(tube7));

tube8.connectToA(tee3, tee3.connectToC(tube8));
tube8.connectToB(check1, check1.connectToOut(tube8));

tube9.connectToA(mValve2, mValve2.connectToB(tube9));
tube9.connectToB(hotLiquorTank, hotLiquorTank.connectToTop(tube9));

tube10.connectToA(mValve1, mValve1.connectToB(tube10));
tube10.connectToB(check2, check2.connectToIn(tube10));

tube11.connectToA(check2, check2.connectToOut(tube11));
tube11.connectToB(tee4, tee4.connectToA(tube11));

tube12.connectToA(tee4, tee4.connectToB(tube12));
tube12.connectToB(mValve3, mValve3.connectToA(tube12));

tube13.connectToA(tee4, tee4.connectToC(tube13));
tube13.connectToB(mValve4, mValve4.connectToA(tube13));

tube14.connectToA(mValve4, mValve4.connectToB(tube14));
tube14.connectToB(tee5, tee5.connectToA(tube14));

tube15.connectToA(tee5, tee5.connectToB(tube15));
tube15.connectToB(mValve5, mValve5.connectToA(tube15));

tube16.connectToA(tee5, tee5.connectToC(tube16));
tube16.connectToB(mValve6, mValve6.connectToA(tube16));

tube17.connectToA(mValve6, mValve6.connectToB(tube17));
tube17.connectToB(tee6, tee6.connectToA(tube17));

tube18.connectToA(tee6, tee6.connectToB(tube18));
tube18.connectToB(mValve7, mValve7.connectToA(tube18));

tube19.connectToA(tee6, tee6.connectToC(tube19));
tube19.connectToB(mValve8, mValve8.connectToA(tube19));

tube20.connectToA(mValve7, mValve7.connectToB(tube20));
tube20.connectToB(brewKettle, brewKettle.connectToTop(tube20));

// Motorized Methods

document.getElementById("fullStop").addEventListener("click", () => fullStop());
document.getElementById("fillHlt").addEventListener("click", () => fillHlt());
document.getElementById("fillBrewKettle").addEventListener("click", () => fillBrewKettle());

function fullStop() {
    mValve1.close();
    mValve2.close();
    mValve3.close();
    mValve4.close();
    mValve5.close();
    mValve6.close();
    mValve7.close();
    mValve8.close();
}

function fillHlt() {
    mValve1.close();
    mValve2.open();
    mValve3.close();
    mValve4.close();
    mValve5.close();
    mValve6.close();
    mValve7.close();
    mValve8.close();
}

function fillBrewKettle() {
    mValve1.open();
    mValve2.close();
    mValve3.close();
    mValve4.open();
    mValve5.close();
    mValve6.open();
    mValve7.open();
    mValve8.close();
}
