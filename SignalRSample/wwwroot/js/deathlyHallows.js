var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

//Create Connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.Information)
    .withUrl("/hubs/deathlyhallows", signalR.HttpTransportType.WebSockets).build();

// Connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});

// start connection
function fulfilled() {
    // do something on start
    console.log("Connection Ok");
    newWindowLoadOnClient();
}
function rejected() {
    //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);

