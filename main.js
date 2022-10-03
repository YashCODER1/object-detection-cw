video = "";
status = "";
objects = "";

function preload()
{
    video = createVideo("video.mp4")
    video.hide();
}

function setup()
{
    Canvas =  createCanvas(480 , 380);
    Canvas.center();
}

function draw()
{
    image(video , 0 , 0 , 480 , 380);
    if(status != "")
    {
        objectDetector.detect(video , gotResults);

        for(i=0 ; i<objects.length ; i++)
        document.getElementById("status").innerHTML=" Objects Detected";
        document.getElementById("number_of_objects").innerHTML=" Number Of Objects Detected Are "+objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%" , objects[i].x +15, objects[i].y +15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
}
function gotResults(results , error)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function start()
{
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}