// import * as PIXI from "pixi.js";
import { Orientation } from "./components/enums";
import Faucet from "./components/faucet";
import Pump from "./components/pump";
import BallValve from "./components/ballvalve";
import Tube from "./components/tube";
import CheckValve from "./components/checkvalve";
import Tee from "./components/tee";
import Cross from "./components/cross";
import CounterFlowChiller from "./components/counterflowchiller";
import HeatExchangerTank from "./components/heatexchangertank";
import Tank from "./components/tank";
import HeatedTank from "./components/heatedtank";
import Vessel from "./components/vessel";
import Drain from "./components/drain";
import Thermometer from "./components/thermometer";

let app = new PIXI.Application(1200, 1200, { antialias: true });
app.renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(app.view);

let tube1 = new Tube("t1");
let tube2 = new Tube("t2");
let tube3 = new Tube("t3");
let tube4 = new Tube("t4");
let tube5 = new Tube("t5");
let tube6 = new Tube("t6");
let tube7 = new Tube("t7");
let tube8 = new Tube("t8");
let tube9 = new Tube("t9");
let tube10 = new Tube("t10");
let tube11 = new Tube("t11");
let tube12 = new Tube("t12");
let tube13 = new Tube("t13");
let tube14 = new Tube("t14");
let tube15 = new Tube("t15");
let tube16 = new Tube("t16");
let tube17 = new Tube("t17");
let tube18 = new Tube("t18");
let tube19 = new Tube("t19");
let tube20 = new Tube("t20");
let tube21 = new Tube("t21");
let tube22 = new Tube("t22");
let tube23 = new Tube("t23");
let tube24 = new Tube("t24");
let tube25 = new Tube("t25");
let tube26 = new Tube("t26");
let tube27 = new Tube("t27");
let tube28 = new Tube("t28");
let tube29 = new Tube("t29");
let tube30 = new Tube("t30");
let tube31 = new Tube("t31");
let tube32 = new Tube("t32");
let tube33 = new Tube("t33");
let tube34 = new Tube("t34");
let tube35 = new Tube("t35");
let tube36 = new Tube("t36");
let tube37 = new Tube("t37");
let tube38 = new Tube("t38");
let tube39 = new Tube("t39");
let tube40 = new Tube("t40");
let tube41 = new Tube("t41");
let tube42 = new Tube("t42");
let tube43 = new Tube("t43");
let tube44 = new Tube("t44");
let tube45 = new Tube("t45");
let tube46 = new Tube("t46");
let tube47 = new Tube("t47");
let tube48 = new Tube("t48");

let faucet1 = new Faucet("f1", 100, 100, Orientation.LeftToRight);
let tee1 = new Tee("T1", 150, 100);
let valve1 = new BallValve("v1", 200, 100, Orientation.LeftToRight, false);
let valve2 = new BallValve("v2", 150, 150, Orientation.TopToBottom, false);
let tee2 = new Tee("T2", 150, 200);
let mValve1 = new BallValve("m1", 200, 200, Orientation.LeftToRight, true);
let tee3 = new Tee("T3", 150, 300);
let mValve2 = new BallValve("m2", 200, 300, Orientation.LeftToRight, true);
let check1 = new CheckValve("c1", 150, 350, Orientation.BottomToTop);

let hotLiquorTank = new HeatExchangerTank("HLT", 350, 450);
let hltValve = new BallValve("hltv", hotLiquorTank.bottomComponentPort.x, hotLiquorTank.bottomComponentPort.y,
    Orientation.TopToBottom, false);
hotLiquorTank.connectToBottom(hltValve);
hltValve.connectToA(hotLiquorTank);

let hltCoilValve = new BallValve("hltcv", hotLiquorTank.coilBottomComponentPort.x,
    hotLiquorTank.coilBottomComponentPort.y, Orientation.LeftToRight, false);
hotLiquorTank.connectToCoilBottom(hltCoilValve);
hltCoilValve.connectToA(hotLiquorTank);

