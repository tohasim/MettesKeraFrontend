export async function initProductOverviewPage() {

    // Event listener for the button
    const seeProductsButton = document.getElementById("see-products");
  seeProductsButton.addEventListener("click", fetchAndDisplayProducts);
//til Simone
  
}


// Function to fetch and display products
async function fetchAndDisplayProducts() {
  console.log("Fetching products...");
  try {
    const response = await fetch("http://localhost:8080/api/products");
    const products = await response.json();

    const productList = document.getElementById("productList");
    if (!productList) {
      console.error("Error: ProductList element not found.");
      return;
    }

    productList.innerHTML = ""; // Clear previous content
    productList.classList.add("row"); // Add Bootstrap row class for grid layout

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-md-4", "mb-3"); // Bootstrap grid column and margin-bottom

      productDiv.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width:100%; height:auto;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Price: $${product.price.toFixed(2)}</p>
          </div>
        </div>
      `;

      productList.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
