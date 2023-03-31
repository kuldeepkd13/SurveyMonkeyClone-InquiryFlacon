const url = "http://localhost:4500";
const form = document.querySelector("form");

const usernameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  fetch(`${url}/users/register`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Registration successful") {
        alert(data.message);
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        window.location.href = "/frontend/login.html";
      } else {
        const responseEl = document.querySelector(".response");
        responseEl.textContent = data.message;
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});