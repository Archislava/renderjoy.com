document.addEventListener("DOMContentLoaded", () => {

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots span");

let current = 0;
let interval;

/* HERO */

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  if(slides[i]) slides[i].classList.add("active");
  if(dots[i]) dots[i].classList.add("active");

  current = i;
}

window.showSlide = showSlide;

function nextSlide(){
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide(){
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

function start(){
  interval = setInterval(nextSlide, 4000);
}

start();

/* MODAL */

function openModal(html){
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<div class="modal-content">${html}</div>`;
  modal.onclick = () => modal.remove();
  document.body.appendChild(modal);
}

window.openModal = openModal;

/* DATA */

const servicesGrid = document.getElementById("servicesGrid");
const processGrid = document.getElementById("processGrid");
const casesGrid = document.getElementById("casesGrid");

/* RENDER */

function render(){

  const t = LANG[currentLang];

  document.querySelector(".hero-content h1").innerText = t.heroTitle;
  document.querySelector(".hero-content p").innerText = t.heroSubtitle;
  document.querySelector("[data-i18n='intro']").innerText = t.intro;

  document.querySelectorAll("[data-i18n='services']")[0].innerText = t.services;
  document.querySelectorAll("[data-i18n='process']")[0].innerText = t.process;
  document.querySelectorAll("[data-i18n='cases']")[0].innerText = t.cases;
  document.querySelectorAll("[data-i18n='contact']")[0].innerText = t.contact;

  /* SERVICES */

  servicesGrid.innerHTML = "";
  SERVICES.forEach(s => {
    const d = document.createElement("div");
    d.className = "card";

    d.innerHTML = `
      <img src="${s.image}">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    `;

    d.onclick = () => openModal(`<img src="${s.image}"><h2>${s.title}</h2><p>${s.text}</p>`);

    servicesGrid.appendChild(d);
  });

  /* PROCESS */

  processGrid.innerHTML = "";

PROCESS.forEach(p => {
  const d = document.createElement("div");
  d.className = "process-node";

  d.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.text}</p>
    <img src="${p.image}">
  `;

  d.onclick = () => openModal(`
    <img src="${p.image}">
    <h2>${p.title}</h2>
    <p>${p.text}</p>
  `);

  processGrid.appendChild(d);
});

  /* CASES */

  casesGrid.innerHTML = "";
  CASES.forEach(c => {
    const d = document.createElement("div");
    d.className = "card";

    d.innerHTML = `
      <img src="${c.image}">
      <h3>${c.title}</h3>
      <p>${c.text}</p>
    `;

    d.onclick = () => openModal(`<img src="${c.image}"><h2>${c.title}</h2><p>${c.text}</p>`);

    casesGrid.appendChild(d);
  });
}

/* LANG */

window.setLang = function(lang){
  currentLang = lang;
  render();
};

document.querySelectorAll(".lang span").forEach(el => {
  el.onclick = () => setLang(el.dataset.lang);
});

/* INIT */

render();

});