import { API_URL, SAS_TOKEN } from "../../settings.js";

export async function initProductPage(id) {
	const info = await fetch(API_URL + "/products/" + id).then((res) =>
		res.json()
	);
	const images = info.imageUrls;
	setupProductInfo(info);
	setupProductCarousel(images);
}

async function setupProductInfo(info) {
	document.getElementById("product-info").innerHTML = `
    <div class="col-md-9">
    <b>${info.name}</b>
    <div style="color: rgb(131, 131, 131)">${info.category}</div>
    ${info.description}
</div>
<div class="col"><b>${info.price.toFixed(0)},- kr</b></div>
    `;
}

function setupProductCarousel(imageUrls) {
	// Get the carousel inner container
	const carouselInner = document.querySelector(".carousel-inner");
	const indicatorsInner = document.querySelector(".carousel-indicators");

	// Loop through the image URLs and create carousel items
	imageUrls.forEach((imageUrl, index) => {
		const carouselIndicatorItem = `
			<button
				type="button"
				data-bs-target="#imageCarousel"
				data-bs-slide-to="${index}"
				class="active"
			></button>`;
		const isActive = index === 0 ? "active" : ""; // Set the first image as active
		const carouselItem = `<div class="carousel-item ${isActive}">
                          <img src="${imageUrl + SAS_TOKEN}" class="d-block w-100 carousel-image" alt="Product Image ${index + 1}">
                      </div>`;

		carouselInner.innerHTML += carouselItem;
		indicatorsInner.innerHTML += carouselIndicatorItem;
	});
}
