
let cart = []
let items = []
let sum = 0
let itemsShown = false
let products = fetch('https://fakestoreapi.com/products/')
    .then(res=>res.json())
    .then(res => res.map(item=>(
        items.push(item)
    )))

let data = fetch('https://fakestoreapi.com/products/')
    .then(res=>res.json())
    .then(jsonData => jsonData.forEach((item)=>(
        document.querySelector(".products").insertAdjacentHTML('beforeend',
        `<div class="product">
        <img src="${item.image}" alt="${item.image}">
        <p class="title">${item.title}</p>
        <p class="price">
            <span>${item.price}</span>
            <span>&#8377</span>
        </p>
        <p class="category">${item.category}</p>
        <p class="description">${item.description}</p>
        <p class="cart"><button onclick="addToCart(${item.id})">Add to Cart</button>
        </p>
    </div>`)
    )))

    let addToCart = (productid)=>{
        const product  = items.find(item => item.id == productid)
        const existingItem = cart.find(item=>item.id == productid)

        if(existingItem){
            existingItem.quantity++;
            sum += product.price
        }else{
            cart.push({
                id:productid,
                name:product.title,
                price:product.price,
                quantity:1
            })
            sum+=product.price
        }
    }
    
    function showCartItems(){
        cart.map((item)=>(
            document.querySelector(".cart").insertAdjacentHTML('beforeend',`<li>${item.name},${item.price},${item.quantity}</li>`)
        )) 
        document.querySelector('#totalprice').insertAdjacentHTML('beforeend',`Total Price : ${sum}`)
    }
function performSearch(){
    let searchQuery = document.getElementById('searchText').value
    let resultContainer = document.getElementById('results')
     resultContainer.innerHTML = "";
    console.log(searchQuery)
     items.map((item)=>{
        var match = false;
        for(var title in item){
            if(item[title].toString().toLowerCase().includes(searchQuery)){
                match = true
                break
            }
        }
        if(match){
            // var listItem  = document.createElement('li')
            // listItem.textContent = JSON.stringify(item)
            // resultContainer.appendChild(listItem)
            document.querySelector(".results").insertAdjacentHTML('beforeend',
                `<div class="product">
                <img src="${item.image}" alt="${item.image}">
                <p class="title">${item.title}</p>
                <p class="price">
                    <span>${item.price}</span>
                    <span>&#8377</span>
                </p>
                <p class="category">${item.category}</p>
                <p class="description">${item.description}</p>
                <p class="cart"><button onclick="addToCart(${item.id})">Add to Cart</button></p>
            </div>`)
        }
     })
}

document.getElementById('searchButton').addEventListener('click',performSearch)
    