let video;
let posenet;
let singlepose;
let skeleton;
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  postnet = ml5.poseNet(video, modelLoaded);
  postnet.on("pose", getskelton);
}
function modelLoaded() {
  console.log("postnet model load ho gaya hai");
}
function getskelton(posepoints) {
  if (posepoints.length > 0) {
    singlepose = posepoints[0].pose;
    skeleton = posepoints[0].skeleton;
  }
}
function draw() {
  image(video, 0, 0, 640, 480);
  fill("red");
  if (singlepose) {
    for (let i = 0; i < singlepose.keypoints.length; i++) {
      ellipse(
        singlepose.keypoints[i].position.x,
        singlepose.keypoints[i].position.y,
        15,
        15
      );
    }
    stroke("white");
    strokeWeight(5);
    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }
  }
}
