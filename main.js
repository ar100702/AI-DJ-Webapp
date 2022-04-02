song = "";
LeftwristX = 0;
LeftwristY = 0;
RightwristX = 0;
RightwristY = 0;
ScoreRightWrist = 0;
ScoreLefttWrist = 0;


function preload(){
    song = loadSound("Bijlee Bijlee - Harrdy Sandhump3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(640, 320)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initiallized");
}

function draw(){
    image(video, 0, 0, 600, 500);
    
    fill("#70EE9C");
    stroke("#70EE9C");

    circle(RightwristX, RightwristY, 20);

    if(ScoreRightWrist>0.2){
        if(RightwristY>0 && RightwristY<=100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }else if(RightwristY>100 && RightwristY<=200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1); 
        }else if(RightwristY>200 && RightwristY<=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }else if(RightwristY>300 && RightwristY<=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }else if(RightwristY>400 && RightwristY<=500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(ScoreLefttWrist>0.2){
       circle(LeftwristX, LeftwristY, 20);
       InNumberLeftWristY = Number(LeftwristY);
       remove_decimals = floor(InNumberLeftWristY);
       volume = remove_decimals/500;
       document.getElementById("volume").innerHTML = "Volume = "+volume;
       song.setVolume(volume);
    }
    }

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLefttWrist = results[0].pose.keypoints[9].score;
        console.log("Left wrist score is "+ScoreLefttWrist+" | Right score is "+ScoreRightWrist);
        LeftwristX = results[0].pose.leftWrist.x;
        LeftwristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x is - "+LeftwristX+" | Left wrist y is - "+LeftwristY);
        RightwristX = results[0].pose.rightWrist.x;
        RightwristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x is - "+RightwristX+" | Right wrist y is - "+RightwristY);       
    }
}
