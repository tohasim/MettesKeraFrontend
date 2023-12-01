import "./navigo_EditedByLars.js"; //Will create the global Navigo, with a few changes, object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";

import { API_URL } from "./settings.js";

import { initLogin, toggleLoginStatus, logout } from "./pages/login/login.js";
import { initSignup } from "./pages/signup/signup.js";
import { initProductPage } from "./pages/product-page/product-page.js";
import { initProductOverviewPage } from "./pages/product-overview/product-overview.js";
import { initCreationform } from "./pages/productCreation-Form/product-Creation-form.js"
//If token existed, for example after a refresh, set UI accordingly
const token = localStorage.getItem("token");
toggleLoginStatus(token);

window.addEventListener("load", async () => {
  const templateSignup = await loadTemplate("./pages/signup/signup.html");
  const templateLogin = await loadTemplate("./pages/login/login.html");
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html");
  const templateProductPage = await loadTemplate(
    "./pages/product-page/product-page.html"
  );
  const templateOverviewPage = await loadTemplate(
    "./pages/product-overview/product-overview.html"
  );
	const templateCreationForm = await loadTemplate("./pages/productCreation-Form/product-Creation-Form.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () =>
        (document.getElementById("content").innerHTML = `
        <h2>Home</h2>
        <h5 style="color:darkorange">Make sure to change, colors and layout if you use this for your own projects</h5>
     `),
			"/dropdown-0": () => {
				alert(0);
			},
			"/dropdown-1": () => {
				alert(1);
			},
			"/dropdown-2": () => {
				alert(2);
			},
			"/product-page/:id": (params) => {
				const id = params.data.id;
				renderTemplate(templateProductPage, "content");
				initProductPage(id);
			},
      "/product-overview/:searchTerm": (params) => {
      //search button eventListener
        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");
      // Get the search query from the input field
        const searchTerm = searchInput.value.toLowerCase();
        const searchTerm = params.data.searchTerm;
        renderTemplate(templateOverviewPage, "content");
        initProductOverviewPage(searchTerm);
      },
			"/create-product": () => {
				renderTemplate(templateCreationForm, "content")
				initCreationform()
			},
			"/signup": () => {
				renderTemplate(templateSignup, "content");
				initSignup();
			},
			"/login": (match) => {
				renderTemplate(templateLogin, "content");
				initLogin(match);
			},
			"/logout": () => {
				() => router.navigate("/");
				logout();
			},
		})
		.notFound(() => {
			renderTemplate(templateNotFound, "content");
		})
		.resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};



/*
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener('click', async function() {
    try {
        const res = await fetch(API_URL + "/products/detailed");
        const data = await res.json();

        // Get the search query from the input field
        const searchTerm = searchInput.value.toLowerCase();

        // Filter the data based on the search term
        const filteredData = data.filter(product => {
            // Customize this condition based on your data structure
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const categoryMatch = product.category.toLowerCase().includes(searchTerm);
            const descriptionMatch = product.description.toLowerCase().includes(searchTerm);

            // Return true if any of the conditions match
            return nameMatch || categoryMatch || descriptionMatch;
        });

        console.log("Filtered Data:", filteredData);
    } catch (error) {
        console.log("An error occurred:", error);
    }
});
*/
