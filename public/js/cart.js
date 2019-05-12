const cartDiv = document.getElementById("shoppingCart");

// Get Products
const getProducts = async () => {
  const res = await fetch("./data/products.json");
  products = await res.json();
  outputHtml(products);
};

// Show results in HTML
const outputHtml = products => {
  const cart = localStorage.getItem("cart");
  products = JSON.stringify(products);
  console.log(cart);
  console.log(products);
  console.log(typeof cart);
  console.log(typeof products);
  cart.push(products);

  // products.forEach(product => {
  //   cart.push(products);
  // });
  console.log(cart);
  console.log(typeof cart);
  console.log(typeof products);
  if (cart.length > 0) {
    const html = cart
      .map(
        cartItem =>
          `
          <div class="cart-item">
          <div class="column-left">
            <img src="../imgs/test.png" alt="food-icon" />
          </div>
          <div class="column-middle">
            <p>Capsicum Red $0000 per KG</p>
            <p>Ordered: ${cartItem.quantity}Kg</p>
            <p>Price: $000</p>
          </div>
          <div class="column-right">
            <i class="fa fa-trash fa-3x" aria-hidden="true"></i>
          </div>
        </div>
        `
      )
      .join("");
    cartDiv.innerHTML += html;
  }
};

window.addEventListener("DOMContentLoaded", getProducts);
