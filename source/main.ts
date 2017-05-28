import * as PIXI from "pixi.js";
import { Orientation } from "./components/enums";
import Faucet from "./components/faucet";
import Pump from "./components/pump";
import BallValve from "./components/valve";
import Tube from "./components/tube";
import CheckValve from "./components/checkvalve";
import Tee from "./components/tee";
import Cross from "./components/cross";
import CounterFlowChiller from "./components/counterflowchiller";
import HotLiquorTank from "./components/hotliquortank";
import MashTun from "./components/mashtun";
import BrewKettle from "./components/brewkettle";


let app = new PIXI.Application(1200, 1200, { antialias: true });
app.renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(app.view);


let faucet1 = new Faucet("f1", [100, 100], app);
let tee1 = new Tee("T1", [150, 100], app);
let valve1 = new BallValve("v1", [200, 100], Orientation.LeftToRight, false, app);
let valve2 = new BallValve("v2", [150, 150], Orientation.TopToBottom, false, app);
let tee2 = new Tee("T2", [150, 200], app);
let mValve1 = new BallValve("m1", [200, 200], Orientation.LeftToRight, true, app);
let tee3 = new Tee("T3", [150, 300], app);
let mValve2 = new BallValve("m2", [200, 300], Orientation.LeftToRight, true, app);
let check1 = new CheckValve("c1", [150, 350], Orientation.BottomToTop, app);
let check2 = new CheckValve("c2", [400, 200], Orientation.LeftToRight, app);
let tee4 = new Tee("T4", [450, 200], app);
let mValve3 = new BallValve("m3", [450, 250], Orientation.TopToBottom, true, app);
let mValve4 = new BallValve("m4", [500, 200], Orientation.LeftToRight, true, app);
let tee5 = new Tee("T5", [550, 200], app);
let mValve5 = new BallValve("m5", [550, 250], Orientation.TopToBottom, true, app);
let mValve6 = new BallValve("m6", [600, 200], Orientation.LeftToRight, true, app);
let tee6 = new Tee("T6", [750, 200], app);
let mValve7 = new BallValve("m7", [750, 250], Orientation.TopToBottom, true, app);
let mValve8 = new BallValve("m8", [800, 200], Orientation.LeftToRight, true, app);
let pump1 = new Pump("p1", [200, 600], Orientation.RightToLeft, app);
let tee7 = new Tee("T7", [250, 600], app);
let valve3 = new BallValve("v3", [250, 650], Orientation.TopToBottom, false, app);

let mValve10 = new BallValve("m10", [800, 600], Orientation.LeftToRight, true, app);
let tee8 = new Tee("T8", [750, 600], app);
let mValve9 = new BallValve("m9", [700, 600], Orientation.LeftToRight, true, app);
let pump2 = new Pump("p2", [750, 650], Orientation.TopToBottom, app);
let check3 = new CheckValve("c3,", [750, 700], Orientation.TopToBottom, app);
let cross1 = new Cross("C1", [750, 750], app);
let mValve11 = new BallValve("m11", [700, 750], Orientation.LeftToRight, true, app);
let mValve12 = new BallValve("m12", [800, 750], Orientation.LeftToRight, true, app);
let valve4 = new BallValve("v4", [750, 800], Orientation.TopToBottom, false, app);
let tee9 = new Tee("T9", [950, 750], app);
let valve5 = new BallValve("v5", [1000, 750], Orientation.LeftToRight, false, app);
let check4 = new CheckValve("c4,", [1050, 700], Orientation.TopToBottom, app);
let tee10 = new Tee("T10", [1050, 750], app);

let hotLiquorTank = new HotLiquorTank("HLT", [350, 450], app);
let hltValve = new BallValve("hltv", [hotLiquorTank.bottomComponentPort[0], hotLiquorTank.bottomComponentPort[1]],
    Orientation.TopToBottom, false, app);
hotLiquorTank.connectToBottom(hltValve);
hltValve.connectToA(hotLiquorTank);
let hltCoilValve = new BallValve("hltcv", [hotLiquorTank.coilBottomComponentPort[0], hotLiquorTank.coilBottomComponentPort[1]],
    Orientation.LeftToRight, false, app);
hotLiquorTank.connectToCoilBottom(hltCoilValve);
hltCoilValve.connectToA(hotLiquorTank);