let hltThermometer = new Thermometer("hltt", hotLiquorTank, 300, 525);

let check2 = new CheckValve("c2", 400, 200, Orientation.LeftToRight);
let tee4 = new Tee("T4", 450, 200);

let mValve3 = new BallValve("m3", 450, 250, Orientation.TopToBottom, true);
let mValve4 = new BallValve("m4", 500, 200, Orientation.LeftToRight, true);
let tee5 = new Tee("T5", 550, 200);
let mValve5 = new BallValve("m5", 550, 250, Orientation.TopToBottom, true);
let mValve6 = new BallValve("m6", 600, 200, Orientation.LeftToRight, true);
let tee6 = new Tee("T6", 750, 200);
let mValve7 = new BallValve("m7", 750, 250, Orientation.TopToBottom, true);
let mValve8 = new BallValve("m8", 800, 200, Orientation.LeftToRight, true);
let pump1 = new Pump("p1", 200, 600, Orientation.RightToLeft);
let tee7 = new Tee("T7", 250, 600);
let valve3 = new BallValve("v3", 250, 650, Orientation.TopToBottom, false);

let brewKettle = new HeatedTank("BK", 850, 450);
let bkValve = new BallValve("bkv", brewKettle.bottomComponentPort.x, brewKettle.bottomComponentPort.y,
    Orientation.TopToBottom, false);
brewKettle.connectToBottom(bkValve);
bkValve.connectToA(brewKettle);

let bkThermometer = new Thermometer("bkt", brewKettle, 800, 525);

let mValve10 = new BallValve("m10", 800, 600, Orientation.LeftToRight, true);
let tee8 = new Tee("T8", 750, 600);
let mValve9 = new BallValve("m9", 700, 600, Orientation.LeftToRight, true);
let pump2 = new Pump("p2", 750, 650, Orientation.TopToBottom);
let check3 = new CheckValve("c3", 750, 700, Orientation.TopToBottom);
let cross1 = new Cross("C1", 750, 750);
let mValve11 = new BallValve("m11", 700, 750, Orientation.LeftToRight, true);
let mValve12 = new BallValve("m12", 800, 750, Orientation.LeftToRight, true);
let valve4 = new BallValve("v4", 750, 800, Orientation.TopToBottom, false);
let tee9 = new Tee("T9", 950, 750);
let valve5 = new BallValve("v5", 1000, 750, Orientation.LeftToRight, false);

let counterFlowChiller = new CounterFlowChiller("cfc", 1000, 230);

let check4 = new CheckValve("c4", 1050, 700, Orientation.TopToBottom);
let tee10 = new Tee("T10", 1050, 750);

let mashTun = new Tank("MT", 600, 450);
let mtValve = new BallValve("mtv", mashTun.bottomComponentPort.x, mashTun.bottomComponentPort.y,
    Orientation.TopToBottom, false);
mashTun.connectToBottom(mtValve);
mtValve.connectToA(mashTun);

let mtThermometer = new Thermometer("mtt", tee4, 450, 175);

let bucket = new Vessel("b1", 250, 750);
let fermenter = new Vessel("ferm", 750, 900);

let drain = new Drain("d", 1050, 800, Orientation.TopToBottom);

tube1.connectToA(faucet1, faucet1.connect(tube1));
tube1.connectToB(tee1, tee1.connectToA(tube1));

tube2.connectToA(tee1, tee1.connectToB(tube2));
tube2.connectToB(valve1, valve1.connectToA(tube2));

tube3.connectToA(tee1, tee1.connectToC(tube3));
tube3.connectToB(valve2, valve2.connectToA(tube3));

tube4.connectToA(valve2, valve2.connectToB(tube4));
tube4.connectToB(tee2, tee2.connectToA(tube4));

tube5.connectToA(mValve1, mValve1.connectToA(tube5));
tube5.connectToB(tee2, tee2.connectToB(tube5));

