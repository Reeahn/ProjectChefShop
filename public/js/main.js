// Code from https://www.youtube.com/watch?v=1iysNUrI3lw
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search Products.json and filter it
const searchProducts = async searchText => {
  const res = await fetch("../data/products.json");
  const products = await res.json();

  // Get matches to current text input
  let matches = products.filter(product => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return product.prodName.match(regex) || product.type.match(regex);
  });

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
        match => `
        <div class="">
            <h4>${match.prodName} <span class="">$${match.price}
            </span></h4>
        </div>`
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchProducts(search.value));
