import { API_URL } from "../../settings.js";

export async function initProductPage(id) {
    setupProductInfo(id);
    const imageUrls = getImageURLS();
    setupProductCarousel(imageUrls);
}

function setupProductInfo(id) {
    fetch
    document.getElementById("product-info").innerHTML = `
    <div class="col-md-10">
    <b>Blå Serveringsskål</b>
    <div style="color: rgb(131, 131, 131)">Skål</div>
    En flot serveringsskål med kobalt blå glasur. <br />
    Ideél til middagsbordet, både til hverdag og når det skal være fint.
</div>
<div class="col"><b>250,- kr</b></div>
    `
}

function getImageURLS() {
    // Sample image URLs
    const imageUrls = [
        "images/product1/Blå Serveringsskål (1).jpg",
        "images/product1/Blå Serveringsskål (2).jpg",
        "images/product1/Blå Serveringsskål (3).jpg",
        "images/product1/Blå Serveringsskål (4).jpg",
        "images/product1/Blå Serveringsskål (5).jpg",
        "images/product1/Blå Serveringsskål (6).jpg",
    ];
    return imageUrls;
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
                                    <img src="${imageUrl}" class="d-block w-100" alt="Product Image ${index + 1
            }">
                                  </div>`;
        carouselInner.innerHTML += carouselItem;
        indicatorsInner.innerHTML += carouselIndicatorItem;
    });
}
