/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navMenu = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function activeBox(section) {
    const rect = section.getBoundingClientRect();
    return (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
(function () {
    function buildNav() {
        const navFragment = document.createDocumentFragment();
        sections.forEach((section) => {
            const navItem = document.createElement('li');
            navItem.innerHTML = `<a href="#${section.id}">${section.dataset.nav}</a>`;
            navFragment.appendChild(navItem);
        });
        document.getElementById('navbar__list').appendChild(navFragment);
    }
    buildNav();
})();

// Add class 'active' to section when near top of viewport
function activeClass() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ? section.classList.add('active')
            : section.classList.remove('active');
    });

    highlightSelectedSection();
}

// Scroll to anchor ID using scrollTO event
function scrollTo(event) {
    event.preventDefault();
    const navId = this.getAttribute('href');
    const sectionId = navId.slice(1);
    const navSection = document.getElementById(sectionId);
    navSection.scrollIntoView({ behavior: 'smooth' });
}


// Create a button element and it to the page
const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "Scroll to Top";
scrollToTopButton.className = "scroll-to-top";
document.body.appendChild(scrollToTopButton);

// Function to get the ID of the active section
function getActiveSectionId() {
    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            return section.id;
        }
    }
    return null; // Return null if no section is active
}

// Function to highlight the selected section in the navbar
function highlightSelectedSection() {
    const activeSectionId = getActiveSectionId();
    if (activeSectionId) {
        const navItem = document.querySelector(`a[href="#${activeSectionId}"]`);
        if (navItem) {
            // Remove any existing 'active' class from all navigation items
            document.querySelectorAll('#navbar__list a').forEach(item => item.classList.remove('active'));

            // Add the 'active' class to the selected navigation item
            navItem.classList.add('active');
        }
    }
}

highlightSelectedSection();
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
const naviLinks = document.querySelectorAll('#navbar__list a[href^="#"]');
naviLinks.forEach(link => {
    link.addEventListener('click', scrollTo);
});

// Set sections as active
window.addEventListener('scroll', activeClass);


// Hide fixed navigation bar while not scrolling
let scrollingTimeout;

document.addEventListener("scroll", function () {
    // Clears timeout
    clearTimeout(scrollingTimeout);

    // Sets a 'new' timeout to hide the navigation bar after set amount of time of inactivity
    scrollingTimeout = setTimeout(() => {
        navMenu.classList.add("hidden");
    }, 2000);
});

// An event listener for when the 'scroll to top' button is clicked
scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/**
 * End Events
 */

/**
 * End Events
 */

