//
// printserver.js
//    WebSocket print server
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2016
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the mods
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//
// check command line
//
if (process.argv.length < 4) {
   console.log("command line: node printserver.js [client_address] [server_port]")
   process.exit(-1)
}

//
// Required modules
//
var serialport = require('serialport')
var SerialPort = serialport.SerialPort
var WebSocketServer = require('ws').Server

//
// start server
//
var client_address = process.argv[2]
var server_port = process.argv[3]
console.log("listening for connection from client address "+client_address+" on server port "+server_port)
wss = new WebSocketServer({port:server_port})

//
// Globals
//
var outmsg = {}

var serPort

//
// handle connection
//
wss.on('connection',function(ws) {
   //
   // check address
   //
   if (ws._socket.remoteAddress != client_address) {
      console.log("connection rejected from "+ws._socket.remoteAddress)
      ws.send('socket closed')
      ws.close()
   }
   else {
      console.log("connection accepted from "+ws._socket.remoteAddress)
   }
   //
   // handle messages
   //
   ws.on("message",function(msg) {
      outmsg = {}
      var message = JSON.parse(msg)
      console.log(msg)
      switch(message.type){
         case 'close':
            console.log("Closing Serial Port")
            serPort.close()
            break;
         case 'open':
            serPort = new SerialPort(message.port,{baudRate:message.baud})
            serPort.on('open',handleSerialOpen)
            serPort.on('data',handleSerialData)
            serPort.on('close',handleSerialClose)
            serPort.on('error',handleSerialError)
            break;
         case 'scan':
            outmsg.type = 'ports'
            serialport.list(function (err, ports) {
               outmsg.data = []
               ports.forEach(function(port){
                  outmsg.data.push(port.comName)
                  })
               console.log('Ports:')
               console.log(outmsg.data)
               ws.send(JSON.stringify(outmsg))
               })
            break;
         case 'send':
            console.log("Sending")
            break;
         default:
            console.log("Could not parse message")
         }
   })
   //
   // Ser
   //
   // close
   //
   ws.on("close",function() {
      console.log("connection closed")
      })
   //
   // Serial Handler Functions
   //
   function handleSerialOpen(){
      var self = this
      console.log("Serial Opened with datarate "+self.options.baudRate)
      }
   function handleSerialData(data){
      console.log(data)
      var msg = {}
         msg.type = 'data'
         msg.data = data
      ws.send(JSON.stringify(msg))
      }
   function handleSerialClose(){
      console.log("Serial Port Closed.")
      }
   function handleSerialError(){

      }
   })

