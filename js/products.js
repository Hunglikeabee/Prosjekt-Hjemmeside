import { allProducts } from "./products/productList.js";
const gamesContainer = document.querySelector(".games__container");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".cart-total");
let cartArray = [];

console.log(allProducts);

allProducts.forEach(function(product) {
    gamesContainer.innerHTML += `
                                    <div class="product game${product.id}">
                                        <h2 class="product-name">${product.name}</h2>
                                        <div style="background-image: url(${product.image})" class="product-image"></div>
                                        <div class="product-price">${product.price} NOK</div>
                                        <button class="product-button" data-product="${product.id}">Add to cart</button>
                                    </div>
                                `
});


const buttons = document.querySelectorAll("button");
buttons.forEach(function(button) {
    button.onclick = function(event){
        // cartArray.push(event.target.dataset.product);
        const itemToAdd = allProducts.find(item => item.id === event.target.dataset.product);
        cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
    }
});

function showCart(cartItems) {
    cart.style.display = "block";
    cartList.innerHTML = "";
    let total = 0;
    cartItems.forEach(function(cartElement) {
        total += cartElement.price;
        cartList.innerHTML += `
                                <div class="cart-item">
                                    <h4>${cartElement.name}</h4>
                                    <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
                                </div>
                              `
    });
    totalContainer.innerHTML = `Total: ${total}NOK`;
};