tube6.connectToA(tee2, tee2.connectToC(tube6));
tube6.connectToB(tee3, tee3.connectToA(tube6));

tube7.connectToA(tee3, tee3.connectToC(tube7));
tube7.connectToB(mValve2, mValve2.connectToA(tube7));

tube8.connectToA(check1, check1.connectToOut(tube8));
tube8.connectToB(tee3, tee3.connectToB(tube8));

tube9.connectToA(mValve2, mValve2.connectToB(tube9));
tube9.connectToB(hotLiquorTank, hotLiquorTank.connectToTop(tube9));

tube10.connectToA(mValve7, mValve7.connectToB(tube10));
tube10.connectToB(brewKettle, brewKettle.connectToTop(tube10));

tube11.connectToA(check1, check1.connectToIn(tube11));
tube11.connectToB(pump1, pump1.connectToOut(tube11));

tube12.connectToA(tee7, tee7.connectToA(tube12));
tube12.connectToB(pump1, pump1.connectToIn(tube12));

tube13.connectToA(hltValve, hltValve.connectToB(tube13));
tube13.connectToB(tee7, tee7.connectToB(tube13));

tube14.connectToA(valve3, valve3.connectToA(tube14));
tube14.connectToB(tee7, tee7.connectToC(tube14));

// -----------------------------------------------------

tube15.connectToA(mValve1, mValve1.connectToB(tube15));
tube15.connectToB(check2, check2.connectToIn(tube15));

tube16.connectToA(check2, check2.connectToOut(tube16));
tube16.connectToB(tee4, tee4.connectToA(tube16));

tube17.connectToA(tee4, tee4.connectToC(tube17));
tube17.connectToB(mValve3, mValve3.connectToA(tube17));

tube18.connectToA(tee4, tee4.connectToB(tube18));
tube18.connectToB(mValve4, mValve4.connectToA(tube18));

tube19.connectToA(mValve4, mValve4.connectToB(tube19));
tube19.connectToB(tee5, tee5.connectToA(tube19));

tube20.connectToA(tee5, tee5.connectToB(tube20));
tube20.connectToB(mValve5, mValve5.connectToA(tube20));

tube21.connectToA(tee5, tee5.connectToC(tube21));
tube21.connectToB(mValve6, mValve6.connectToA(tube21));

tube22.connectToA(mValve6, mValve6.connectToB(tube22));
tube22.connectToB(tee6, tee6.connectToA(tube22));

tube23.connectToA(tee6, tee6.connectToC(tube23));
tube23.connectToB(mValve7, mValve7.connectToA(tube23));

tube24.connectToA(mValve8, mValve8.connectToA(tube24));
tube24.connectToB(tee6, tee6.connectToB(tube24));

// ----------------------------------------------------

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

// ----------------------------------------------------------------------------------

tube38.connectToA(counterFlowChiller, counterFlowChiller.connectToWaterIn(tube38));
tube38.connectToB(valve1, valve1.connectToB(tube38));

tube39.connectToA(valve5, valve5.connectToB(tube39));
tube39.connectToB(tee10, tee10.connectToA(tube39));

tube40.connectToA(check4, check4.connectToOut(tube40));
tube40.connectToB(tee10, tee10.connectToB(tube40));

tube41.connectToA(counterFlowChiller, counterFlowChiller.connectToWaterOut(tube41));
tube41.connectToB(check4, check4.connectToIn(tube41));

tube42.connectToA(mValve3, mValve3.connectToB(tube42));
tube42.connectToB(mashTun, mashTun.connectToTop(tube42));

tube43.connectToA(mValve5, mValve5.connectToB(tube43));
tube43.connectToB(hotLiquorTank, hotLiquorTank.connectToCoilTop(tube43));

tube44.connectToA(hltCoilValve, hltCoilValve.connectToB(tube44));
tube44.connectToB(mValve11, mValve11.connectToA(tube44));

