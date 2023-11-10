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
            const navAnchor = document.createElement('a');
            navAnchor.textContent = section.dataset.nav;
            navAnchor.href = `#${section.id}`;
            navAnchor.classList.add('menu__link');
            navItem.appendChild(navAnchor);
            navFragment.appendChild(navItem);
        });
        document.getElementById('navbar__list').appendChild(navFragment);
    }
    buildNav();
})();

// Add class 'active' to section when near top of viewport
function handleScroll() {
    let activeSectionId;
    let scrollingTimeout;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            section.classList.add('active');
            activeSectionId = section.id;
        } else {
            section.classList.remove('active');
        }
    });

    // Highlight the selected section in the navbar
    document.querySelectorAll('#navbar__list li a').forEach(link => {
        const sectionId = link.getAttribute('href').slice(1);
        link.classList.toggle('nav-active', sectionId === activeSectionId);
    });

    // Hide fixed navigation bar while not scrolling
    clearTimeout(scrollingTimeout);
    scrollingTimeout = setTimeout(() => {
        navMenu.classList.add("hidden");
    }, 1000);
}

// Create a button element and it to the page
const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "Scroll to Top";
scrollToTopButton.className = "scroll-to-top";
document.body.appendChild(scrollToTopButton);

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
document.querySelectorAll('#navbar__list li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const navId = event.currentTarget.getAttribute('href');
        const sectionId = navId.slice(1);
        const navSection = document.getElementById(sectionId);
        navSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Event listener for handling scroll event
window.addEventListener('scroll', handleScroll);

// Event listener for when the 'scroll to top' button is clicked
scrollToTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
/**
 * End Events
 */

