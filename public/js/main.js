// Code from https://www.youtube.com/watch?v=1iysNUrI3lw
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const dealDiv = document.getElementById("Deals");
const catDiv = document.getElementById("Categories");
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
function increaseValue() {
  const num = document.getElementById("number").value;
  if (num >= 99){
    document.getElementById("number").value = 99;
  } else {
    document.getElementById("number").value += 1;
  }
}

// Decrease input value
function decreaseValue() {
  const num = document.getElementById("number").value;
  if (num <= 0){
    document.getElementById("number").value = 0;
  } else {
    document.getElementById("number").value -= 1;
  }
}

// Get products
const getProducts = async () => {
  const res = await fetch("../data/products.json");
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
    showDisplay(dealDiv);
    showDisplay(catDiv);
    matches = [];
    matchList.innerHTML = "";
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
        match => `<div class="">
    <h4>${match.prodName} ($${match.price})</h4>
        <div class="cart-item">
          <div class="column-left">
            <img src="${match.img}" alt="food-icon" />
          </div>
          <div class="column-middle">
            <p>${match.prodName}</p>
            <p>$${match.price} per KG</p>
            <form class="valu_button">
              <div
                class="value-button"
                id="decrease"
                onclick="decreaseValue()"
                value="Decrease Value"
              >
                -
              </div>
              <input type="number" id="number" value="0" />
              <div
                class="value-button"
                id="increase"
                onclick="increaseValue()"
                value="Increase Value"
              >
                +
              </div>
            </form>
          </div>
          <div class="column-right">
            <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"> Add</i>
          </div>
        </div>
   </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

window.addEventListener("DOMContentLoaded", getProducts);
search.addEventListener("input", () => searchProducts(search.value));