tube45.connectToA(mtValve, mtValve.connectToB(tube45));
tube45.connectToB(mValve9, mValve9.connectToA(tube45));

tube46.connectToA(tee10, tee10.connectToC(tube46));
tube46.connectToB(drain, drain.connect(tube46));

tube47.connectToA(valve3, valve3.connectToB(tube47));
tube47.connectToB(bucket, bucket.connectToTop(tube47));

tube48.connectToA(valve4, valve4.connectToB(tube48));
tube48.connectToB(fermenter, fermenter.connectToTop(tube48));


app.stage.addChild(faucet1);
app.stage.addChild(tube1);
app.stage.addChild(tube2);
app.stage.addChild(tube3);
app.stage.addChild(tube4);
app.stage.addChild(tube5);
app.stage.addChild(tube6);
app.stage.addChild(tube7);
app.stage.addChild(tube8);
app.stage.addChild(tube9);
app.stage.addChild(tube10);
app.stage.addChild(tube11);
app.stage.addChild(tube12);
app.stage.addChild(tube13);
app.stage.addChild(tube14);
app.stage.addChild(tube15);
app.stage.addChild(tube16);
app.stage.addChild(tube17);
app.stage.addChild(tube18);
app.stage.addChild(tube19);
app.stage.addChild(tube20);
app.stage.addChild(tube21);
app.stage.addChild(tube22);
app.stage.addChild(tube23);
app.stage.addChild(tube24);
app.stage.addChild(tube25);
app.stage.addChild(tube26);
app.stage.addChild(tube27);
app.stage.addChild(tube28);
app.stage.addChild(tube29);
app.stage.addChild(tube30);
app.stage.addChild(tube31);
app.stage.addChild(tube32);
app.stage.addChild(tube33);
app.stage.addChild(tube34);
app.stage.addChild(tube35);
app.stage.addChild(tube36);
app.stage.addChild(tube37);
app.stage.addChild(tube38);
app.stage.addChild(tube39);
app.stage.addChild(tube40);
app.stage.addChild(tube41);
app.stage.addChild(tube42);
app.stage.addChild(tube43);
app.stage.addChild(tube44);
app.stage.addChild(tube45);
app.stage.addChild(tube46);
app.stage.addChild(tube47);
app.stage.addChild(tube48);

app.stage.addChild(tee1);
app.stage.addChild(tee2);
app.stage.addChild(tee3);
app.stage.addChild(tee4);
app.stage.addChild(tee5);
app.stage.addChild(tee6);
app.stage.addChild(tee7);
app.stage.addChild(tee8);
app.stage.addChild(tee9);
app.stage.addChild(tee10);

app.stage.addChild(cross1);

app.stage.addChild(valve1);
app.stage.addChild(valve2);
app.stage.addChild(valve3);
app.stage.addChild(valve4);
app.stage.addChild(valve5);

app.stage.addChild(mValve1);
app.stage.addChild(mValve2);
app.stage.addChild(mValve3);
app.stage.addChild(mValve4);
app.stage.addChild(mValve5);
app.stage.addChild(mValve6);
app.stage.addChild(mValve7);
app.stage.addChild(mValve8);
app.stage.addChild(mValve9);
app.stage.addChild(mValve10);
app.stage.addChild(mValve11);
app.stage.addChild(mValve12);

app.stage.addChild(check1);
app.stage.addChild(check2);
app.stage.addChild(check3);
app.stage.addChild(check4);

app.stage.addChild(pump1);
app.stage.addChild(pump2);

app.stage.addChild(hotLiquorTank);
app.stage.addChild(hltValve);
app.stage.addChild(hltCoilValve);

app.stage.addChild(brewKettle);
app.stage.addChild(bkValve);

app.stage.addChild(mashTun);
app.stage.addChild(mtValve);

app.stage.addChild(counterFlowChiller);

app.stage.addChild(bucket);
app.stage.addChild(fermenter);

