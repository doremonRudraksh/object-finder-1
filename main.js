status_model = "";
text_input = "";
objects = [];

function setup(){
    canvas = createCanvas(300,290);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    text_input = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model is Loaded");
    status_model = true;
}
function draw(){
    image(video,0,0,290,290);
    if(status_model != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == text_input){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = text_input+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(text_input + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = text_input + " Not Found";
            }
        }
    }
}

function gotResults(e,results){
    if(e){
        console.error(e);
    }
    else{
        console.log(results);
        objects = results;
    }
}