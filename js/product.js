function getAllProducts(after) {
    fetch(BACKEND_URL + '/alleproducten')
        .then(response => response.json())
        .then(producten => {
            after(producten)
        })
}