function search() {
  const searchItem = document.getElementById("search").value.toUpperCase();
  const catalogue = document.getElementById("catalogue");
  const product = document.querySelectorAll(".griditems");
  const bookTitle = catalogue.getElementsByTagName("p");

  console.log(searchItem);
  console.log(catalogue);
  console.log(product);
  console.log(bookTitle);

  for (let i = 0; i < bookTitle.length; i++) {
    let match = product[i].getElementsByTagName('p')[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchItem) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
}

$(document).ready(() => {


  let removeItem = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeItem.length; i++) {
    let btn = removeItem[i];
    btn.addEventListener('click', removeCartItem);
  }

  function removeCartItem(e) {
    let btnClicked = e.target;
      btnClicked.parentElement.parentElement.remove();
      updateCartTotal();
}

  function updateCartTotal() {l
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let rows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let priceElement = row.getElementsByClassName('cart-price')[0];
      let quantityElement = row.getElementsByClassName('cart-quantity-input')[0];
      let price = parseFloat(priceElement.innerText.replace('$', ''));
      let quantity = quantityElement.value;
      total = total + (price * quantity);
    }

    document.getElementsByClassName('cart-total-price')[0].innerText = "$" + total;
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
  }
  function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  let addToCartBtns = document.getElementsByClassName("btn-cart")
  for (let i = 0; i < addToCartBtns.length; i++) {
    let btn = addToCartBtns[i];
    btn.addEventListener('click', addToCart);
  }

  function addToCart(e) {
    let btn = e.target;
    let item = btn.parentElement;
    let title = item.querySelector(".bookTitle p").textContent;
    let price = item.querySelector(".price p").textContent;
    let image = item.querySelector(".griditems img").src;
    console.log(title);
    console.log(price);
    console.log(image);
    addItemToCart(title, price, image);
    updateCartTotal();
  }

  function addItemToCart(title, price, image) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0].append(cartRow);
    let itemNames = document.getElementsByClassName('cart-item-title');
    for(let i = 0; i<itemNames.length; i++) {
      if(itemNames[i].innerText == title){
        alert("Item already in the cart!");
        return;
      }
    }
    let cartRowContent = ` 
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${image}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContent;
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
  }


  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', ()=>{
    // alert('Thank you for your purchase');
    location.href = "./checkout.html"
    // let cart = document.getElementsByClassName('cart-items')[0]
    // while(cart.hasChildNodes()){
    //   cart.removeChild(cart.firstChild);
    // }
    // updateCartTotal();
  })
})
