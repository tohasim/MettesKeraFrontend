export async function initProductPage() {
	setupProductPage();
	const imageUrls = getImageURLS();
	setupProductCarousel(imageUrls);
}

function setupProductPage() {
	const productContainer = document.getElementById("product-container");
	productContainer.innerHTML = `
    <div class="col">
        <div
            id="imageCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="10000"
        >
            <!-- Indicators/dots -->
            <div class="carousel-indicators"></div>
            <!-- Images should be injected here -->
            <div class="carousel-inner"></div>

            <!-- Navigation buttons -->
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-10">
                <b>Blå Serveringsskål</b>
                <div style="color: rgb(131, 131, 131)">Skål</div>
                En flot serveringsskål med kobalt blå glasur. <br />
                Ideél til middagsbordet, både til hverdag og når det skal være fint.
            </div>
            <div class="col"><b>250,- kr</b></div>
        </div>
    </div>`;
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
                                    <img src="${imageUrl}" class="d-block w-100" alt="Product Image ${
			index + 1
		}">
                                  </div>`;
		carouselInner.innerHTML += carouselItem;
		indicatorsInner.innerHTML += carouselIndicatorItem;
	});
}
