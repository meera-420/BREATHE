//darkmode button
function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

// progress bar

var audio_id = document.getElementById("cs_audio");
// audio_vol = audio_id.volume; //creating variable for volume
audio_id.volume = 0.6; //setting the volume

//creating a varible to measure time of the voice
try {
  var measuredTime = new Date(null);
  measuredTime.setSeconds(audio_id.duration); // specify value of SECONDS
  var MHSTime = measuredTime.toISOString().substr(11, 8);

  var a = MHSTime.split(":"); // split it at the colons

  // Hours are worth 60 minutes.
  var minutes = +a[0] * 60 + +a[1];
  document.getElementById("cs_audio_duration").innerHTML =
    minutes + ":" + (+a[2] % 60); //to show time
} catch (err) {
  audio_id.addEventListener("loadedmetadata", function () {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(audio_id.duration); // specify value of SECONDS
    var MHSTime = measuredTime.toISOString().substr(11, 8);
    document.getElementById("cs_audio_duration").innerHTML = MHSTime;

    var a = MHSTime.split(":"); // split it at the colons

    // Hours are worth 60 minutes.
    var minutes = +a[0] * 60 + +a[1];
    // console.log(minutes + ":" + ((+a[2]) % 60));
    document.getElementById("cs_audio_duration").innerHTML =
      minutes + ":" + (+a[2] % 60);
  });
}

//progress bar for time
audio_id.ontimeupdate = function () {
  var audio_currentTime = audio_id.currentTime;

  var playingPercentage = (audio_currentTime / audio_id.duration) * 100;
  document.getElementsByClassName("cs_audio_bar_now")[0].style.width =
    playingPercentage + "%";

  var measuredTime = new Date(null);
  measuredTime.setSeconds(audio_currentTime); // specify value of SECONDS
  var MHSTime = measuredTime.toISOString().substr(11, 8);

  var spilited_time = MHSTime.split(":"); // split it at the colons
  // Hours are worth 60 minutes.
  var minutes = +spilited_time[0] * 60 + +spilited_time[1];
  document.getElementById("cs_audio_current_time").innerHTML =
    minutes + ":" + (+spilited_time[2] % 60);

// conditions if audio is paused
  if (audio_id.paused) {
    document.getElementById("cs_audio_play").style.display = "inline-block";
    document.getElementById("cs_audio_pause").style.display = "none";
  } else {
    document.getElementById("cs_audio_pause").style.display = "inline-block";
    document.getElementById("cs_audio_play").style.display = "none";
  }
//conditions if mute
  if (audio_id.volume == 0) {
    document.getElementById("cs_audio_sound").style.color = "#ff8935";
  } else {
    document.getElementById("cs_audio_sound").style.color = "#fff";
  }
};

//function to pause/play
function playPause() {
  if (audio_id.paused) {
    audio_id.play();
  } else {
    audio_id.pause();
  }
}

//play at click
document.getElementById("cs_audio_play").addEventListener("click", function () {
  audio_id.play();
});

//pause at click
document
  .getElementById("cs_audio_pause")
  .addEventListener("click", function () {
    audio_id.pause();
  });

//defining key functions
document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      audio_currentTime = audio_id.currentTime;
      audio_id.currentTime = audio_currentTime - 5;
      break;
    case 38:
      event.preventDefault();
      audio_vol = audio_id.volume;
      if (audio_vol != 1) {
        try {
          audio_id.volume = audio_vol + 0.02;
        } catch (err) {
          audio_id.volume = 1;
        }
      }

      //change colour when mute
      if (audio_id.volume == 0) {
        document.getElementById("cs_audio_sound").style.color = "#ff8935";
      } else {
        document.getElementById("cs_audio_sound").style.color = "#fff";
      }

      break;
    case 39:
      event.preventDefault();
      audio_currentTime = audio_id.currentTime;
      audio_id.currentTime = audio_currentTime + 5;
      break;
    case 40:
      event.preventDefault();
      audio_vol = audio_id.volume;

      //condition if not mute
      if (audio_vol != 0) {
        try {
          audio_id.volume = audio_vol - 0.02;
        } catch (err) {
          audio_id.volume = 0;
        }
      }

      if (audio_id.volume == 0) {
        document.getElementById("cs_audio_sound").style.color = "#ff8935";
      } else {
        document.getElementById("cs_audio_sound").style.color = "#fff";
      }

      break;

    case 32:
      event.preventDefault();
      playPause();
      break;
  }
};

