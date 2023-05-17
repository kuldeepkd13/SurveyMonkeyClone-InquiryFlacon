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
    localStorage.removeItem('surveyId');
    window.location.href = "/frontend/index.html"
    loginEL.innerText = "";

  });
}

function toggleDropdown3(createSurvey) {
  if (createSurvey.style.display === 'none') {
    createSurvey.style.display = 'block';
  } else {
    createSurvey.style.display = 'none';
  }
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
let apiUrl = `https://long-tan-crab-vest.cyclic.app/`

let token = localStorage.getItem("token") || ""
async function fetchdata() {
  try {
    let res = await fetch(`${apiUrl}/survey/allsurvey`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    })
    let data = await res.json()
    displayData(data.data)
    deletesurvey()
  } catch (error) {
    console.log(error)
  }
}

fetchdata()

const updatedTitleInput = document.getElementById('updatedTitle');
const typeSelect = document.getElementById('updatedType');
const surveyIdInput = document.getElementById('surveyId');
const updatedStatus = document.getElementById("status")

function displayData(data) {
  let x = ``;
  if (Array.isArray(data)) {
    data.forEach((el) => {
      x += `
        <div class="card">
          <h2 class="cardtitle">Title:${el.title}</h2>
          <p class="carddate">Created:${new Date(el.created_date).toLocaleDateString('en-GB')}</p>
          <p class="status">Status:${el.status}</p>
          <div class="cardBtn">
            <button class="updateBtn" data-id="${el._id}">Update</button>
            <button class="deleteBtn" data-id="${el._id}">Delete</button>
            <button class="send-surveyBtn" data-id="${el._id}">Send Survey</button>
            <button class = "questionBtn" data-id="${el._id}">Add Question</button>
          </div>
        </div>
      `
    });
  } else {
    x += `
      <div class="card">
        <h2 class="cardtitle">Title:${data.title}</h2>
        <p class="carddate">Created:${new Date(data.created_date).toLocaleDateString('en-GB')}</p>
        <p class="status">Status:${data.status}</p>
        <div class="cardBtn">
          <button class="updateBtn" data-id="${data._id}">Update</button>
          <button class="deleteBtn" data-id="${data._id}">Delete</button>
          <button class="send-surveyBtn" data-id="${data._id}">Send Survey</button>
          <button class = "questionBtn" data-id="${data._id}">Add Question</button>
        </div>
      </div>
    `;
    contanierEl.insertAdjacentHTML('beforeend', x);
    return;
  }
  contanierEl.innerHTML = x;

  // add event listener to container element
  contanierEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('updateBtn')) {
      // get the survey ID from the data-id attribute of the update button
      const id = event.target.getAttribute('data-id');
      fetch(`${apiUrl}/survey/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      }).then((res) => res.json())
        .then((data) => {
          surveyIdInput.value = data.survey._id
          updatedTitleInput.value = data.survey.title;
          updatedStatus.value = data.survey.status;
          typeSelect.value = data.survey.type
        }).catch((error) => {
          console.log(error)
        })
      // display the update form

      updateForm.style.display = 'block';
    }else if (event.target.classList.contains('questionBtn')) {
      // get the survey ID from the data-id attribute of the question button
      const surveyId = event.target.getAttribute('data-id');
      // redirect to the question page.
      localStorage.setItem('surveyId', surveyId);
      window.location.href = `question.html`;
    }
  });
}


let updateForm = document.getElementById("updateForm");
let createSurvey = document.querySelector(".createSurvey")
let closeUpdateForm = document.getElementById("closeUpdateForm");
let closeUpdateForm1 = document.getElementById("closeUpdateForm1");

// Add a click event listener to the "X" sign element
closeUpdateForm.addEventListener("click", function () {
  updateForm.style.display = "none";
});
closeUpdateForm1.addEventListener("click", function () {
  createSurvey.style.display = "none"
});

let formel = document.getElementById("addsurvey")


let titleEL = document.getElementById("title")
let tpyeEL = document.getElementById("type")


formel.addEventListener("submit", (e) => {
  e.preventDefault()

  let title = titleEL.value
  let type = tpyeEL.value

  fetch(`${apiUrl}/survey/addsurvey`, {
    method: "POST",
    body: JSON.stringify({ title, type }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.survey)
      displayData(data.survey)
      alert(data.message)
      titleEL.value=""
      tpyeEL.value=""
    }).catch((error) => {
      console.log(error)
    })
})


function deletesurvey() {
  let cardBtn = document.querySelectorAll(".deleteBtn")
  for (let deleteBtn of cardBtn) {
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let id = e.target.dataset.id


      fetch(`${apiUrl}/survey/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          fetchdata()
        }).catch((error) => {
          console.log(error)
        })
    })
  }
}

let updateSurvey = document.getElementById("updateSurveyForm")

updateSurvey.addEventListener("submit",(e)=>{
 e.preventDefault()
 let id = surveyIdInput.value
 let title = updatedTitleInput.value
 let type = typeSelect.value
 let status = updatedStatus.value


 fetch(`${apiUrl}/survey/update/${id}`,{
   method:"PATCH",
   body:JSON.stringify({title,type,status}),
   headers: {
    "Content-Type": "application/json",
    "Authorization": `${token}`
  }
 })
 .then((res)=>res.json())
 .then((data)=>{
  console.log(data)
  alert(data.message)
  window.location.href="home.html"
 }).catch((error)=>{
  console.log(error)
 })
})
