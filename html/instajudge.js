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
    try {
        document.getElementById("Action_screen").remove();
    } catch (TypeError) {console.log(TypeError)}

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
    
    var PM = document.createElement("button");PM.id="PM";
    var DP = document.createElement("button");DP.id="DP";
    var GB = document.createElement("button");GB.id="GB";
    var GW = document.createElement("button");GW.id="GW";
    var OL = document.createElement("button");OL.id="OL";
    var DO = document.createElement("button");DO.id="DO";
    var OB = document.createElement("button");OB.id="OB";
    var OW = document.createElement("button");OW.id="OW";
    
    speaker_list = [PM,DP,GB,GW,OL,DO,OB,OW];
    
    for (var index = 0; index < speaker_list.length; index++) {
        const element = speaker_list[index];
        element.className = "btn btn-success";
        element.innerHTML = speakers.get(element.id)[0];
        element.onclick = function () {
            document.getElementById("Action_screen").remove();
            newPOI(maker, element.id)
        }
        screen.appendChild(element)
    }
    
    document.getElementById("Aux_display").appendChild(screen);
}

function test() { console.log("ttest"); }