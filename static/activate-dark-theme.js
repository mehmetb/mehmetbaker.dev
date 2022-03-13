const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
const navbar = document.querySelector('nav.navbar');
const cards = document.querySelectorAll('.card');

function updateNavbarTheme({ dark }) {
  navbar.classList.toggle('navbar-light', !dark);
  navbar.classList.toggle('bg-light', !dark);
  navbar.classList.toggle('navbar-dark', dark);
  navbar.classList.toggle('bg-dark', dark);
}

function updateCardTheme({ dark }) {
  cards.forEach((card) => card.classList.toggle('bg-dark', dark));
}

function updateTheme(e) {
  const dark = !!e.matches;
  updateNavbarTheme({ dark });
  updateCardTheme({ dark });
}

updateTheme(colorSchemeQueryList);
colorSchemeQueryList.addEventListener('change', updateTheme);
