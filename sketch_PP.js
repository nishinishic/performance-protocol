let allConnections = [];
let vidWidth = 480;
let vidHeight = 360;
let p5live;
let nameField;
let gatherText;
let frozenFrames = {}; // Object to store the frozen frames

let speech;                             // NEW: TTS
let myRec = new p5.SpeechRec('zh-CN');  // recogniser
let listening = [ "我", "你", "你好", "是", "好", "不", "没有" ];

// simple mapping → reply text
const replies = {
  "我":     "我听见你了，请继续",
  "你":     "我看见你了",
  "你好":   "我可以怎样帮助你？",
  "是":     "真的吗",
  "好":   "你相信我吗",
  "不":     "为什么不呢？",
  "没有":     "请独立思考",
};

let eyeVideo;
let eyevideoPlaying = false;
let chipVideo;
let chipvideoPlaying = false;
let cityVideo;
let cityvideoPlaying = false;
let earthVideo;
let earthvideoPlaying = false;
let camVideo;
let camvideoPlaying = false;
let streetVideo;
let streetvideoPlaying = false;
let protestVideo;
let protestvideoPlaying = false;
let neuroVideo;
let neurovideoPlaying = false;
let forestVideo;
let forestvideoPlaying = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  myVideo = createCapture(VIDEO, gotMineConnectOthers);
  myVideo.size(vidWidth, vidHeight);
  myVideo.hide();
  allConnections['Me'] = {
    'video': myVideo,
    'name': "Me",
    'x': random(width),
    'y': random(height)
  };
  nameField = createInput("发弹幕留言："); //"No Name"
  nameField.changed(enteredName);
  nameField.style('position', 'absolute');
  nameField.style('width', '330px');
  nameField.style('font-size', '30px'); // Change the text size here

    // ── SPEECH set-up ───────────────────────────────────────────────────
  speech = new p5.Speech();      // synthesiser
  speech.setLang('zh-CN');       // Mandarin voice
  speech.setRate(1);             // speed (0.1–10)
  speech.setPitch(1);            // pitch (0–2)

  myRec.onResult = showResult;   // callback
  myRec.continuous = true;
  myRec.start();

    // 10-second greeting (10000 ms)
  setTimeout(() => {
    // if Chrome blocks audio until a gesture, this
    // line will run as soon as the user has clicked once
    speech.speak('欢迎来到私密通道');
  }, 10000);

  setTimeout(() => {
    speech.speak('让我们在这里聚集');
  }, 18000);

  setTimeout(() => {
    speech.speak('请与其他举起手机摄像头的人一起观看');
  }, 25000);


  setTimeout(() => {
    speech.speak('你看见了什么？');
  }, 35000);

  setTimeout(() => {
    speech.speak('你从哪里来？');
  }, 45000);

  setTimeout(() => {
    speech.speak('你看见你旁边的人了吗');
  }, 52000);

  setTimeout(() => {
    speech.speak('你看见了什么');
  }, 60000);

  setTimeout(() => {
    speech.speak('你看见我了吗？');
  }, 68000);

  setTimeout(() => {
    speech.speak('挥手打招呼');
  }, 72000);

  setTimeout(() => {
    speech.speak('握手');
  }, 80000);


  setTimeout(() => {
    speech.speak('握 手');
  }, 85000);

  setTimeout(() => {
    speech.speak('看啊');
  }, 92000);

  setTimeout(() => {
    speech.speak('听啊');
  }, 98000);

  setTimeout(() => {
    speech.speak('听');
  }, 105000);


  setTimeout(() => {
    speech.speak('请说些什么');
  }, 115000);

  setTimeout(() => {
    speech.speak('大声点，说出来');
  }, 125000);


  setTimeout(() => {
    speech.speak('你听见了吗');
  }, 140000);

  setTimeout(() => {
    speech.speak('离屏幕近一点');
  }, 150000);

  setTimeout(() => {
    speech.speak('你有什么私密的话跟她说？');
  }, 155000);

  setTimeout(() => {
    speech.speak('你有什么私密的话跟我说？');
  }, 165000);


  setTimeout(() => {
    speech.speak('听啊');
  }, 175000);


  setTimeout(() => {
    speech.speak('看啊');
  }, 180000);

  setTimeout(() => {
    speech.speak('离屏幕远一点');
  }, 185000);

  setTimeout(() => {
    speech.speak('你看见了什么');
  }, 190000);





  // Create the paragraph element for the text
  gatherText = createP('“让我们在这里聚集。”');
  gatherText.style('position', 'absolute');
  gatherText.style('font-size', '60px');
  gatherText.style('color', 'blue'); // Adjust the color as needed
  gatherText.style('text-align', 'center'); // Center text alignment
  gatherText.style('width', '100%'); // Take the full width of the page
  gatherText.style('top', '10px'); // Position at the top with some margin
  gatherText.style('left', '0'); // Start from the left edge
  gatherText.position((windowWidth - gatherText.width) / 2, 10); // Position at the top of the page


    // Load video 'eye' 
    setTimeout(() => {
      eyeVideo = createVideo(['videos/eye.mp4'], eyevideoLoaded);
      eyeVideo.hide();
      eyeVideo.onended(() => {
        eyeVideo.hide();
        eyePlaying = false;
      });
      }, 38000);

    setTimeout(() => {
      eyeVideo.stop();
      eyeVideo.hide();
      eyevideoPlaying = false;
    }, 39000);


    // Load video 'chip' 
    setTimeout(() => {
      chipVideo = createVideo(['videos/chip.mp4'], chipvideoLoaded);
      chipVideo.hide();
      chipVideo.onended(() => {
        chipVideo.hide();
        chipPlaying = false;
      });
      }, 40000);

    setTimeout(() => {
      chipVideo.stop();
      chipVideo.hide();
      chipvideoPlaying = false;
    }, 41000);


    // Load video 'city' 
    setTimeout(() => {
      cityVideo = createVideo(['videos/city.mp4'], cityvideoLoaded);
      cityVideo.hide();
      cityVideo.onended(() => {
        cityVideo.hide();
        cityPlaying = false;
      });
      }, 42000);

    setTimeout(() => {
      cityVideo.stop();
      cityVideo.hide();
      cityvideoPlaying = false;
    }, 43000);

    // Load video 'earth' 
    setTimeout(() => {
      earthVideo = createVideo(['videos/earth.mp4'], earthvideoLoaded);
      earthVideo.hide();
      earthVideo.onended(() => {
        earthVideo.hide();
        earthPlaying = false;
      });
      }, 49000);

    setTimeout(() => {
      earthVideo.stop();
      earthVideo.hide();
      earthvideoPlaying = false;
    }, 56000);


    // Load video 'cam' 
    setTimeout(() => {
      camVideo = createVideo(['videos/cam.mp4'], camvideoLoaded);
      camVideo.hide();
      camVideo.onended(() => {
        camVideo.hide();
        camPlaying = false;
      });
      }, 75000);

    setTimeout(() => {
      camVideo.stop();
      camVideo.hide();
      camvideoPlaying = false;
    }, 80000);

    // Load video 'cam' 
    setTimeout(() => {
      camVideo = createVideo(['videos/cam.mp4'], camvideoLoaded);
      camVideo.hide();
      camVideo.onended(() => {
        camVideo.hide();
        camPlaying = false;
      });
      }, 95000);

    setTimeout(() => {
      camVideo.stop();
      camVideo.hide();
      camvideoPlaying = false;
    }, 105000);

    // Load video 'street' 
    setTimeout(() => {
      streetVideo = createVideo(['videos/street.mp4'], streetvideoLoaded);
      streetVideo.hide();
      streetVideo.onended(() => {
        streetVideo.hide();
        streetPlaying = false;
      });
      }, 112000);

    setTimeout(() => {
      streetVideo.stop();
      streetVideo.hide();
      streetvideoPlaying = false;
    }, 114000);

    // Load video 'protest' 
    setTimeout(() => {
      protestVideo = createVideo(['videos/protest.mp4'], protestvideoLoaded);
      protestVideo.hide();
      protestVideo.onended(() => {
        protestVideo.hide();
        protestPlaying = false;
      });
      }, 132000);

    setTimeout(() => {
      protestVideo.stop();
      protestVideo.hide();
      protestvideoPlaying = false;
    }, 142000);

    // Load video 'eye' 
    setTimeout(() => {
      eyeVideo = createVideo(['videos/eye.mp4'], eyevideoLoaded);
      eyeVideo.hide();
      eyeVideo.onended(() => {
        eyeVideo.hide();
        eyePlaying = false;
      });
      }, 153000);

    setTimeout(() => {
      eyeVideo.stop();
      eyeVideo.hide();
      eyevideoPlaying = false;
    }, 154000);

    // Load video 'neuro' 
    setTimeout(() => {
      neuroVideo = createVideo(['videos/neuro.mp4'], neurovideoLoaded);
      neuroVideo.hide();
      neuroVideo.onended(() => {
        neuroVideo.hide();
        neuroPlaying = false;
      });
      }, 160000);

    setTimeout(() => {
      neuroVideo.stop();
      neuroVideo.hide();
      neurovideoPlaying = false;
    }, 175000);

    // Load video 'forest' 
    setTimeout(() => {
      forestVideo = createVideo(['videos/forest.mp4'], forestvideoLoaded);
      forestVideo.hide();
      forestVideo.onended(() => {
        forestVideo.hide();
        forestPlaying = false;
      });
      }, 185000);

    setTimeout(() => {
      forestVideo.stop();
      forestVideo.hide();
      forestvideoPlaying = false;
    }, 189000);

    // Set a timeout to freeze the video streams after 190 seconds
    setTimeout(freezeVideos, 190000); 


}

