//Instajudge app

var speakers = new Map([
    ["PM", ["Prime Minister", 0, []]],
    ["DP", ["Deputy Prime Minister", 0, []]],
    ["GB", ["Member of Government Benches", 0, []]],
    ["GW", ["Government Whip", 0, []]],
    ["OL", ["Opposition Leader", 0, []]],
    ["DO", ["Deputy Opposition Leader", 0, []]],
    ["OB", ["Member of Opposition Benches", 0, []]],
    ["OW", ["Opposition Whip", 0, []]]
]);

var prev = ['', '', true];

function openSpeakerMenu(speaker) {

    prev[2] = !prev[2]

    try {
        document.getElementById("Speaker_screen").remove();
        document.getElementById(prev[0]).className = prev[1];
    } catch (TypeError) { }

    var screen = document.createElement("div");
    screen.className = "flex-box-container-1";
    screen.id = "Speaker_screen";

    var speakername = speakers.get(speaker)[0]

    var classname;

    if ((speakername.split(' ')).includes("Opposition"))
        classname = "btn btn-danger";
    else classname = "btn btn-primary"

    if (prev[2]) {
        document.getElementById(speaker).className = classname
        if(prev[0]==speaker)
            return
    }

    prev[0] = speaker
    prev[1] = classname;
    document.getElementById(prev[0]).className = "btn btn-success";//higlighting pressed button

    var point = document.createElement("button");
    var poi = document.createElement("button");
    var rebuttal = document.createElement("button");

    point.id = "newPoint";
    point.onclick = function () { newPoint(speaker) };
    point.innerHTML = "Make a new point";

    poi.id = "newPOI";
    poi.onclick = function () { getSpeakerInput(speaker) };
    poi.innerHTML = "Make a new POI";

    rebuttal.id = "newPOI";
    rebuttal.onclick = function () { test() };
    rebuttal.innerHTML = "Make a new Rebuttal";

    point.className = classname;
    poi.className = classname;
    rebuttal.className = classname;

    screen.appendChild(point)
    screen.appendChild(poi)
    screen.appendChild(rebuttal)
    document.getElementById("Speaker_screen_bg").appendChild(screen);
}

function newPoint(maker) {
    console.log("New point from " + maker);
    var point_string = prompt("Enter the point in a concise form");
    var score = Number(prompt("Enter a score from 1-30 for the point", "0"));

    speakers.get(maker)[1] += score;
    speakers.get(maker)[2].push([point_string, score]);
    console.log("New point recorded");
}

function newPOI(maker, speaker) {
    console.log("New POI from " + maker + " addressing " + speaker);
    
    var score = Number(prompt("Enter a score from 1-10 for the POI", "0"));

    var response = Number(prompt("Enter a score from 1-10 for the response to the POI", "0"));

    speakers.get(maker)[1]+=score-response

    speakers.get(speaker)[1]-=score-response

    console.log("New POI recorded")
}

function getSpeakerInput(maker){
    try {
        document.getElementById("Action_screen").remove();
    } catch (TypeError) { }

    var screen = document.createElement("div");
    screen.className = "flex-box-container-1";
    screen.id = "Action_screen";

    var PM = document.createElement("button");
    var DP = document.createElement("button");
    var GB = document.createElement("button");
    var GW = document.createElement("button");
    var OL = document.createElement("button");
    var DO = document.createElement("button");
    var OB = document.createElement("button");
    var OW = document.createElement("button");
    

    PM.className = "btn btn-success";
    DP.className = "btn btn-success";
    GB.className = "btn btn-success";
    GW.className = "btn btn-success";
    OL.className = "btn btn-success";
    DO.className = "btn btn-success";
    OB.className = "btn btn-success";
    OW.className = "btn btn-success";
    
    PM.innerHTML = speakers.get("PM")[0];
    DP.innerHTML = speakers.get("DP")[0];
    GB.innerHTML = speakers.get("GB")[0];
    GW.innerHTML = speakers.get("GW")[0];
    OL.innerHTML = speakers.get("OL")[0];
    DO.innerHTML = speakers.get("DO")[0];
    OB.innerHTML = speakers.get("OB")[0];
    OW.innerHTML = speakers.get("OW")[0];
    
    PM.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "PM")}
    DP.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "DP")}
    GB.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "GB")}
    GW.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "GW")}
    OL.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "OL")}
    DO.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "DO")}
    OB.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "OB")}
    OW.onclick = function () {document.getElementById("Action_screen").remove();newPOI(maker, "OW")}
    
    screen.appendChild(PM)
    screen.appendChild(DP)
    screen.appendChild(GB)
    screen.appendChild(GW)
    screen.appendChild(OL)
    screen.appendChild(DO)
    screen.appendChild(OB)
    screen.appendChild(OW)
    
    document.getElementById("Aux_display").appendChild(screen);
}

function test() { console.log("ttest"); }