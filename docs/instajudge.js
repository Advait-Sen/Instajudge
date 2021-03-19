//Instajudge app

//Instajudge app

var Speakers={
    'PM' : {
        'name':'Prime Minister',
        'code':'PM',
        'score':0,
        'team':"First Government",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-primary'
    },

    'DP' : {
        'name':'Deputy Prime Minister',
        'code':'DP',
        'score':0,
        'team':"First Government",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-primary'
    },

    'GB' : {
        'name':'Member of Government Benches',
        'code':'GB',
        'score':0,
        'team':"Second Government",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-primary'
    },

    'GW' : {
        'name':'Government Whip',
        'code':'GW',
        'score':0,
        'team':"Second Government",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-primary'
    },

    'OL' : {
        'name':'Opposition Leader',
        'code':'OL',
        'score':0,
        'team':"First Opposition",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-danger'
    },

    'DO' : {
        'name':'Deputy Opposition Leader',
        'code':'DO',
        'score':0,
        'team':"First Opposition",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-danger'
    },

    'OB' : {
        'name':'Member of Opposition Benches',
        'code':'OB',
        'score':0,
        'team':"Second Opposition",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-danger'
    },

    'OW' : {
        'name':'Opposition Whip',
        'code':'OW',
        'score':0,
        'team':"Second Opposition",
        'points':{},
        'pressed':false,
        'default_colour':'btn btn-danger'
    }
}

var input = [];

String.prototype.format = function() { // thx https://coderwall.com/p/flonoa/simple-string-format-in-javascript
    a = this;
    let a;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}


function openSpeakerMenu(speaker) {
    var screen = document.getElementById(speaker)

    if (Speakers[speaker]['pressed']){ //highlighting unpressed button and de-highlighting pressed button
        document.getElementById(speaker + '_button').className = Speakers[speaker]['default_colour'];
        while(screen.firstChild)
            screen.lastChild.remove()

        Speakers[speaker]['pressed'] = !(Speakers[speaker]['pressed']);

        return
    }
    else
        document.getElementById(speaker + '_button').className = "btn btn-success";
    Speakers[speaker]['pressed'] = !(Speakers[speaker]['pressed']);

    var point = document.createElement("button");
    var poi = document.createElement("button");
    var rebuttal = document.createElement("button");

    point.id = "new_point_"+speaker;
    poi.id = "new_poi_" +speaker;
    rebuttal.id = "new_rebuttal_"+speaker;

    point.innerHTML = "Make a new point";
    poi.innerHTML = "Make a new POI";
    rebuttal.innerHTML = "Make a new Rebuttal";

    point.onclick = function () { newPoint(speaker) };
    poi.onclick = function () { getSpeakerInput(speaker) };
    rebuttal.onclick = function () { test(speaker) };

    var classname = Speakers[speaker]['default_colour'];

    point.className = classname;
    poi.className = classname;
    rebuttal.className = classname;

    screen.appendChild(point);
    screen.appendChild(poi);
    screen.appendChild(rebuttal);
}

function takeInput(parentNode, type, text, speaker){
    var inputBox = document.createElement("input");
    inputBox.id = speaker  + " input" + ": " +text;
    inputBox.type = type;
    inputBox.placeholder = text;

    var inputButton = document.createElement("button");
    inputButton.id = speaker  + " button" + ": " +text;
    inputButton.className = Speakers[speaker]['default_colour']
    inputButton.onclick = function (){
        var box = document.getElementById(speaker  + " input" + ": " +text);
        input.push(box.value); //adding the stuff to the list, and then taking it off later
        box.remove();

        var button = document.getElementById(speaker  + " button" + ": " +text);
        button.remove();
    };
    parentNode.appendChild(inputBox);
    parentNode.appendChild(inputButton);
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

    speakers.get(maker)[1]+=score-response;

    speakers.get(speaker)[1]+=response-score;

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

    document.getElementById("POI_display").appendChild(screen);
}

function printReport(){
    for (const iterator of speakers) {
        var name = iterator[1][0];
        var score = iterator [1][1];
        var points = iterator[1][2];

        console.log(name+": "+score);

        points.forEach(element => {element.forEach(thing=>{console.log(thing)})});//Printing points and given scores
    }
}

function test(speaker) { console.log("todo"); }

function t(){
    var t = document.getElementById("input").value;
    document.getElementById("outputtext").innerHTML = t;
}
