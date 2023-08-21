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
// Inside the window.addEventListener("load", ...) block

// Function to update the shopping cart content in the dropdown
function updateShoppingCartDropdown(cartItems) {
    const cartContent = document.getElementById("shopping-cart-content");
    cartContent.innerHTML = "";

    if (cartItems.length === 0) {
        cartContent.innerHTML = "<p class='dropdown-item-text'>Your cart is empty</p>";
    } else {
        for (const item of cartItems) {
            cartContent.innerHTML += `
                <div class="dropdown-item">
                    ${item.quantity} x ${item.productName} - &euro;${item.totalPrice.toFixed(2)}
                    <button class="delete-button" data-product-id="${item.productId}">Delete</button>
                </div>
                <div class="dropdown-divider"></div>
            `;
        }

        // Add a "Checkout" button
        cartContent.innerHTML += `
            <a class="dropdown-item" href="#!">Checkout</a>
        `;

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-product-id");
                deleteCartItem(productId);
            });
        });
    }
}
function deleteCartItem(productId) {
    // Add your fetch logic here to delete the cart item
    // Update the cart content after successful deletion
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

// Example cart items for testing
const exampleCartItems = [
    { productName: "Product 1", quantity: 2, totalPrice: 25.00 },
    { productName: "Product 2", quantity: 1, totalPrice: 15.00 }
];

// Call this function to populate the shopping cart dropdown with example items
updateShoppingCartDropdown(exampleCartItems);
