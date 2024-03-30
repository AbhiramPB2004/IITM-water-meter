const express = require('express');
const { Server } = require('socket.io');
var bodyParser = require('body-parser');

let humidity = 0 ;
let temperature = 0;
let flowrate = 0;
let waterconsumption = 0;  
let LDR = 0;
let soilMoisture = 0;
const app = express();

app.use(bodyParser.json()); 
const server = app.listen(3000, () => {
    console.log('Application started on port 3000!');
});

const socketIo = new Server(server, {
    cors: {
        origin: '*', // Allow any origin for testing purposes. This should be changed on production.
    },
});

app.post('/receive', (req, res) => {
    const data = req.body;
    // console.log('Received data:', data);
    humidity = data.humidity;
    temperature = data.temperature; 
    flowrate = data.flowrate;
    waterconsumption = data.waterosumption;
    LDR = data.LDR; 
    soilMoisture = data.SoilMoisture;   

    
    res.send('Success');
});

socketIo.on('connection', async(socket) => {
    console.log('New connection created');

    const token = socket.handshake.auth.token;
    console.log('Auth token', token);

    try {
       
    } catch (error) {
        socket.disconnect(true);
    }

 
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

   
    socket.on('message_from_client', (data) => {
        console.log('message_from_client: ', data);
    });

    
  
    setInterval(async() => {
        // const data = 'Continuous data';
        // console.log(humidity);
        socket.emit('humidity', humidity);
        socket.emit('temperature', temperature);
        const currentTime = new Date().toLocaleTimeString();
        socket.emit('flowrate', {"flowrate": flowrate,"time": currentTime});
        socket.emit('waterconsumption', waterconsumption);
        socket.emit('LDR', LDR);
        socket.emit('SoilMoisture', soilMoisture);

        console.log(waterconsumption);
        // socket.emit('current_time', currentTime);
    }, 1000);

   
    
});