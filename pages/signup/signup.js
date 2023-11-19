import { API_URL} from "../../settings.js"
import { handleHttpErrors } from "../../utils.js"


const URL = API_URL + "/user-with-role"



export function initSignup() {
  document.getElementById("btn-signup").onclick = signup
}

async function signup(evt) {
  evt.preventDefault()
  const username = document.getElementById("input-username").value
  const email = document.getElementById("input-email").value
  const password = document.getElementById("input-password").value
  
  const user = { username, email, password }
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user)
  }
  try {
  await fetch(URL, options).then(handleHttpErrors)
  window.router.navigate("/login?msg=" + "You have successfully signed up. Please login")
  } catch (err) {
    //You should present user with error message
    console.error(err.message);
  }
 
  
}
