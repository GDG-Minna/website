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

function prevent(e) {
  e.preventDefault();
}

// api call
const cards = document.getElementById('cards')

let events = [];

try {
  const consumeApi = async function apiRequest() {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.meetup.com/gdgminna/events?sign=true&photo-host=public&page=50&access_token=3b3eab9e6952edaaa8dfded8350e3f0c');
    const result = await response.json();
      events = result;
      console.log(events)
      showEvents(events)
  }
  consumeApi()
} catch (error) {
  console.log('error')
}

function showEvents(evts){
  let cardTemplate = '';
  if(evts.length < 1){
    cardTemplate  = `<h1 class="lg:flex lg:items-center lg:justify-center">There are no event for this page</h1>`
  }else{
  evts.forEach(events => {
    cardTemplate +=`
    <div class="uk-position-relative uk-visible-toggle uk-light lg:mb-12" tabindex="-1" uk-slider>

      <div class="uk-position-relative uk-visible-toggle uk-light lg:mb-10" tabindex="-1">

        <ul class="uk-slider-items uk-child-width-1-3@s uk-grid">
          <li>
            <div class="lg:ml-4 uk-card shadow-none lg:my-2">
              <div class="uk-card-body">
                <div class="details rounded-b">
                  <h3 class="uk-card-title">${events.name}</h3>
                  <p class="event-text">${events.description.slice(0, 181)}.</p>
                  <div class="flex justify-between">
                    <div class="justify-start">
                      <span class="evt-date">Date</span>
                      <p class="font-bold timestamp">${events.local_date}</p>
                    </div>
                    <div class="justify-end">
                      <span class="evt-date">Time</span>
                      <p class="font-bold timestamp">${events.local_time}</p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <span><a href=${events.link} class="reserve">All seats Booked</a></span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>`;
  })
}
cards.innerHTML = cardTemplate;
}