// Progress bar or buffer or seek bar for Buffer bar
audio_id.addEventListener(
  "progress",
  function () {
    var ranges = [];
    var totaltime = audio_id.duration;
    var currentduration = audio_id.currentTime;
    for (var i = 0; i < audio_id.buffered.length; i++) {
      ranges.push([
        (buffTimestart = audio_id.buffered.start(i)),
        (buffTimeend = audio_id.buffered.end(i)),
        (buffpercentage = (buffTimeend / totaltime) * 100),
        (document.getElementsByClassName("cs_audio_bar_loaded")[0].style.width =
          buffpercentage + "%"),
      ]);
    }
  },
  false
);

// Change current play on click
document
  .getElementsByClassName("cs_audio_bar")[0]
  .addEventListener("click", vCurrentBarFun);
function vCurrentBarFun(event) {
  vCurrentBarWidth =
    event.clientX -
    document.getElementsByClassName("cs_audio_bar")[0].offsetLeft;
  document.getElementsByClassName("cs_audio_bar_now")[0].style.width =
    vCurrentBarWidth + "px";
  audio_id.currentTime =
    (((vCurrentBarWidth /
      document.getElementsByClassName("cs_audio_bar")[0].offsetWidth) *
      100) /
      100) *
    audio_id.duration;
}

//display conditions if paused
if (audio_id.paused) {
  document.getElementById("cs_audio_pause").style.display = "none";
} else {
  document.getElementById("cs_audio_play").style.display = "none";
}

//volume change
audio_id.onvolumechange = function (event) {
  audio_vol = audio_id.volume;
  vol_width = audio_vol * 65;

  currentVolBar =
    event.clientX - document.getElementsByClassName("cs_volBar")[0].offsetLeft;
  document.getElementsByClassName("cs_volume")[0].style.width =
    vol_width + "px";
};

//volume bar change
document
  .getElementsByClassName("cs_volBar")[0]
  .addEventListener("click", audio_vol_fun);
function audio_vol_fun(event) {
  current_vol_width =
    event.clientX -
    document.getElementsByClassName("cs_volBar")[0].getBoundingClientRect()
      .left;
  document.getElementsByClassName("cs_volume")[0].style.width =
    current_vol_width + "px";

  var calculated_vol = current_vol_width / 65;
  audio_id.volume = calculated_vol;
}


function cspd_change_music(music) {
  audio_id.pause();
  audio_id.setAttribute("src", music);
  audio_id.load();

  audio_id.play();

  try {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(audio_id.duration); // specify value of SECONDS
    var MHSTime = measuredTime.toISOString().substr(11, 8);

    var a = MHSTime.split(":"); // split it at the colons

    // Hours are worth 60 minutes.
    var minutes = +a[0] * 60 + +a[1];
    // console.log(minutes + ":" + ((+a[2]) % 60));
    document.getElementById("cs_audio_duration").innerHTML =
      minutes + ":" + (+a[2] % 60);
  } catch (err) {
    audio_id.addEventListener("loadedmetadata", function () {
      var measuredTime = new Date(null);
      measuredTime.setSeconds(audio_id.duration); // specify value of SECONDS
      var MHSTime = measuredTime.toISOString().substr(11, 8);
      document.getElementById("cs_audio_duration").innerHTML = MHSTime;

      var a = MHSTime.split(":"); // split it at the colons

      // Hours are worth 60 minutes.
      var minutes = +a[0] * 60 + +a[1];
      // console.log(minutes + ":" + ((+a[2]) % 60));
      document.getElementById("cs_audio_duration").innerHTML =
        minutes + ":" + (+a[2] % 60);
    });
  }
}

// function fade() {
//   if("cs_audio_current_time" > 60){
// 	$('text1').fadeIn();
// }
// 	};
// fade();
