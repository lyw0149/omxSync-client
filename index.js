var V1 = 
[41,60,
6*60+11,6*60+46,
9*60+19,9*60+53,
17*60+18,19*60+57,
24*60+46,26*60+20];

var V2 = 
[3*60+19,3*60+43,
7*60+12,7*60+48,
18*60+16,18*60+43,
20*60+20,21*60+33];

var V3 = 
[3*60+24,3*60+43,
7*60+12,7*60+48,
18*60+16,18*60+43,
20*60+20,21*60+4]

var V4 = 
[5*60+31,6*60*46,
10*60+36,11*60+20,
17*60+37,18*60+35]

var V1index = 0;
var V2index = 0;
var V3index = 0;
var V4index = 0;

var SerialPort = require("serialport");
//var serialPort = new SerialPort("/dev/ttyACM0",  {baudrate: 9600});

//serialPort.on("open", function () { console.log('open'); });

function sendData(data){
//  console.log(data);serialPort.write(new Buffer(data,'ascii'));
}

var OmxManager = require('omx-manager');
var manager = new OmxManager();
var camera = manager.create('video.mkv',{
  '-o': 'hdmi',
  '--vol': 13,
  '-b': true,
});

function startClient(){

  var socket = require('socket.io-client')('http://192.168.0.13:3000');
    socket.on('connect', function(){
    console.log('connected');
  });

  var startTime = 0;
  socket.on('play', function(data){
    camera.play();
    startTime= Date.now();
  });
  
  camera.on('end', function() {
    socket.emit('end');
  });

  setInterval(function(){
    var playtime = Math.floor((Date.now() - startTime)/1000);
    if(V1.length != 0 && playtime == V1[V1index]){
      if(V1index % 2 == 0){
        sendData('C');
      } else {
        sendData('D');
      }
      V1index ++;
      if(V1index == V1.length){
        V1index = 0;
      }
    }
    if(V2.length != 0 && playtime == V2[V2index]){ 
      if(V2index % 2 == 0){
        sendData('E');
      } else {
        sendData('F');
      }
      V2index ++;
      if(V2index == V2.length){
        V2index = 0;
      }
    }
    if(V3.length != 0 && playtime == V3[V3index]){ 
      if(V3index % 2 == 0){
        sendData('G');
      } else {
        sendData('H');
      }
      V3index ++;
      if(V3index == V3.length){
        V3index = 0;
      }
    }
    if(V4.length != 0 && playtime == V4[V4index]){ 
      if(V4index % 2 == 0){
        sendData('I');
      } else {
        sendData('J');
      }
      V4index ++;
      if(V4index == V4.length){
        V4index = 0;
      }
    }
  },950)

  socket.on('disconnect', function(){});
}

setTimeout(startClient,5000);

