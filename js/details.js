const gameDetails  = document.querySelector(".game-details");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".cart-total");
let cartArray = [];

const getParameter = document.location.search;
const params = new URLSearchParams(getParameter);
const game = params.get("game");

if (game === null) {
    location.href = "/index.html";
};

const urlApi = `http://hunglikeabee.one/CMS-CA/wp-json/wc/store/products`

async function getRestApi() {
    try {
        const getData = await fetch("https://noroffcors.herokuapp.com/" + urlApi);
        const result = await getData.json();
        
        for (let i = 0; i < result.length; i++) {
            if (result[i].id == game) {
                document.title = `${result[i].name}`
                

                gameDetails.innerHTML = `<h2>${result[i].name}</h2>
                                        <div style="background-image: url(${result[i].images[0].src})" class="product-image"></div>
                                        <div class="product-text">${result[i].description}</div>
                                        <div class="product-price">${result[i].prices.price} NOK</div>
                                        <button class="product-button" data-product="${result[i].id}">Add to cart</button>
                                        `
            }
        }


        const buttons = document.querySelectorAll(".product-button");

        buttons.forEach(function(button) {
            button.onclick = function(event){
                const itemToAdd = result.find(item => item.id == event.target.dataset.product);
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
                
                total += parseInt(cartElement.prices.price);
                cartList.innerHTML += `
                                        <div class="cart-item">
                                            <a href="details.html?game=${cartElement.id}">
                                                <h4>${cartElement.name}</h4>
                                                <div style="background-image: url(${cartElement.images[0].src})" class="cart-image"></div>
                                            </a>
                                        </div>
                                      `
            });
            const decimalFix = parseFloat(`${total}`).toFixed(2);
            totalContainer.innerHTML = `Total: ${decimalFix}NOK`;
        };
    }
    catch(error) {
        console.log(error);
    }
}

getRestApi();