let mashTun = new MashTun("MT", [600, 450], app);
let mtValve = new BallValve("mtv", [mashTun.bottomComponentPort[0], mashTun.bottomComponentPort[1]],
    Orientation.TopToBottom, false, app);
mashTun.connectToBottom(mtValve);
mtValve.connectToA(mashTun);


let brewKettle = new BrewKettle("BK", [850, 450], app);
let bkValve = new BallValve("bkv", [brewKettle.bottomComponentPort[0], brewKettle.bottomComponentPort[1]],
    Orientation.TopToBottom, false, app);
brewKettle.connectToBottom(bkValve);
bkValve.connectToA(brewKettle);

let counterFlowChiller = new CounterFlowChiller("cfc", [1000, 200], app);

let tube1 = new Tube("t1", app);
let tube2 = new Tube("t2", app);
let tube3 = new Tube("t3", app);
let tube4 = new Tube("t4", app);
let tube5 = new Tube("t5", app);
let tube6 = new Tube("t6", app);
let tube7 = new Tube("t7", app);
let tube8 = new Tube("t8", app);
let tube9 = new Tube("t9", app);
let tube10 = new Tube("t10", app);
let tube11 = new Tube("t11", app);
let tube12 = new Tube("t12", app);
let tube13 = new Tube("t13", app);
let tube14 = new Tube("t14", app);
let tube15 = new Tube("t15", app);
let tube16 = new Tube("t16", app);
let tube17 = new Tube("t17", app);
let tube18 = new Tube("t18", app);
let tube19 = new Tube("t19", app);
let tube20 = new Tube("t20", app);
let tube21 = new Tube("t21", app);
let tube22 = new Tube("t22", app);
let tube23 = new Tube("t23", app);
let tube24 = new Tube("t24", app);
let tube25 = new Tube("t25", app);
let tube26 = new Tube("t26", app);
let tube27 = new Tube("t27", app);
let tube28 = new Tube("t28", app);
let tube29 = new Tube("t29", app);
let tube30 = new Tube("t30", app);
let tube31 = new Tube("t31", app);
let tube32 = new Tube("t32", app);
let tube33 = new Tube("t33", app);
let tube34 = new Tube("t34", app);
let tube35 = new Tube("t35", app);
let tube36 = new Tube("t36", app);
let tube37 = new Tube("t37", app);
let tube38 = new Tube("t38", app);
let tube39 = new Tube("t39", app);
let tube40 = new Tube("t40", app);
let tube41 = new Tube("t41", app);
let tube42 = new Tube("t42", app);
let tube43 = new Tube("t43", app);
let tube44 = new Tube("t44", app);
let tube45 = new Tube("t45", app);


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

tube21.connectToA(check1, check1.connectToIn(tube21));
tube21.connectToB(pump1, pump1.connectToOut(tube21));

tube22.connectToA(pump1, pump1.connectToIn(tube22));
tube22.connectToB(tee7, tee7.connectToA(tube22));

tube23.connectToA(tee7, tee7.connectToB(tube23));
tube23.connectToB(hltValve, hltValve.connectToB(tube23));

tube24.connectToA(tee7, tee7.connectToC(tube24));
tube24.connectToB(valve3, valve3.connectToA(tube24));

tube25.connectToA(bkValve, bkValve.connectToB(tube25));
tube25.connectToB(mValve10, mValve10.connectToB(tube25));

tube26.connectToA(mValve10, mValve10.connectToA(tube26));
tube26.connectToB(tee8, tee8.connectToA(tube26));

tube27.connectToA(tee8, tee8.connectToB(tube27));
tube27.connectToB(mValve9, mValve9.connectToB(tube27));

tube28.connectToA(tee8, tee8.connectToC(tube28));
tube28.connectToB(pump2, pump2.connectToIn(tube28));

tube29.connectToA(pump2, pump2.connectToOut(tube29));
tube29.connectToB(check3, check3.connectToIn(tube29));

tube30.connectToA(check3, check3.connectToOut(tube30));
tube30.connectToB(cross1, cross1.connectToA(tube30));

tube31.connectToA(cross1, cross1.connectToB(tube31));
tube31.connectToB(mValve11, mValve11.connectToB(tube31));

tube32.connectToA(cross1, cross1.connectToC(tube32));
tube32.connectToB(mValve12, mValve12.connectToA(tube32));

