// Code from https://www.youtube.com/watch?v=1iysNUrI3lw
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let products;

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
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `<div class="">
    <h4>${match.prodName} ($${match.price})</h4>
   </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

window.addEventListener("DOMContentLoaded", getProducts);
search.addEventListener("input", () => searchProducts(search.value));
