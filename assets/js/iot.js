// ssh -i "TeatroRobot.pem" ubuntu@ec2-44-207-109-249.compute-1.amazonaws.com

const clientId = "ws" + Math.random();
// Create a client instance
const client = new Paho.MQTT.Client("44.207.109.249", 9001, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect, userName: 'randy',
password: 'teatro01'});


// called when the client connects
function onConnect() {
  console.log("Conectado");
  // Crear suscripciones
  client.subscribe('teatro/actor1prep');
  client.subscribe('teatro/actor2prep');
  client.subscribe('teatro/actor3prep');
  client.subscribe('teatro/narradorComp');
  client.subscribe('teatro/narradorSpeaker');
  client.subscribe('teatro/escenarioprep');
  client.subscribe('teatro/accion');
  client.subscribe('teatro/ejecutor');
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión Perdida:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName +": "+message.payloadString);
  if(message.destinationName == 'teatro/actor1prep')
    document.getElementById('actor1').textContent = message.payloadString;
  if(message.destinationName == 'teatro/actor2prep')
    document.getElementById('actor2').textContent = message.payloadString;
  if(message.destinationName == 'teatro/actor3prep')
    document.getElementById('actor3').textContent = message.payloadString;
  if(message.destinationName == 'teatro/narradorComp')
    document.getElementById('narradorComputadora').textContent = message.payloadString;
  if(message.destinationName == 'teatro/narradorSpeaker')
    document.getElementById('narradorKero').textContent = message.payloadString;
  if(message.destinationName == 'teatro/escenarioprep')
    document.getElementById('escenario').textContent = message.payloadString;
  if(message.destinationName == 'teatro/accion')
    document.getElementById('accion').textContent = message.payloadString;
  if(message.destinationName == 'teatro/ejecutor')
    document.getElementById('ejecutor').textContent = message.payloadString;
}