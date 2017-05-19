import * as PIXI from "pixi.js";

import Faucet from "./components/faucet";
// import Pump from "./components/pump";
import Tank from "./components/tank";
import Valve from "./components/valve";
import Tube from "./components/tube";


let app = new PIXI.Application(800, 600, { antialias: true });
app.renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(app.view);

// let pump1 = new Pump("pump1", [100, 110], app);
let faucet1 = new Faucet("water", [100, 110], app);
let valve1 = new Valve("valve1", [200, 100], app);
let valve2 = new Valve("valve2", [300, 100], app);
let htl = new Tank("htl", [400, 100], app);

let tube1 = new Tube("tube1", app);
let tube2 = new Tube("tube2", app);
let tube3 = new Tube("tube3", app);

tube1.connectToA(faucet1, faucet1.connect(tube1));
tube1.connectToB(valve1, valve1.connectToA(tube1));

tube2.connectToA(valve1, valve1.connectToB(tube2));
tube2.connectToB(valve2, valve2.connectToA(tube2));

tube3.connectToA(valve2, valve2.connectToB(tube3));
tube3.connectToB(htl, htl.connectToTop(tube3));

tube1.draw();
tube2.draw();
tube3.draw();
