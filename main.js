var swiper = new Swiper(".mySwiper", {
    loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });

// PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide");

    setTimeout(() => {
        preloader.style.display = "none";
    }, 5000);
});

const cartIcon=document.querySelector('.cart-icon');
const cartTab=document.querySelector('.card-tab');
const closeButton=document.querySelector('.close-btn');
const cardList=document.querySelector('.card-list');
const cartList=document.querySelector('.cart-list');
const cartTotal=document.querySelector('.cart-total');
const cartValue=document.querySelector('.cart-value');


cartIcon.addEventListener('click',()=> cartTab.classList.add('card-tab-active'));
closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.remove('card-tab-active');
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = hamburger.querySelector('i');

hamburger.addEventListener('click', (e) => {
    e.preventDefault(); 

    mobileMenu.classList.toggle('mobile-menu-active');
    bars.classList.toggle('fa-bars');
    bars.classList.toggle('fa-xmark');
});

let productList= [];
let cartPoduct =[];

const updateTotal = () => {
    let totalPrice = 0;
    let totalquantity = 0;

    document.querySelectorAll('.item').forEach(item => {
        const price = parseFloat(
            item.querySelector('.item-total').textContent.replace('$','')
        );
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
        totalPrice += price;
        totalquantity += quantity;
    });

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartValue.textContent = totalquantity;
};


const showcards= () => {

   productList.forEach(product => {

      const ordercard=document.createElement('div');
      ordercard.classList.add('order-card');

     ordercard.innerHTML = `
        <div class="card-img">
            <img src="https://mahadev-diwakar-knr.github.io/foodieDelivery/${product.image}" alt="${product.name}">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn cart-btn">Add To Cart</a>
    `;

    cardList.appendChild(ordercard);

    const cartBtn= ordercard.querySelector('.cart-btn');

    cartBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      addToCart(product);
    })

   })
};

const addToCart=(product) =>{

  const existingProduct= cartPoduct.find(item => item.id===product.id);
  if (existingProduct) {
      showCartToast('Item already in your cart');
      return;
  }

  cartPoduct.push(product);
  let quantity=1;
  let price = parseFloat(product.price.replace('$',''));

  const cartItem=document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML = `
    <div class="item-image">
        <img src="https://mahadev-diwakar-knr.github.io/foodieDelivery/${product.image}" alt="${product.name}">
    </div>

    <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="item-total">${product.price}</h4>
    </div>

    <div class="flex quantity-control">
        <button type="button" class="quantity-btn minus">
            <i class="fa-solid fa-minus"></i>
        </button>

        <h4 class="quantity-value">${quantity}</h4>

        <button type="button" class="quantity-btn plus">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
`;

  cartList.appendChild(cartItem);
  updateTotal();

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');

  plusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      quantity++;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotal(); 
  });


  const minusBtn = cartItem.querySelector('.minus');

  minusBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
          itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
          updateTotal(); 
      } else {
          cartItem.classList.add('slide-out');

          setTimeout(() => {
              cartItem.remove();
              cartPoduct = cartPoduct.filter(item => item.id !== product.id);
              updateTotal(); 
          }, 300);
      }
  });

}


const initapp =( ) =>{
  fetch('products.json').then
  (response => response.json()).then
  (data => {
    productList = data;
    showcards()
  })
}

function showCartToast(message){
    const toast = document.getElementById('cart-toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

initapp();