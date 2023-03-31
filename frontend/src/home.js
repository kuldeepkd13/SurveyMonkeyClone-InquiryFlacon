function toggleDropdown2(dropdown2) {
    if (dropdown2.style.display === 'none') {
      dropdown2.style.display = 'flex';
    } else {
      dropdown2.style.display = 'none';
    }
  }

  function toggleDropdown1(dropdown1) {
    if (dropdown1.style.display === 'none') {
      dropdown1.style.display = 'block';
    } else {
      dropdown1.style.display = 'none';
    }
  
    let logoutEL = document.getElementById("logout");
  
    // clear localStorage when Sign Out is clicked
    logoutEL.addEventListener("click", () => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      window.location.href="/frontend/index.html"
      loginEL.innerText = "";

    });
  }
  
  let loginEL = document.getElementById("login");
  
  let username = localStorage.getItem("username") || "";
  
  loginEL.innerText = username + " \u25BE";
  
//    active link

let url = window.location.href;

if (url.includes("home.html")) {
    document.getElementById("home-link").classList.add("active");
}
else if (url.includes("plan.html")) {
    document.getElementById("plan-link").classList.add("active");
}
