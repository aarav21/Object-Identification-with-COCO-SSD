img = ''
status=""
objects=[];
numberOfObjects=0;
function setup(){
    canvas = createCanvas(640,420);
    canvas.center;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);    
    document.getElementById('status').innerHTML = "detecting objects";
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
}


function draw(){
    image(video, 0,0, 640,420);
    objectDetector.detect(video, gotresult);

    if(status != "")
    {
        for(i = 0; i<objects.length; i++ ){
            document.getElementById('status').innerHTML = "objects detected";
            fill('#ff0000');
            precent =floor(objects[i].confidence *100);
            text(objects[i].label + ' ' + precent + '%', objects[i].x+15, objects[i].y+15);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            console.log('test');
            numberOfObjects = objects.length;
            document.getElementById('number_of_objects').innerHTML = "object count " + numberOfObjects; 
        }
}
}

function modelLoaded(){
    status = true;

   


}

function gotresult(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        objects = results;
    }
}
