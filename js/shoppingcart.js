const cartItems = JSON.parse(localStorage.getItem("cartList"))
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let total = 0;
cartItems.forEach(function(cartElement) {
    total += cartElement.price;
    cartContainer.innerHTML += `<div class="cart-item">
                                    <h4>${cartElement.name}</h4>
                                    <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
                                    <div class="product-price">${cartElement.price} NOK</div>
                                </div>
                                `
});
totalContainer.innerHTML = `Total: ${total}`;