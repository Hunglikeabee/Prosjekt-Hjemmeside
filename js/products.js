import { allProducts } from "./products/productList.js";
const gamesContainer = document.querySelector(".games__container");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".cart-total");
let cartArray = [];


allProducts.forEach(function(product) {

    gamesContainer.innerHTML += `   <div class="product">
                                        <a href="details.html?game=${product.id}" class="game${product.id}">
                                            <h2 class="product-name">${product.name}</h2>
                                            <div style="background-image: url(${product.image})" class="product-image"></div>
                                            <div class="product-price">${product.price} NOK</div>
                                        </a>
                                        <button class="product-button" data-product="${product.id}">Add to cart</button>
                                    </div>
                                `
});


const buttons = document.querySelectorAll("button");
buttons.forEach(function(button) {
    button.onclick = function(event){
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

        console.log(cartItems)

        if (cartItems.id.includes(cartElement.id)) {
            console.log(cartItems)
            console.log("true")
        }

        cartList.innerHTML += `
                                <div class="cart-item">
                                    <a href="details.html?game=${cartElement.id}">
                                        <h4>${cartElement.name}</h4>
                                        <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
                                    </a>
                                </div>
                              `
    });
    const decimalFix = parseFloat(`${total}`).toFixed(2);
    totalContainer.innerHTML = `Total: ${decimalFix}NOK`;
};