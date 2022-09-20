//Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.Information)
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// Connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerHTML = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerHTML = value.toString();
});

//invoke hub methods aka send notification to hub
function newWindowLoadOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "John López").then((value) => console.log("test", value));
}

// start connection
function fulfilled() {
    // do something on start
    console.log("Connection Ok");
    newWindowLoadOnClient();
}
function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);

