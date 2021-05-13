$(window).on("load",function(){
  $(".loader-wrapper").fadeOut("slow");
});

function toggle(){
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

var playOn = document.getElementById('song');

function playing(){
  playOn.play();
}

AOS.init();

var countDownDate = new Date("Jun 3, 2021 08:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate Remaining Time
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;

  // If the countdown is finished, write some text
  function timesup(){
      var habis = document.getElementById("habis");
      habis.classList.toggle('aktif');
      
      var waktu = document.getElementById("times");
      waktu.classList.toggle('aktif');
      var waktu1 = document.getElementById("times1");
      waktu1.classList.toggle('aktif');
      var waktu2 = document.getElementById("times2");
      waktu2.classList.toggle('aktif');
      var waktu3 = document.getElementById("times3");
      waktu3.classList.toggle('aktif');

      var separator = document.getElementById("separator");
      var separator1 = document.getElementById("separator1");
      var separator2 = document.getElementById("separator2");

      separator.classList.toggle('aktif');
      separator1.classList.toggle('aktif');
      separator2.classList.toggle('aktif');
    }
  
  if (distance < 0) {
    clearInterval(x);
    timesup();
    document.getElementById("habis").innerHTML = "Pernikahan 'sedang' / 'telah selesai' dilaksanakan";
  }
}, 1000);


//firebase
var firebaseConfig = {
    apiKey: "AIzaSyDDi2sRsUuXH52Cguo1hAGTwjO3NCl_09I",
    authDomain: "zulfa-d727f.firebaseapp.com",
    databaseURL: "https://zulfa-d727f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zulfa-d727f",
    storageBucket: "zulfa-d727f.appspot.com",
    messagingSenderId: "1087071363347",
    appId: "1:1087071363347:w eb:4dd886154a1796c49bbae6"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  function add_task(){
    input_box = document.getElementById("message");
    input_date = document.getElementById("name");
  
    if(input_box.value.length != 0 && input_date.value.length != 0){
      // our boxes have data and we take database
      var key = firebase.database().ref().child("comments").push().key;
      var task = {
        ucapan: input_box.value,
        nama: input_date.value,
        key: key
      };
  
      var updates = {};
      updates["/comments/" + key] = task;
      firebase.database().ref().update(updates);
      create_unfinished_task();
      swal("Pesan telah terkirim", "Silakan cek pesan anda di kolom yang sudah ada", "success");
      input_box.value='';
      input_date.value='';
    }
  }


function create_unfinished_task(){
    unfinished_task_container = document.getElementsByClassName("container1")[0];
    unfinished_task_container.innerHTML = "";
  
    task_array = [];
    firebase.database().ref("comments").once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        task_array.push(Object.values(childData));
      });
      for(var i, i = 0; i < task_array.length; i++){
        task_nama = task_array[i][1];
        task_key = task_array[i][0];
        task_ucapan = task_array[i][2];  
  
        task_container = document.createElement("div");
        task_container.setAttribute("class", "task_container");
        task_container.setAttribute("data-key", task_key);
  
        // TASK DATA  
        task_data = document.createElement('div');
        task_data.setAttribute('id', 'task_data');
  
        ucapan = document.createElement('p');
        ucapan.setAttribute('id', 'task_ucapan');
        ucapan.innerHTML = task_ucapan;
  
        nama = document.createElement('p');
        nama.setAttribute('id', 'task_nama');
        nama.innerHTML = "-" + task_nama + "-";


  
        unfinished_task_container.append(task_container);
        task_container.append(task_data);
        task_data.append(ucapan);
        task_data.append(nama);
      }
  
    });
    
  }
