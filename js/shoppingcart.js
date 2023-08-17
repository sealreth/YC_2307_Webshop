function addShoppingCartEntry(accountId, productId, amount) {
    let dto = {
        'productId': productId,
        'accountId': accountId,
        'amount': amount
    }

    fetch(BACKEND_URL + '/api/shoppingcart/addproduct', {
        method: 'post',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dto)
    })
    .then(response => response.json())
    .then(success => {
        if (success) {
            let messagesContainerElement = document.getElementById('messages-container');
            messagesContainerElement.innerHTML = `
            <div id="alert-fixed" class="alert alert-success alert-dismissible alert-fixed" role="alert">
                <span id="alert-fixed-message">Product is toegevoegd</span>
                <button type="button" class="btn-close pull-right" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `

            getShoppingCartEntriesCount(accountId);
        }
    })
}

function getShoppingCartEntriesCount(accountId) {
    fetch(BACKEND_URL + '/api/shoppingcart/' + accountId + '/entry/count')
        .then(response => response.text())
        .then(count => {
            let shoppingCartCountElement = document.getElementById('shoppingcart-count');
            if (!!shoppingCartCountElement) {
                shoppingCartCountElement.innerText = count;
            } else {
                shoppingCartCountElement.innerText = 0;
            }
        })
}

window.addEventListener("load", (event) => {
    getShoppingCartEntriesCount(1);
});