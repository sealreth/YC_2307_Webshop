function addShoppingCartEntry(productId, amount) {
    let dto = {
        'productId': productId,
        'accountId': localStorage.getItem("accountId"),
        'amount': amount
    }

    fetch(BACKEND_URL + '/api/shoppingcart/addproduct', {
        method: 'post',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dto)
    })
    .then(response => response.text())
    .then(success => {
        if (success) {
            displaySuccessMessage("Product is toegevoegd aan winkelwagen")        

            getShoppingCartEntries();
        }
    })
}

function getShoppingCartEntries() {
    fetch(BACKEND_URL + '/api/shoppingcart/' + localStorage.getItem("accountId") + '/entries')
        .then(response => response.json())
        .then(cartItems => {

            const cartContent = document.getElementById("shopping-cart-content");
            cartContent.innerHTML = "";

            document.getElementById('shoppingcart-count').innerText = cartItems.length;

            if (cartItems.length === 0) {
                cartContent.innerHTML = "<p class='dropdown-item-text'>Your cart is empty</p>";
            } else {
                for (const item of cartItems) {
                    cartContent.innerHTML += `
                        <div class="dropdown-item">
                            ${item.amount} x ${item.product.naam} - &euro; ${item.product.prijs}
                            <button class="delete-button" onclick="deleteCartItem(${item.id})">Delete</button>
                        </div>
                        <div class="dropdown-divider"></div>
                    `;
                }

                // Add a "Checkout" button
                cartContent.innerHTML += `
                    <a class="dropdown-item" href="#!">Checkout</a>
                `;
            }
        })
}

window.addEventListener("load", (event) => {
    getShoppingCartEntries();
});
// Inside the window.addEventListener("load", ...) block

function deleteCartItem(entryId) {
    // Add your fetch logic here to delete the cart item
    // Update the cart content after successful deletion
    fetch(BACKEND_URL + '/api/shoppingcart/entry/' + entryId, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(success => {
        if (success) {
            displaySuccessMessage("Product is verwijderd uit winkelwagen")

            getShoppingCartEntries();
        }
    })
}

// Function to show/hide the shopping cart dropdown
function toggleShoppingCartDropdown() {
    const cartDropdown = document.getElementById("shopping-cart-dropdown");
    cartDropdown.classList.toggle("show");
}

// Add event listener to the cart button to toggle the dropdown
const cartButton = document.getElementById("shopping-cart-button");
cartButton.addEventListener("click", () => {
    toggleShoppingCartDropdown();
});

