
const gamesContainer = document.querySelector(".games__container");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".cart-total");

const cartQuantity = document.querySelector(".cart-quantity");

var cartArray = [];


const urlApi = `http://hunglikeabee.one/CMS-CA/wp-json/wc/store/products`

async function getRestApi() {
    try {
        const getData = await fetch("https://noroffcors.herokuapp.com/" + urlApi);
        const result = await getData.json();

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
        
        const buttons = document.querySelectorAll(".product-button");
        buttons.forEach(function(button) {
            button.onclick = function(event){
                const itemToAdd = result.find(item => item.id == event.target.dataset.product);
                cartArray.push(itemToAdd);
                showCart(cartArray);
                localStorage.setItem("cartList", JSON.stringify(cartArray));
            }
        });


        const sortBy = document.querySelector("#sortby")

        sortBy.addEventListener("click", selectSort)

        function selectSort() {
            if (sortBy.value == "name") {
                function fixOrder( a, b ) {
                    if ( a.name < b.name ){
                    return -1;
                    }
                    if ( a.name > b.name ){
                    return 1;
                    }
                    return 0;
                }
                result.sort(fixOrder);
            }
            if (sortBy.value == "price") {
                function fixOrder( a, b ) {
                    if ( parseInt(a.prices.price) < parseInt(b.prices.price) ){
                    return -1;
                    }
                    if ( parseInt(a.prices.price) > parseInt(b.prices.price) ){
                    return 1;
                    }
                    return 0;
                }
                result.sort(fixOrder);

            }

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
            
        }





        function showCart(cartItems) {
            cart.style.display = "block";
            cartList.innerHTML = "";
            let total = 0;
        
            let itemQuantity = 0;
        
            
            cartItems.forEach(function(cartElement) {
                total += parseInt(cartElement.prices.price);
                            
                itemQuantity++;
                cartQuantity.innerHTML = "Total items: " + itemQuantity;
        
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


