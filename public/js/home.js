const deals = document.getElementById("DealItems");

// Get products
const getProducts1 = async () => {
  const res = await fetch("../data/products.json");
  products = await res.json();
  outputHtml1(products);
};

// Show results in HTML
const outputHtml1 = products => {
  if (products.length > 0) {
    const html = products
      .map(
        product =>
          `
        <a href="#"><img src="${product.img}" alt="${product.prodName}"/></a>
        `
      )
      .join("");
    deals.innerHTML += html;
  }
};

window.addEventListener("DOMContentLoaded", getProducts1);
