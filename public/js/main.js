// Code from https://www.youtube.com/watch?v=1iysNUrI3lw
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const dealDiv = document.getElementById("Deals");
const catDiv = document.getElementById("Categories");
const header = document.getElementById("searchDiv");
const backButton = document.getElementById("back");
// const fs = require("fs");
var cart = [];
let products;

// Hide div add hidden class
function hideDisplay(element) {
  element.classList.add("hidden");
}

// Show div remove hidden class
function showDisplay(element) {
  element.classList.remove("hidden");
}

// Increase input value
const increaseValue = element => {
  const num = inputSanitise(element);
  if (num >= 99) {
    document.getElementById(element).value = 99;
  } else {
    document.getElementById(element).value = num + 1;
  }
};

// ToDo Sanitise Input checking if invalid and setting to 0
const inputSanitise = element => {
  try {
    const input = parseFloat(document.getElementById(element).value, 10);
    return input;
  } catch (err) {
    document.getElementById(element).value = 0;
    input = parseInt(document.getElementById(element).value, 10);
    return input;
  }
};

// Decrease input value
const decreaseValue = element => {
  const num = inputSanitise(element);
  if (num <= 0) {
    document.getElementById(element).value = 0;
  } else {
    document.getElementById(element).value -= 1;
    console.log(products);
  }
};

// Add product to the cart
const addToCart = id => {
  const num = inputSanitise(id + "quantity");
  var exists = false;
  if (num > 0 && num <= 99) {
    cart.forEach(function (item) {
      if (id === item.id) {
        item.quantity += num;
        localStorage.setItem("cart", JSON.stringify(cart));
        exists = true;
      }
    });
    if (exists === false) {
      cart.push({
        id: id,
        quantity: num
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    swal({
      title: "Item added",
      icon: "success"
    });
    search.value = "";
    showDisplay(dealDiv);
    showDisplay(catDiv);
    matches = [];
    matchList.innerHTML = "";
  } else {
    swal({
      title: "Quantity can't be 0!",
      icon: "warning"
    });
  }
};

// Get products
const getProducts = async () => {
  const res = await fetch("./data/products.json");
  products = await res.json();
};

// Filter products
const searchProducts = searchText => {
  // Get matches to current text input
  let matches = products.filter(product => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return product.prodName.match(regex) || product.type.match(regex);
  });

  // Clear when input or matches are empty
  if (searchText.length === 0) {
    clearMatchListDiv();
    matches = [];
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    hideDisplay(dealDiv);
    hideDisplay(catDiv);
    const html = matches
      .map(
        match => ` 
    <div class="DealItems">
        <div class="cart-itemD">
          <div class="column-left">
            <img src="${match.img}" alt="${match.prodName}-icon" />
          </div>
          <div class="column-middle">
            <p>${match.prodName}</p>
            <p>$${match.price} per KG</p>
            <form class="valu_button">
              <div
                class="value-button"
                id="decrease"
                onclick="decreaseValue('${match.id}quantity')"
                value="Decrease Value"
              >
                -
              </div>
              <input type="number" class="number" id="${
                match.id
              }quantity" value=0 />
              <div
                class="value-button"
                id="increase"
                onclick="increaseValue('${match.id}quantity')"
                value="Increase Value"
              >
                +
              </div>
            </form>
          </div>
          <div class="column-right">
            <a onclick="addToCart(${match.id})">
            <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"> Add</i>
            </a>
          </div>
        </div>
   </div>`
      )
      .join("");
    matchList.innerHTML = html;
    // addBackButton();
  }
};

const clearMatchListDiv = () => {
  showDisplay(dealDiv);
  showDisplay(catDiv);
  hideDisplay(backButton);
  matchList.innerHTML = "";
}

const addBackButton = () => {
  showDisplay(backButton)
};

window.addEventListener("DOMContentLoaded", getProducts);
search.addEventListener("input", () => searchProducts(search.value));