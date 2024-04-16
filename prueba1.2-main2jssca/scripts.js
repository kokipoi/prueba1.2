let cart = [];

function showCart() {
    const cartItemsModal = document.getElementById("cartModal");
    cartItemsModal.innerHTML = "";
    if (cart.length === 0) {
        cartItemsModal.innerHTML = "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'>El carrito está vacío</div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button></div></div></div>";
    } else {
        const cartItemsList = document.createElement("ul");
        cartItemsList.classList.add("list-group");
        const cartCounts = {}; 
        cart.forEach(item => {
            const itemId = item.id;
            if (!cartCounts[itemId]) {
                cartCounts[itemId] = 1;
            } else {
                cartCounts[itemId]++;
            }
        });
        let total = 0; 
        for (const itemId in cartCounts) {
            if (cartCounts.hasOwnProperty(itemId)) {
                const quantity = cartCounts[itemId];
                const product = products.find(p => p.id == itemId);
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item");
                const itemTotal = product.price * quantity;
                total += itemTotal;
                listItem.textContent = `${product.name} - $${product.price} x ${quantity} = $${itemTotal}`;
                cartItemsList.appendChild(listItem);
            }
        }
        cartItemsModal.appendChild(cartItemsList);
        const totalContainer = document.createElement("div");
        totalContainer.classList.add("total-container");
        totalContainer.innerHTML = `<p class="total">Total: $${total}</p>`;
        cartItemsModal.appendChild(totalContainer);
        const modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");
        const closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "btn btn-secondary");
        closeButton.setAttribute("data-dismiss", "modal");
        closeButton.textContent = "Cerrar";
        modalFooter.appendChild(closeButton);
        cartItemsModal.appendChild(modalFooter);
    }
    $('#cartModal').modal('show');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
}


function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}


const products = [
    { id: 1, name: "Perritos", price: 100, link: "perritos.html" },
    { id: 2, name: "Gatitos", price: 200, link: "gatitos.html" },
    { id: 3, name: "Pajaritos", price: 300, link: "pajarito.html" }
];

function displayProducts() {
    const productsDiv = document.getElementById("products");
    products.forEach(product => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");
        col.innerHTML = `
            <div class="card">
                <img src="https://via.placeholder.com/300x200?text=${product.name}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    <a href="${product.link}" class="btn btn-secondary">Detalles</a>
                </div>
            </div>
        `;
        productsDiv.appendChild(col);
    });
}


window.onload = function() {
    displayProducts();
};
