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
            displaySuccessMessage("Product is toegevoegd")        

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