var SerialPort = require("serialport");
//var serialPort = new SerialPort("/dev/ttyACM0",  baudrate: 9600});

//serialPort.on("open", function () { console.log('open'); });

function sendData(data){
  serialPort.write(new Buffer(data,'ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
}

var OmxManager = require('omx-manager');
var manager = new OmxManager();
var camera = manager.create('video.mkv',{
  '-o': 'hdmi',
  '--vol': 13,
  '-b': true,
});

function startClient(){
var socket = require('socket.io-client')('http://192.168.0.4:3000');
socket.on('connect', function(){
  console.log('connected');
});

socket.on('play', function(data){
  camera.play();
});
setInterval(function(){
  console.log(camera.getStatus());
},1000)

socket.on('disconnect', function(){});
}

setTimeout(startClient,3000);

