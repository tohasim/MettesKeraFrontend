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
  const templateCreationForm = await loadTemplate(
    "./pages/productCreation-Form/product-Creation-Form.html"
  );

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
        <h2>Mettes keramik shop</h2>
        <h5 style="color:red">Husk at sætte informationer om Mette ind her</h5>
     `),
      "/product-page/:id": (params) => {
        const id = params.data.id;
        renderTemplate(templateProductPage, "content");
        initProductPage(id);
      },
      "/product-overview/:searchTerm": (params) => { //here the searchterm is required
        const searchTerm = params.data.searchTerm;
        renderTemplate(templateOverviewPage, "content");
        initProductOverviewPage(searchTerm);
      },
      "/product-overview/": () => { //The reason for having two product-overview is to avoid the "required" of the params on top
        renderTemplate(templateOverviewPage, "content");
        initProductOverviewPage();
      },
      "/create-product": () => {
        renderTemplate(templateCreationForm, "content");
        initCreationform();
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
    window.addEventListener('scroll', adjustNavbarOnScroll);
 
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

 const searchBtn = document.getElementById("searchBtn");
 
 searchBtn.addEventListener("click", function () {
   const searchInput = document.getElementById("searchInput");
   // Get the search term from the input field
   const searchTerm = searchInput.value;
   console.log("Search term:", searchTerm);
   // Navigate to the product overview with the search term as a parameter
   router.navigate(`/product-overview/${encodeURIComponent(searchTerm)}`);
 });

 function adjustNavbarOnScroll() {
  if (window.scrollY > 80) {
      document.querySelector('.navbar').classList.add('navbar-shrink');
      console.log("Scroll worked")
  } else {
      document.querySelector('.navbar').classList.remove('navbar-shrink');
  }
}
