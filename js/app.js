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
 * Define Global Variables
*/

const sectionList = document.getElementsByTagName('section');
const navUl = document.getElementById("navbar__list");
const fragmentLi = document.createDocumentFragment();
var rootElement = document.documentElement

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to remove active class from the a and section w

function clear(){
    const Listanchor = document.getElementsByTagName('a');
    if(scrollY >=0 && scrollY <= 300)
    for (var i = 0; i < sectionList.length; i++) {
      if (sectionList[i].classList.contains("active"))
        sectionList[i].classList.remove("active")
      if (Listanchor[i].classList.contains("active"))
        Listanchor[i].classList.remove("active")
    }
}

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav(){
    for (const section of sectionList) {
        let newLi = document.createElement('li');
        let newlink = document.createElement('a');
        newLi.appendChild(newlink);
        newlink.classList.add("menu__link");
        newlink.innerText = section.id;
        newlink.id = section.id;
        fragmentLi.appendChild(newLi);
    }
    navUl.appendChild(fragmentLi);
}


// Add class 'active' to section when near top of viewport

function AddClassActive(){
    for (const section of sectionList) {
        let rec = section.getBoundingClientRect();
        section.classList.remove("active");
        if(rec.top >= -300 && rec.bottom <= 800)
            section.classList.add("active");
    }
}

// Scroll to anchor ID using scrollTO event
function ScrollToanchorId(){
    const Listanchor = document.getElementsByTagName('a')
    for (let i=0 ;i< sectionList.length ; i++) {
        Listanchor[i].addEventListener("click",function(){
            window.scrollTo(0,sectionList[i].offsetTop);
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

buildNav();

// Scroll to section on link click

ScrollToanchorId();

// Set sections as active

window.addEventListener("scroll",AddClassActive);


// check if  user scrolls below the fold of the page.

const btntop = document.getElementById("btn-top");
window.addEventListener("scroll",function(){
    if(scrollY > 600)
        btntop.style.visibility = "visible";
    else
        btntop.style.visibility = "hidden";
});

// add Event Listener to the button to go up

btntop.addEventListener("click",scrollToTop)

// add active class to anchore in nav when section with the Same id

const Listanchor = document.querySelectorAll('.menu__link');
window.addEventListener("scroll",function(){
    
    for (let section of sectionList) {
        if(section.classList.contains("active"))
        {
            for (const anchor of Listanchor) {
                if(anchor.id === section.id){
                    anchor.classList.add("active");
                }
                else{
                    anchor.classList.remove("active");
                }
            }
        }
    }
});

// function to hide nav bar when scroll

var nav = document.getElementsByClassName("page__header")[0];

window.addEventListener("scroll",function(){
    setTimeout(function(){
        nav.classList.add("hidenav");
    })
},100);

var isScrolling;

// Listen for scroll events

window.addEventListener('scroll', function ( event ) {
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
		nav.classList.replace("hidenav","shownav");
	}, 100);
});

// Listen for clear function

window.addEventListener('scroll', clear);

