//create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    console.log("value : ", value)
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

// invoke hub methods aka send notifications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "Praga").then((value) => {
        console.log(value);
    }) ;
}

function fulfilled() {
    console.log("connection to user hub successful");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("connection to user hub rejected");
}

connectionUserCount.start().then(fulfilled, rejected);