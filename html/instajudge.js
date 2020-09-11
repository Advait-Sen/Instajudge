//Instajudge app

var speakers=new Map([
    ["PM","Prime Minister"],
    ["DP","Deputy Prime Minister"],
    ["GB","Member of Government Benches"],
    ["GW","Government Whip"],
    ["OL","Opposition Leader"],
    ["DO","Deputy Opposition Leader"],
    ["OB","Member of Opposition Benches"],
    ["OW","Opposition Whip"]
]);

var prev=['','',true];

function openSpeakerMenu(type){

    prev[2]=!prev[2]

    try {
        document.getElementById("Speaker_screen").remove();
        document.getElementById(prev[0]).className=prev[1];
    } catch (TypeError) {}

    var screen = document.createElement("div");
    screen.className = "flex-box-container-1";
    screen.id="Speaker_screen";

    var speakername=speakers.get(type)
    
    var classname;

    if((speakername.split(' ')).includes("Opposition"))
        classname = "btn btn-danger";
    else classname = "btn btn-primary"
    
    if(prev[2]){
        document.getElementById(type).className=classname
        return
    }

    prev[0] = type
    prev[1]=classname;
    document.getElementById(prev[0]).className="btn btn-success";//higlighting pressed button

    var point = document.createElement("button");
    var poi = document.createElement("button");
    var rebuttal = document.createElement("button");
    
    point.id = "newPoint";
    point.onclick=function(){test()};
    point.innerHTML = "Make a new point";

    poi.id = "newPOI";
    poi.onclick=function(){test()};
    poi.innerHTML = "Make a new POI";

    rebuttal.id = "newPOI";
    rebuttal.onclick=function(){test()};
    rebuttal.innerHTML = "Make a new Rebuttal";

    point.className = classname;
    poi.className= classname;
    rebuttal.className = classname;

    screen.appendChild(point)
    screen.appendChild(poi)
    screen.appendChild(rebuttal)
    document.getElementById("Speaker_screen_bg").appendChild(screen);
}

function test(){console.log("ttest");}