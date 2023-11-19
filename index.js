import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below

import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import { initLogin,toggleLoginStatus,logout } from "./pages/login/login.js"
import { initSignup } from "./pages/signup/signup.js"

//If token existed, for example after a refresh, set UI accordingly
const token = localStorage.getItem("token")
toggleLoginStatus(token)


window.addEventListener("load", async () => {

  const templateSignup = await loadTemplate("./pages/signup/signup.html")
  const templateLogin = await loadTemplate("./pages/login/login.html")
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML = `
        <h2>Home</h2>
        <h5 style="color:darkorange">Make sure to change, colors and layout if you use this for your own projects</h5>
     `,
      "/dropdown-0": () => {
        alert(0)  
      },
      "/dropdown-1": () => {
        alert(1)
      },
      "/dropdown-2": () => {
        alert(2)
      },
      
      "/signup": () => {
        renderTemplate(templateSignup, "content")
        initSignup()
      },
      "/login": (match) => {
        renderTemplate(templateLogin, "content")
        initLogin(match)
      },
      "/logout": () => {
        ()=> router.navigate("/")
        logout()
      }
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}