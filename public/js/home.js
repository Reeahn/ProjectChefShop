const deals = document.getElementById("DealItems");
const categoriesDiv = document.getElementById("CategoryItems");

// Get products
const getProducts1 = async () => {
  const res = await fetch("./data/products.json");
  products = await res.json();
  outputHtml1(products);
};

// Get categories
const getCategories = async () => {
  const res = await fetch("./data/categories.json");
  categories = await res.json();
  outputHtml2(categories);
};

// Show results in HTML
const outputHtml1 = products => {
  if (products.length > 0) {
    const html = products
      .map(
        product =>
        `
        <a onclick="searchProducts('${product.prodName}')"><img src="${product.img}" alt="${product.prodName}"/></a>
        `
      )
      .join("");
    deals.innerHTML += html;
  }
};

// Show results in HTML
const outputHtml2 = categories => {
  if (categories.length > 0) {
    const html = categories
      .map(
        category =>
        `
        <a href="#"><img src="${category.img}" alt="${category.type}"/></a>
        `
      )
      .join("");
    categoriesDiv.innerHTML += html;
  }
};

window.addEventListener("DOMContentLoaded", getProducts1);
window.addEventListener("DOMContentLoaded", getCategories);