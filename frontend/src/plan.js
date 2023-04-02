var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
var isLoggedIn = token && username;
const head = document.querySelector('head');
const css = document.createElement('link');
if (isLoggedIn) {
    // User is logged in
    css.rel = 'stylesheet';
    css.href = '/frontend/style/home.css';
    head.appendChild(css);
    document.write(`<div id="navbar">
    <div class="navfirst">
        <div class="brand">
            <div class="logo">
                <img style="width: 45px; height: 45px;" src="/frontend//Image/logo1.png" alt="brand">
            </div>
        </div>
        <div class="midsection">
            <ul>
                <li id="home-link"><a href="home.html">Home</a></li>                    <li><a href="#" onclick="toggleDropdown2(document.getElementById('dropdown2'))">Explore &#9660;</a>
                    <div class="dropdown2" id="dropdown2">
                        <div class="left">
                            <h4 class="title">Audience</h4>
                            <div class="line"></div>
                            <div class="first">
                                <p>Survey people who live, work, and do what matters to you. Reach audiences in 130+ countries and get responses quickly.</p>
                            </div>
                            <div class="second">
                                <h3>Buy targeted</h3>
                            </div>
                            <div class="third">
                                <h3>responses</h3>
                            </div>
                        </div>
                        <div class="right">
                            <h4 class="title">Brand and market research</h4>
                            <div class="line"></div>
                            <div class="first">
                                <p>Discover expert-designed solutions to gather feedback on your ideas, products, and business. Get valuable insights delivered in days.</p>
                            </div>
                            <div class="second">
                                <h3>Brand tracking</h3>
                            </div>
                            <div class="third">
                                <h3>Ad tracking</h3>
                            </div>
                            <div class="third">
                                <h3>Idea screening</h3>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="plan-link"><a href="#">Plan&Pricing</a></li>
            </ul>
        </div>
    </div>
    <div class="navsecond">
        <div class="buttondiv">
            <button class="upgrade"><a href="#">Upgrade</a></button>
            <button class="survey white"><a href="#">Create Survey</a></button>
        </div>
        <div class="username" style="color: white;">
            <p id="login" onclick="toggleDropdown1(document.getElementById('dropdown1'))"></p>
            <div class="dropdown1" id="dropdown1">
                <div class="left1">
                    <div class="first1">
                        <h4>My Account</h4>
                    </div>
                    <div class="second1">
                        <h4>Library</h4>
                    </div>
                    <div class="third1">
                        <h4>Contact</h4>
                    </div>
                    <div class="four1">
                        <h4 id="logout">Sign out</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`);
} else {
    css.rel = 'stylesheet';
    css.href = '/frontend/style/index.css';
    head.appendChild(css);
    document.write(`<div id="navbar">
    <a href="index.html"><div class="brand">
            <div class="logo">
                <img style="width: 40px; height: 40px;" src="/frontend//Image/logo1.png" alt="brand">
            </div>
            <div class="brandname">
                <h2>Inquary Falcon</h2>
            </div>
        </div>
    </a>
    <div class="midsection">
        <ul>
            <li><a href="#" onclick="toggleDropdown(this)">Product &#9660;</a>
                <div class="dropdown">
                    <div class="left">
                        <h4 class="title">Survey</h4>
                        <div class="line"></div>
                        <div class="first">
                            <h3>SurveyMonkey</h3>
                            <p>Create &amp; send surveys with the world’s leading online survey software</p>
                        </div>
                        <div class="second">
                            <h3>Enterprise</h3>
                            <p>Empower your Organization with our secure survey platfrom</p>
                        </div>
                        <div class="third">
                            <h3>Integration & plug-ins</h3>
                            <p>Bring survey insights itno your Business apps</p>
                        </div>
                    </div>
                    <div class="right">
                        <h4 class="title">Specialized Products</h4>
                        <div class="line"></div>
                        <div class="first">
                            <h3>Audience</h3>
                            <p>Collect survey responses from out globel consumer panel</p>
                        </div>
                        <div class="second">
                            <h3>CX</h3>
                            <p>Understand & increase employee Engagement</p>
                        </div>
                        <div class="third">
                            <h3>Engage</h3>
                            <p>Understand & increase employee engagement</p>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="#" onclick="toggleDropdown(this)">Solution &#9660;</a>
                <div class="dropdown">
                    <div class="left">
                        <h4 class="title">Survey type</h4>
                        <div class="line"></div>
                        <div class="first">
                            <h3>Customer Satisfaction</h3>
                        </div>
                        <div class="second">
                            <h3>Customer Loyalty</h3>
                        </div>
                        <div class="third">
                            <h3>Event Survey</h3>
                        </div>
                        <div class="four">
                            <h3>Job Satisfaction</h3>
                        </div>
                    </div>
                    <div class="right">
                        <h4 class="title">People Power for Business</h4>
                        <div class="line"></div>
                        <div class="first">
                            <h3>Customer</h3>
                            <p>Win more business with Customer Powered Data</p>
                        </div>
                        <div class="second">
                            <h3>Employees</h3>
                            <p>Build a Stronger workforce with Employee Powered Data</p>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="#" onclick="toggleDropdown(this)">Resourse &#9660;</a>
                <div class="dropdown">
                    <div class="left">
                        <div class="first">
                            <h3>Resources</h3>
                            <p>Best Practise for using surveys & survey data</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="first">
                            <h3>Curiosity at work</h3>
                            <p>Our Blog about surveys,tips for Business, & more</p>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="/frontend/plan.html">Plan&Pricing</a></li>
        </ul>
    </div>
    <div class="lastsection">
        <a href="/frontend/login.html">Log in</a>
        <button class="signup"><a href="signup.html">Signup Free</a></button>
    </div>
</div>`)
}


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
    
  loginEL.innerText = username + " \u25BE";
  
//    active link

let url = window.location.href;

if (url.includes("home.html")) {
    document.getElementById("home-link").classList.add("active");
}
else if (url.includes("plan.html")) {
    document.getElementById("plan-link").classList.add("active");
}

function toggleDropdown(menuItem) {
    var dropdown = menuItem.nextElementSibling;
    dropdown.style.display = (dropdown.style.display === "none") ? "flex" : "none";
    
    // Loop through all dropdowns on the page
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      // If this is not the current dropdown being toggled, hide it
      if (dropdowns[i] !== dropdown) {
        dropdowns[i].style.display = "none";
      }
    }
  }
  