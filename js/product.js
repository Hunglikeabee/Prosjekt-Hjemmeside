// import { allProducts } from "./products/productList.js";
const gamesContainer = document.querySelector(".games__container");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".cart-total");

const cartQuantity = document.querySelector(".cart-quantity");

let cartArray = [];


const urlApi = `http://hunglikeabee.one/CMS-CA/wp-json/wc/store/products`

async function getRestApi() {
    try {
        const getData = await fetch("https://noroffcors.herokuapp.com/" + urlApi);
        const result = await getData.json();
        console.log(result);

        gamesContainer.innerHTML = "";
        
        for(let i = 0; i < result.length; i++) {
                        gamesContainer.innerHTML += `<div class="product">
                                                        <a href="details.html?game=${result[i].id}" class="game${result[i].id}">
                                                            <h2 class="product-name">${result[i].name}</h2>
                                                            <div style="background-image: url(${result[i].images[0].src})" class="product-image"></div>
                                                            <div class="product-price">${result[i].prices.price} NOK</div>
                                                        </a>
                                                        <button class="product-button" data-product="${result[i].id}">Add to cart</button>
                                                    </div>`;



        }
        return result;

    }
    catch(error) {
        console.log(error);
    }

}

getRestApi();

// allProducts.forEach(function(product) {

//     gamesContainer.innerHTML += `   <div class="product">
//                                         <a href="details.html?game=${product.id}" class="game${product.id}">
//                                             <h2 class="product-name">${product.name}</h2>
//                                             <div style="background-image: url(${product.image})" class="product-image"></div>
//                                             <div class="product-price">${product.price} NOK</div>
//                                         </a>
//                                         <button class="product-button" data-product="${product.id}">Add to cart</button>
//                                     </div>
//                                 `
// });


const buttons = document.querySelectorAll("product-button");
buttons.forEach(function(button) {
    button.onclick = function(event){
        const itemToAdd = result.find(item => item.id === event.target.dataset.product);
        console.log("Hey")
        cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
    }
});

function showCart(cartItems) {
    cart.style.display = "block";
    cartList.innerHTML = "";
    let total = 0;

    let itemQuantity = 0;

    
    cartItems.forEach(function(cartElement) {
        console.log(cartItems)
        total += cartElement.price;
                    
        itemQuantity++;
        cartQuantity.innerHTML = "Total items: " + itemQuantity;

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