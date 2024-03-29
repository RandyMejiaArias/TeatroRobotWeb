const clientId = "ws" + Math.random();
// Create a client instance
const client = new Paho.MQTT.Client("broker.hivemq.com", 8884, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect(
  {
    onSuccess:onConnect,
    useSSL: true
  }
);

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
  client.subscribe('plataformasubir');
  client.subscribe('plataformabajar');
  client.subscribe('plataformadetener');
  client.subscribe('telonsubir');
  client.subscribe('telonbajar');
  client.subscribe('telondetener');
  client.subscribe('humoencender');
  client.subscribe('humoapagar');
  client.subscribe('luzAencender');
  client.subscribe('luzAapagar');
  client.subscribe('luzBencender');
  client.subscribe('luzBapagar');
}

/* Funciones Plataforma */
const onPlatformUp = () => {
  message = new Paho.MQTT.Message("4");
  message.destinationName = 'plataformasubir'
  client.send(message);
}

const onPlatformDown = () => {
  message = new Paho.MQTT.Message("5");
  message.destinationName = 'plataformabajar'
  client.send(message);
}

const onPlatformStop = () => {
  message = new Paho.MQTT.Message("6");
  message.destinationName = 'plataformadetener'
  client.send(message);
}

/* Funciones Telon */
const onScenaryOpen = () => {
  message = new Paho.MQTT.Message("2");
  message.destinationName = 'telonsubir'
  client.send(message);
}

const onScenaryClose = () => {
  message = new Paho.MQTT.Message("3");
  message.destinationName = 'telonbajar'
  client.send(message);
}

const onScenaryStop = () => {
  message = new Paho.MQTT.Message("1");
  message.destinationName = 'telondetener'
  client.send(message);
}

/* Funciones máquina de humo */
const onSmokeMachineOn = () => {
  message = new Paho.MQTT.Message("x");
  message.destinationName = 'humoencender'
  client.send(message);
}

const onSmokeMachineOff = () => {
  message = new Paho.MQTT.Message("y");
  message.destinationName = 'humoapagar'
  client.send(message);
}

/* Funciones Luces */
/* Luces Principales */
const onMainLightsOn = () => {
  message = new Paho.MQTT.Message("7");
  message.destinationName = 'luzAencender'
  client.send(message);
}

const onMainLightsOff = () => {
  message = new Paho.MQTT.Message("8");
  message.destinationName = 'luzAapagar'
  client.send(message);
}

/* Luces Secundarias */
const onSecondaryLightsOn = () => {
  message = new Paho.MQTT.Message("9");
  message.destinationName = 'luzBencender'
  client.send(message);
}

const onSecondaryLightsOff = () => {
  message = new Paho.MQTT.Message("0");
  message.destinationName = 'luzBapagar'
  client.send(message);
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