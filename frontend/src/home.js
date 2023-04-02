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

let contanierEl = document.getElementById("contanier")
let apiUrl = `http://localhost:4500`

let token = localStorage.getItem("token") || ""
async function fetchdata(){
  try {
    let res = await fetch(`${apiUrl}/survey/allsurvey`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`${token}`
      }
    })
    let data = await res.json()
    displayData(data.data)
  } catch (error) {
    console.log(error)
  }
}

fetchdata()


function displayData(data){
  let x= ``
  data.forEach((el)=>{
    x+=`
      <div class="card">
        <h2 class="cardtitle">Title:${el.title}</h2>
        <p class="carddate">Created:${new Date(el.created_date).toLocaleDateString('en-GB')}</p>
        <p class="status">Status:${el.status}</p>
        <div class="card-btn">
          <button class="update-btn" data-id="${el.id}">Update</button>
          <button class="delete-btn" data-id="${el.id}">Delete</button>
          <button class="send-survey-btn" data-id="${el.id}">Send Survey</button>
        </div>
      </div>
    ` 
  });
  contanierEl.innerHTML = x
}