app.stage.addChild(drain);

app.stage.addChild(hltThermometer);
app.stage.addChild(mtThermometer);
app.stage.addChild(bkThermometer);

// // Motorized Methods

document.getElementById("fullStop").addEventListener("click", () => fullStop());
document.getElementById("fillHlt").addEventListener("click", () => fillHlt());
document.getElementById("fillBk").addEventListener("click", () => fillBk());
document.getElementById("heatHlt").addEventListener("click", () => heatHlt());
document.getElementById("heatBk").addEventListener("click", () => heatBk());
document.getElementById("addGrains").addEventListener("click", () => addGrains());
document.getElementById("strikeOrMashIn").addEventListener("click", () => strikeOrMashIn());
document.getElementById("mash").addEventListener("click", () => mash());
document.getElementById("sparge").addEventListener("click", () => sparge());
document.getElementById("cool").addEventListener("click", () => cool());


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
    pump1.turnOff();
    pump2.turnOn();
    stopMonitoringHltTemp();
    stopMonitoringBkTemp();
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
    pump1.turnOn();
    startMonitoringHltTemp(65);
}

function heatBk() {
    mValve6.close();
    mValve7.open();
    mValve8.open();
    mValve9.close();
    mValve10.open();
    mValve11.close();
    mValve12.open();
    pump2.turnOn();
    startMonitoringBkTemp(68);
}

function addGrains() {
    mashTun.addGrains();
}

function strikeOrMashIn() {
    pump1.turnOn();
    pump2.turnOn();
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
    startMonitoringHltTemp(65);
    stopMonitoringBkTemp();
}

function mash() {
    pump1.turnOn();
    pump2.turnOn();
    mValve1.close();
    mValve2.open();
    mValve3.open();
    mValve4.open();
    mValve5.open();
    mValve6.close();
    mValve8.close();
    mValve9.open();
    mValve10.close();
    mValve11.open();
    mValve12.close();
    startMonitoringHltTemp(65);
    stopMonitoringBkTemp();
}

function sparge() {
    pump1.turnOn();
    pump2.turnOn();
    mValve1.open();
    mValve2.close();
    mValve3.open();
    mValve4.close();
    mValve5.open();
    mValve6.open();
    mValve7.open();
    mValve8.close();
    mValve9.open();
    mValve10.close();
    mValve11.open();
    mValve12.close();
    startMonitoringHltTemp(65);
    stopMonitoringBkTemp();
}

function cool() {
    pump1.turnOn();
    pump2.turnOn();
    mValve6.close();
    mValve7.open();
    mValve8.open();
    mValve9.close();
    mValve10.open();
    mValve11.close();
    mValve12.open();
    startMonitoringHltTemp(65);
    stopMonitoringBkTemp();
}


let hltTempTimer = 0;
let bkTempTimer = 0;


function startMonitoringHltTemp(target: number) {
    if (hltTempTimer === 0) {
        hltTempTimer = setInterval(() => monitorHltTemp(target), 1000);
    }
}

function stopMonitoringHltTemp() {
    clearInterval(hltTempTimer);
    hltTempTimer = 0;
}

function monitorHltTemp(target: number) {
    let t = hltThermometer.readTemperature();
    console.log("temp: ", t, " target: ", target);

    if (t < target) {
        hotLiquorTank.heatOn();
    } else {
        hotLiquorTank.heatOff();
    }
}

function startMonitoringBkTemp(target: number) {
    if (bkTempTimer === 0) {
        bkTempTimer = setInterval(() => monitorBkTemp(target), 1000);
    }
}

function stopMonitoringBkTemp() {
    clearInterval(bkTempTimer);
    bkTempTimer = 0;
}

function monitorBkTemp(target: number) {
    let t = bkThermometer.readTemperature();
    if (t < target) {
        brewKettle.heatOn();
    } else {
        brewKettle.heatOff();
    }
}
