import { API_URL, SAS_TOKEN } from "../../settings.js";

export async function initProductOverviewPage(searchTerm) {
	console.log("Search term on product overview:", searchTerm);

	if (searchTerm) {
		const searchResults = await getSearchItems(searchTerm);
		fetchAndDisplayProducts(searchResults);
	} else {
		fetchAndDisplayProducts();
	}

	addEventBubbling();
}

async function getSearchItems(searchTerm) {
	try {
		const res = await fetch(API_URL + "/products/detailed");
		const data = await res.json();

		return data.filter((product) => {
			const term = searchTerm.toLowerCase();
			return (
				product.category.toLowerCase().includes(term) ||
				product.name.toLowerCase().includes(term) ||
				product.description.toLowerCase().includes(term)
			);
		});
	} catch (error) {
		console.error("Error in getSearchItems:", error);
	}
}

async function fetchAndDisplayProducts(products) {
	//console.log("Fetching products...");

	if (!products) {
		try {
			const response = await fetch(API_URL + "/products/detailed");
			products = await response.json();
		} catch (error) {
			console.error("Error fetching products:", error);
			return;
		}
	}
	const productList = document.getElementById("productList");

	productList.innerHTML = ""; // Clear previous content
	productList.classList.add("row"); // Add Bootstrap row class for grid layout
	console.log(products);
	products.forEach((product) => {
		const productDiv = document.createElement("div");
		productDiv.classList.add("col-md-4", "mb-3"); // Bootstrap grid column and margin-bottom
		console.log(product.imageUrl);
		productDiv.innerHTML = `
        <div class="card" data-id="${product.id}">
          <img src="${
						product.imageUrls[0] + SAS_TOKEN
					}" class="card-img-top" alt="${
			product.name
		}" style="width:100%; height:auto;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Pris: ${product.price.toFixed(0)}.- kr</p>
          </div>
        </div>
      `;

		productList.appendChild(productDiv);
	});
}

function addEventBubbling() {
	document.getElementById("productList").addEventListener("click", (event) => {
		// Find the closest parent with a data-id attribute
		const productCard = event.target.closest("[data-id]");

		if (productCard) {
			const productId = productCard.dataset.id;
			// Now you can use productId to navigate or perform other actions
			window.router.navigate(`/product-page/${productId}`);
		}
	});
}
