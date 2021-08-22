const cartItems = JSON.parse(localStorage.getItem("cartList"))
const cartContainer = document.querySelector(".checkout-list");
const totalContainer = document.querySelector(".checkout-total");

let total = 0;
cartItems.forEach(function(cartElement) {
    total += parseInt(cartElement.prices.price);
    cartContainer.innerHTML += `<div class="checkout-item">
                                    <div style="background-image: url(${cartElement.images[0].src})" class="checkout-image"></div>
                                    <h4 class="checkout-name">${cartElement.name}</h4>
                                    <div class="checkout-price">${cartElement.prices.price} NOK</div>
                                </div>
                                `
});
const decimalFix = parseFloat(`${total}`).toFixed(2);
totalContainer.innerHTML = `Total: ${decimalFix}NOK`;