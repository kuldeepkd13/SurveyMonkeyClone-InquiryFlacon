const url = "https://magnificent-crow-skirt.cyclic.app";
const form = document.querySelector("form");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  fetch(`${url}/users/login`, {
    method: "POST",
    body: JSON.stringify({email,password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.message === "Login Successfull"){
         alert(data.message)
        emailInput.value = "";
        passwordInput.value = "";
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        window.location.href="/frontend/home.html"
      }else{
        const responseEl = document.querySelector(".response");
        responseEl.textContent = data.message;
        emailInput.value = "";
        passwordInput.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});