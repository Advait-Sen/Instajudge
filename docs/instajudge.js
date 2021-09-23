//Instajudge app

//Setting up purely debate stuffs

var Speakers={
    'PM' : {
        'name':'Prime Minister',
        'code':'PM',
        'score':0,
        'team':"First Government",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-primary'
    },

    'DP' : {
        'name':'Deputy Prime Minister',
        'code':'DP',
        'score':0,
        'team':"First Government",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-primary'
    },

    'GB' : {
        'name':'Member of Government Benches',
        'code':'GB',
        'score':0,
        'team':"Second Government",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-primary'
    },

    'GW' : {
        'name':'Government Whip',
        'code':'GW',
        'score':0,
        'team':"Second Government",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-primary'
    },

    'OL' : {
        'name':'Opposition Leader',
        'code':'OL',
        'score':0,
        'team':"First Opposition",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-danger'
    },

    'DO' : {
        'name':'Deputy Opposition Leader',
        'code':'DO',
        'score':0,
        'team':"First Opposition",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-danger'
    },

    'OB' : {
        'name':'Member of Opposition Benches',
        'code':'OB',
        'score':0,
        'team':"Second Opposition",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-danger'
    },

    'OW' : {
        'name':'Opposition Whip',
        'code':'OW',
        'score':0,
        'team':"Second Opposition",
        'points':{},
        'received_pois':0,
        'pois_made':0,
        'default_colour':'btn btn-danger'
    }
}

function poi(maker, speaker, strength, response){
    Speakers[maker]['score'] += strength - response;
    Speakers[maker].pois_made ++;
    Speakers[speaker]['score'] += response - strength;
    Speakers[speaker].received_pois ++;
}

function point(speaker, point_string, score){
    Speakers[speaker]['score'] += score;
    Speakers[speaker]['points'][point_string] = score;
}

function rebuttal(speaker, maker, score){
    Speakers[speaker]['score'] += score;
    Speakers[maker]['score'] -= score;
}

//Setting up web page prettification stuff

var pressed_speaker = '' //The speaker we are currently looking at

String.prototype.format = function() { // thx https://coderwall.com/p/flonoa/simple-string-format-in-javascript
    let a;
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

function getSpeakerInput(maker, nextOperation, text){
    try {
        document.getElementById("Speaker_selection_screen").remove();
    } catch (TypeError) { }

    var screen = document.createElement("div");
    screen.className = "flex-box-container-1";
    screen.id = "Speaker_selection_screen";
    
    var textHolder = document.createElement("h3");
    textHolder.innerText = text;

    var buttonHolder = document.createElement("div");
    buttonHolder.className = "flex-box-container-1";
    buttonHolder.id = "Speaker_button_holder";

    screen.appendChild(textHolder);
    screen.appendChild(buttonHolder);

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
        if(Speakers[element.id]['default_colour'] == Speakers[maker]['default_colour']) continue;
        element.className = Speakers[element.id]['default_colour'];
        element.innerHTML = Speakers[element.id]['name'];
        element.onclick = function () {
            nextOperation.apply(nextOperation, [maker, element.id]);
            document.getElementById("Speaker_selection_screen").remove();
        }
        buttonHolder.appendChild(element)
    }

    document.getElementById("Speaker_display").appendChild(screen);
}

function openSpeakerMenu(speaker){
    try {
        document.getElementById("Speaker_selection_screen").remove();
    } catch (TypeError) { }

    var screen = document.getElementById(speaker);

    if (pressed_speaker == speaker){ //de-highlighting a pressed button
        document.getElementById(speaker + '_button').className = Speakers[speaker]['default_colour'];
        while(screen.childElementCount > 1){
            if(screen.lastChild.id==speaker + "_score")
                continue;
            screen.lastChild.remove()
        }
        pressed_speaker = '';
        return
    }
    //if not, we are pressing a different speaker, and we will make this guy the pressed speaker

    if(pressed_speaker!='') { //deselecting previously clicked speaker if applicable
        document.getElementById(pressed_speaker + '_button').className = Speakers[pressed_speaker]['default_colour'];
        pressed_speaker_screen = document.getElementById(pressed_speaker);
        while(pressed_speaker_screen.childElementCount > 1){
            if(pressed_speaker_screen.lastChild.id==pressed_speaker + "_score")
                continue;
            pressed_speaker_screen.lastChild.remove();
        }
    }
    pressed_speaker = speaker;

    document.getElementById(speaker + '_button').className = "btn btn-success";
    
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
    poi.onclick = function () { getSpeakerInput(speaker, newPOI, "Please select the speaker to whom the POI is addressed: ") };
    rebuttal.onclick = function () { getSpeakerInput(speaker, newRebuttal, "Please select the speaker whose point is being rebuted: ") };

    var classname = Speakers[speaker]['default_colour'];

    point.className = classname;
    poi.className = classname;
    rebuttal.className = classname;

    screen.appendChild(point);
    screen.appendChild(poi);
    screen.appendChild(rebuttal);
}

function newPoint(speaker){
    var point_string = prompt("Enter the {0}'s point in a concise form".format(Speakers[speaker]['name']));
    var score = Number(prompt("Enter a score from 1-30 for the {0}'s point".format(Speakers[speaker]['name']), "0"));
    point(speaker, point_string, score);
    updateSpeakerScore(speaker);
    var point_display = document.getElementById(speaker + "_points");
    
    var point_holder = document.createElement("div");
    point_holder.className = "flex-box-container-1";
    point_holder.id = "point: "+ point_string;
    
    var point_string_holder = document.createElement("h4");
    point_string_holder.innerHTML = point_string;

    var point_score_holder = document.createElement("h4");
    point_score_holder.innerHTML = ",   Score: " + score + "    ";

    var point_removal_button = document.createElement("button");
    point_removal_button.className = "btn btn-danger";
    point_removal_button.innerHTML = "Delete";
    point_removal_button.onclick = function () {
        Speakers[speaker]['score'] -= score;
        updateSpeakerScore(speaker);
        delete Speakers[speaker]['points'][point_string];
        point_holder.remove()
    }


    point_holder.appendChild(point_string_holder);
    point_holder.appendChild(point_score_holder);
    point_holder.appendChild(point_removal_button);

    point_display.appendChild(point_holder);
}

function newPOI(maker, speaker){
    var score = Number(prompt("Enter a score from 1-10 for the {0}'s POI".format(Speakers[maker]['name']), "0"));
    var response = Number(prompt("Enter a score from 1-10 for the {0}'s response to the {1}'s POI".format(
        Speakers[maker]['name'], 
        Speakers[speaker]['name']
    ), "0"));
    poi(maker, speaker, score, response);
    updateSpeakerScore(maker);
    updateSpeakerScore(speaker);
}

function newRebuttal(speaker, previousSpeaker){
    var score = Number(prompt("Enter a score from 0-20 for the {0}'s rebuttal of the {1}'s points".format(
        Speakers[speaker]['name'], 
        Speakers[previousSpeaker]['name']
    ), "0"));
    rebuttal(speaker, previousSpeaker, score);
    updateSpeakerScore(speaker);
    updateSpeakerScore(previousSpeaker);
}

function updateSpeakerScore(speaker){
    var speaker_score_display = document.getElementById(speaker + "_score");
    speaker_score_display.innerHTML = "Score: " + Speakers[speaker]['score'];
}
