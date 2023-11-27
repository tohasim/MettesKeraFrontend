// Function to fetch and display products
function fetchAndDisplayProducts() {
  fetch("http://localhost:8080/api/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("productList");
      productList.innerHTML = ""; // Clear previous content

      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
                            <h2>${product.name}</h2>
                            <p>Price: $${product.price.toFixed(2)}</p>
                            <img src="${product.imageUrl}" alt="${
          product.name
        }" style="width:100px; height:auto;">
                        `;

        productList.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Event listener for the button
document.addEventListener("DOMContentLoaded", () => {
  const seeProductsButton = document.getElementById("see-products");
  seeProductsButton.addEventListener("click", fetchAndDisplayProducts);
});
