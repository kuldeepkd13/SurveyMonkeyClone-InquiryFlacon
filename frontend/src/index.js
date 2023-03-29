//  Nav bar code Started  ///

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
  

  //   Nav bar code Ended    //



  //===============================================================================================

// type-writting js in landing page

const typeElements = document.getElementsByClassName('typewrite');

// Inject CSS
const css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff; }';
document.body.appendChild(css);

// Iterate over each typewriter element
for (let i = 0; i < typeElements.length; i++) {
  const element = typeElements[i];
  const typeWords = JSON.parse(element.getAttribute('data-type'));
  let currentWordIndex = 0;
  let currentWord = typeWords[currentWordIndex];
  let letterIndex = 0;
  let timeoutId;

  // Function to start the typing animation
  function startTyping() {
    const wrapSpan = element.querySelector('.wrap');
    wrapSpan.textContent = currentWord.substring(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex < currentWord.length) {
      // Schedule the next letter to be typed after a certain delay
      timeoutId = setTimeout(startTyping, 100);
    } else {
      // Start deleting the word after a certain delay
      setTimeout(deleteTyping, 2000);
    }
  }

  // Function to start the deleting animation
  function deleteTyping() {
    const wrapSpan = element.querySelector('.wrap');
    wrapSpan.textContent = currentWord.substring(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex >= 0) {
      // Schedule the next letter to be deleted after a certain delay
      timeoutId = setTimeout(deleteTyping, 50);
    } else {
      // Move on to the next word after a certain delay
      currentWordIndex = (currentWordIndex + 1) % typeWords.length;
      currentWord = typeWords[currentWordIndex];
      letterIndex = 0;
      setTimeout(startTyping, 500);
    }
  }

  // Start the animation immediately
  startTyping();
}

// typewrite end///////////////////////////////////