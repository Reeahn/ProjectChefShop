const cartDiv = document.getElementById("shoppingCart");

// Get Products
const getProducts = async () => {
  const res = await fetch("./data/products.json");
  products = await res.json();
  outputHtml(products);
};

// Show results in HTML
const outputHtml = products => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  var newCart = [],
    newItem = {};
  if (cart === []) {
    localStorage.clear()
  }
  if (cart != null) {
    cart.forEach(function (item) {
      products.forEach(function (product) {
        if (item.id === parseInt(product.id)) {
          newItem.id = item.id;
          newItem.quantity = item.quantity;
          newItem.prodName = product.prodName;
          newItem.price = product.price;
          newItem.img = product.img;
          newCart.push(newItem);
          newItem = {};
        }
      });
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    const html = newCart
      .map(
        cartItem =>
        `
          <div class="cart-item" id="item${cartItem.id}">
          <div class="column-left">
            <img src="${cartItem.img}" alt="${cartItem.prodName}-icon" />
          </div>
          <div class="column-middle">
            <p>${cartItem.prodName} $${cartItem.price} per KG</p>
            <p>Ordered: ${cartItem.quantity}Kg</p>
            <p>Price: $${cartItem.price * cartItem.quantity}</p>
          </div>
          <div class="column-right">
            <i class="fa fa-trash fa-3x" aria-hidden="true" onclick="deleteItem('${cartItem.id}')"></i>
          </div>
        </div>
        `
      )
      .join("");
    cartDiv.innerHTML += html;
  } else {
    cartDiv.innerHTML = `<h2>Your Cart is Empty</h2>`;
  }
};

// Clear the cart
const clearCart = () => {
  swal({
    title: "Are you sure?",
    text: "You are about to clear your cart!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      localStorage.clear();
      document.location.reload(true);
    }
  });
};

// Clear individual items in the cart
const deleteItem = itemId => {
  itemId = parseInt(itemId)
  list = JSON.parse(localStorage.getItem("cart"))
  swal({
    title: "Are you sure?",
    text: "You are about to clear this item!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      list.splice(list.indexOf(itemId), 1);
      localStorage.setItem("cart", JSON.stringify(list))
      document.location.reload(true);
    }
  });
}

window.addEventListener("DOMContentLoaded", getProducts);