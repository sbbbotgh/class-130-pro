song_1 = "";
song_2 = "";
lefthandX = 0;
righthandX = 0;
lefthandY = 0;
righthandY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;
leftisworking = "";
rightisworking = "";

function preload(){
    song_1 = loadSound("Get_It_Poppin'.mp3");
    song_2 = loadSound("Mohali_Vacation_2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

    song_1.rate(1);
    song_2.rate(1);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");
    leftisworking = song_1.isPlaying();

    if(scoreRightwrist > 0.2){
        circle(righthandX , righthandY, 20);
        rightisworking = song_2.isPlaying();
        song_2.pause();
        song_1.stop();
        if(rightisworking = "false"){
            song_2.play();
        }
        document.getElementById("song").innerHTML = "SONG : Mohali Vacation 2";

    }

    if(scoreLeftwrist > 0.2){
        circle(lefthandX, lefthandY, 20);
        NumleftWristY = Number(lefthandY);
        leftisworking = song_1.isPlaying();
        song_1.pause();
        song_2.stop();
        if(leftisworking = "false"){
            song_1.play();
        }
        document.getElementById("song").innerHTML = "SONG : Cash Money'";
    }
}

function modelLoaded(){
    console.log("model is loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;

        righthandY = results[0].pose.rightWrist.y;
        righthandX = results[0].pose.rightWrist.x;

        lefthandX = results[0].pose.leftWrist.x;
        lefthandY = results[0].pose.leftWrist.y;
    }
}