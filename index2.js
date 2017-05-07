var SerialPort = require("serialport");
    var serialPort = new SerialPort("/dev/ttyACM0", {
      baudrate: 9600
    });
    
    serialPort.on("open", function () {
      console.log('open');
      
      serialPort.on('data', function(data) {
        console.log('data received: ' + data);
      });
  sendData('C');
  setTimeout(function(){
    sendData('D');
  },3000)
  setTimeout(function(){
    sendData('C');
  },6000)      
    });

function sendData(data){
  serialPort.write(new Buffer(data,'ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
}