function gotMineConnectOthers(myStream) {
  p5live = new p5LiveMedia(this, "CAPTURE", myStream, "arbitraryDataRoomName");
  p5live.on('stream', gotOtherStream);
  p5live.on('disconnect', lostOtherStream);
  p5live.on('data', gotData);
}

function eyevideoLoaded() {
  eyeVideo.play();
  eyevideoPlaying = true;
}

function chipvideoLoaded() {
  chipVideo.play();
  chipvideoPlaying = true;
}

function cityvideoLoaded() {
  cityVideo.play();
  cityvideoPlaying = true;
}

function earthvideoLoaded() {
  earthVideo.play();
  earthvideoPlaying = true;
}

function camvideoLoaded() {
  camVideo.play();
  camvideoPlaying = true;
}

function streetvideoLoaded() {
  streetVideo.play();
  streetvideoPlaying = true;
}

function protestvideoLoaded() {
  protestVideo.play();
  protestvideoPlaying = true;
}

function neurovideoLoaded() {
  neuroVideo.play();
  neurovideoPlaying = true;
}

function forestvideoLoaded() {
  forestVideo.play();
  forestvideoPlaying = true;
}


function draw() {
  background(255, 0, 0);
  stroke(255);

  // Set the desired font size for the text
  textSize(40); // Change this value to set your preferred font size
  fill(0, 255, 0); // Change this value to set your preferred text color

  for (var id in allConnections) {
    let thisConnectJSON = allConnections[id];
    let x = thisConnectJSON.x;
    let y = thisConnectJSON.y;

    // Display either the video or the frozen frame
    if (frozenFrames[id]) {
      image(frozenFrames[id], x, y, vidWidth, vidHeight);
    } else {
      image(thisConnectJSON.video, x, y, vidWidth, vidHeight);
    }

    stroke(0);
    text(thisConnectJSON.name, x - 20, y - 20);
  }

  // Position the input box at the bottom center of the canvas
  nameField.position((width - nameField.width) / 2, height - nameField.height - 100);

    if (eyevideoPlaying) {
    // Calculate the position to center the video
    let eyeVideoWidth = eyeVideo.width;
    let eyeVideoHeight = eyeVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(eyeVideo, 0, 0, eyeVideoWidth, eyeVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (chipvideoPlaying) {
    // Calculate the position to center the video
    let chipVideoWidth = chipVideo.width;
    let chipVideoHeight = chipVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(chipVideo, 0, 0, chipVideoWidth, chipVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (cityvideoPlaying) {
    // Calculate the position to center the video
    let cityVideoWidth = cityVideo.width;
    let cityVideoHeight = cityVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(cityVideo, 0, 0, cityVideoWidth, cityVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (earthvideoPlaying) {
    // Calculate the position to center the video
    let earthVideoWidth = earthVideo.width;
    let earthVideoHeight = earthVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(earthVideo, 0, 0, earthVideoWidth, earthVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (camvideoPlaying) {
    // Calculate the position to center the video
    let camVideoWidth = camVideo.width;
    let camVideoHeight = camVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(camVideo, 0, 0, camVideoWidth, camVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (streetvideoPlaying) {
    // Calculate the position to center the video
    let streetVideoWidth = streetVideo.width;
    let streetVideoHeight = streetVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(streetVideo, 0, 0, streetVideoWidth, streetVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (protestvideoPlaying) {
    // Calculate the position to center the video
    let protestVideoWidth = protestVideo.width;
    let protestVideoHeight = protestVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(protestVideo, 0, 0, protestVideoWidth, protestVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (neurovideoPlaying) {
    // Calculate the position to center the video
    let neuroVideoWidth = neuroVideo.width;
    let neuroVideoHeight = neuroVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(neuroVideo, 0, 0, neuroVideoWidth, neuroVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

      if (forestvideoPlaying) {
    // Calculate the position to center the video
    let forestVideoWidth = forestVideo.width;
    let forestVideoHeight = forestVideo.height;

    tint(255, 255); // Set opacity to 50%
    blend(forestVideo, 0, 0, forestVideoWidth, forestVideoHeight, 0, 0, width, height, MULTIPLY);
    noTint(); // Reset tint after use
  }

}

// We got a new stream!
function gotOtherStream(stream, id) {
  otherVideo = stream;
  otherVideo.size(vidWidth, vidHeight);
  allConnections[id] = {
    'video': otherVideo,
    'name': id,
    'x': 0,
    'y': 0
  };
  otherVideo.hide();
  mouseDragged(); //send them your location
  enteredName(); //send them your name
}

function lostOtherStream(id) {
  print("lost connection " + id);
  delete allConnections[id];
}

function mouseDragged() {
  //change locally
  allConnections['Me'].x = mouseX;
  allConnections['Me'].y = mouseY;
  //send to others
  let dataToSend = {
    dataType: 'location',
    x: mouseX,
    y: mouseY
  };
  // Send it
  p5live.send(JSON.stringify(dataToSend));
}

function enteredName() {
  //change locally
  allConnections['Me'].name = nameField.value();
  let dataToSend = {
    dataType: 'name',
    name: nameField.value()
  };
  print(dataToSend);
  // Send it
  p5live.send(JSON.stringify(dataToSend));
}

function gotData(data, id) {
  let d = JSON.parse(data);

  print(d.dataType);
  if (d.dataType == 'name') {
    allConnections[id].name = d.name;
  } else if (d.dataType == 'location') {
    allConnections[id].x = d.x;
    allConnections[id].y = d.y;
  } else if (d.dataType == 'freeze') {
    // Freeze the video streams on receiving the freeze signal
    freezeVideos();
  }
}

// ─── Speech-Rec callback ──────────────────────────────────────────────
function showResult() {
  if (!myRec.resultValue) return;

  let rec = myRec.resultString;          // keep original case for Chinese
  text(rec, width / 2, height / 2);      // still display on canvas

  listening.forEach(phrase => {
    if (rec.includes(phrase)) {
      console.log("Match:", phrase);

      // pick predefined reply or echo the phrase itself
      let reply = replies[phrase] || phrase;
      speech.speak(reply);               // <- synthesize it
    }
  });
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gatherText.position((windowWidth - gatherText.width) / 2, 10); // Reposition the text when the window is resized
}

// Function to freeze the video streams
function freezeVideos() {
  for (let id in allConnections) {
    let thisConnectJSON = allConnections[id];
    let video = thisConnectJSON.video;

    // Capture the current frame as a frozen frame
    video.loadPixels();
    let frozenFrame = createImage(video.width, video.height);
    frozenFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
    frozenFrames[id] = frozenFrame;

    // Stop the video stream
    video.stop();
  }

  // Send a freeze signal to other clients
  let dataToSend = {
    dataType: 'freeze'
  };
  p5live.send(JSON.stringify(dataToSend));
}

function mousePressed() {
  userStartAudio();
}
