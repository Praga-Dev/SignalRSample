//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    console.log("value : ", value)
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

// invoke hub methods aka send notifications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

function fulfilled() {
    console.log("connection to user hub successful");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("connection to user hub rejected");
}

connectionUserCount.start().then(fulfilled, rejected);