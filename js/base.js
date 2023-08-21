// const BACKEND_URL = 'http://localhost:8082'; // localhost
const BACKEND_URL = 'https://20.8.129.26:8082'; //Azure

function displaySuccessMessage(message) {
    let messagesContainerElement = document.getElementById('messages-container');
    let alertId = new Date().getTime();
    messagesContainerElement.innerHTML += `
        <div id="alert-fixed-${alertId}" class="alert alert-success alert-dismissible alert-fixed" role="alert">
            <span id="alert-fixed-message">${message}</span>
            <button type="button" class="btn-close pull-right" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `

    setTimeout(function () {
        var alertList = document.querySelectorAll('#alert-fixed-' + alertId);
        alertList.forEach(function (alertNode) {
            bootstrap.Alert.getOrCreateInstance(alertNode).close();
        })
    }, 5000)
}
