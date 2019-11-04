window.addEventListener("scroll", addShadowToNav);

const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", e => {
  toggleNav();
  toggleMenuBtn();
});
document.addEventListener("click", e => scrollToElement(e));

// function declaration

//toogle show menu icon
function toggleMenuBtn() {
  document.querySelector(".menu-btn").classList.toggle("toggle-nav-btn");
}

// toggle small screen navbar
function toggleNav() {
  document.querySelector(".sm-nav").classList.toggle("hidden");
  document.querySelector(".sm-nav").classList.toggle("opacity-0");
}

//toogle header shadow onscroll
function addShadowToNav(e) {
  if (window.pageYOffset > 80) {
    document.querySelector("header").classList.add("shadow");
  } else {
    document.querySelector("header").classList.remove("shadow");
  }
}

//scroll to an element
function scrollToElement(e) {
  
  const element = e.target;
  if (element.classList.contains("scroll-to")) {
    e.preventDefault();
    const dataAttrb = element.getAttribute("data-scroll");
    const elementToScrollTo = document.getElementById(dataAttrb);
    offset(elementToScrollTo);
  } else (
    element.classList.contains("scroll-to") &&
    element.classList.contains("sm-scroll")
  ); 
}

const offset = el => {
  let rect = el.getBoundingClientRect().top;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let elTopPosition = rect + scrollTop;
  window.scrollTo({
    left: 0,
    top: elTopPosition,
    behavior: "smooth"
  });
  console.log(elTopPosition);
};

// Animate Scroll