tube33.connectToA(cross1, cross1.connectToD(tube33));
tube33.connectToB(valve4, valve4.connectToA(tube33));

tube34.connectToA(mValve12, mValve12.connectToB(tube34));
tube34.connectToB(tee9, tee9.connectToA(tube34));

tube35.connectToA(tee9, tee9.connectToB(tube35));
tube35.connectToB(valve5, valve5.connectToA(tube35));

tube36.connectToA(tee9, tee9.connectToC(tube36));
tube36.connectToB(counterFlowChiller, counterFlowChiller.connectToWertIn(tube36));

tube37.connectToA(mValve8, mValve8.connectToB(tube37));
tube37.connectToB(counterFlowChiller, counterFlowChiller.connectToWertOut(tube37));

tube38.connectToA(valve1, valve1.connectToB(tube38));
tube38.connectToB(counterFlowChiller, counterFlowChiller.connectToWaterIn(tube38));

tube39.connectToA(valve5, valve5.connectToB(tube39));
tube39.connectToB(tee10, tee10.connectToA(tube39));

tube40.connectToA(tee10, tee10.connectToB(tube40));
tube40.connectToB(check4, check4.connectToOut(tube40));

tube41.connectToA(check4, check4.connectToIn(tube41));
tube41.connectToB(counterFlowChiller, counterFlowChiller.connectToWaterOut(tube41));

tube42.connectToA(mValve3, mValve3.connectToB(tube42));
tube42.connectToB(mashTun, mashTun.connectToTop(tube42));

tube43.connectToA(mValve5, mValve5.connectToB(tube43));
tube43.connectToB(hotLiquorTank, hotLiquorTank.connectToCoilTop(tube43));

tube44.connectToA(hltCoilValve, hltCoilValve.connectToB(tube44));
tube44.connectToB(mValve11, mValve11.connectToA(tube44));

tube45.connectToA(mtValve, mtValve.connectToB(tube45));
tube45.connectToB(mValve9, mValve9.connectToA(tube45));

// Motorized Methods

document.getElementById("fullStop").addEventListener("click", () => fullStop());
document.getElementById("fillHlt").addEventListener("click", () => fillHlt());
document.getElementById("fillBk").addEventListener("click", () => fillBk());
document.getElementById("heatHlt").addEventListener("click", () => heatHlt());
document.getElementById("heatBk").addEventListener("click", () => heatBk());
document.getElementById("strikeOrMashIn").addEventListener("click", () => strikeOrMashIn());
document.getElementById("mash").addEventListener("click", () => mash());

function fullStop() {
    mValve1.close();
    mValve2.close();
    mValve3.close();
    mValve4.close();
    mValve5.close();
    mValve6.close();
    mValve7.close();
    mValve8.close();
    mValve9.close();
    mValve10.close();
    mValve11.close();
    mValve12.close();
    pump1.off();
    pump2.off();
    hotLiquorTank.heatOff();
    brewKettle.heatOff();
}

function fillHlt() {
    mValve1.close();
    mValve2.open();
}

function fillBk() {
    mValve1.open();
    mValve2.close();
    mValve3.close();
    mValve4.open();
    mValve5.close();
    mValve6.open();
    mValve7.open();
    mValve8.close();
}

function heatHlt() {
    mValve1.close();
    mValve2.open();
    pump1.on();
    hotLiquorTank.heatOn();
}

function heatBk() {
    mValve6.close();
    mValve7.open();
    mValve8.open();
    mValve9.close();
    mValve10.open();
    mValve11.close();
    mValve12.open();
    pump2.on();
    brewKettle.heatOn();
}

function strikeOrMashIn() {
    mValve1.close();
    mValve2.open();
    mValve3.open();
    mValve4.open();
    mValve6.open();
    mValve7.close();
    mValve8.open();
    mValve9.close();
    mValve10.open();
    mValve11.close();
    mValve12.open();
    pump1.on();
    pump2.on();
    hotLiquorTank.heatOn();
    brewKettle.heatOff();
}

function mash() {
    mValve1.close();
    mValve2.open();
    mValve3.open();
    mValve4.open();
    mValve5.open();
    mValve6.close();
    mValve9.open();
    mValve10.close();
    mValve11.open();
    mValve12.close();
    pump1.on();
    pump2.on();
    hotLiquorTank.heatOn();
    brewKettle.heatOff();
}
