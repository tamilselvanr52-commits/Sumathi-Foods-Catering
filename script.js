// Colors and behavior logic inspired by common header hide-on-scroll,
// floating button, and slider patterns.[web:1][web:2][web:9][web:12][web:17]

// YEAR IN FOOTER
document.getElementById('year').textContent = new Date().getFullYear();

// HEADER SHOW/HIDE ON SCROLL & WHATSAPP BUTTON TOGGLE
const header = document.getElementById('mainHeader');
const floatingWhatsapp = document.getElementById('floatingWhatsapp');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  // Hide header when scrolling down, show when scrolling up
  if (currentY > lastScrollY + 5) {
    header.classList.add('hidden');
  } else if (currentY < lastScrollY - 5) {
    header.classList.remove('hidden');
  }

  // Floating WhatsApp: hide on scroll down, show on scroll up
  if (currentY > lastScrollY + 5) {
    floatingWhatsapp.classList.remove('hidden');
  } else if (currentY < lastScrollY - 5) {
    floatingWhatsapp.classList.add('hidden');
  }

  lastScrollY = currentY <= 0 ? 0 : currentY;

  handleScrollTopVisibility();
});

// MOBILE MENU + HAMBURGER ANIMATION
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// SERVICES CARDS CLICK -> SERVICES PAGE
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });
});

// TESTIMONIAL SLIDER (auto every 3s, stop on hover)
const slider = document.getElementById('testimonialSlider');
const track = slider.querySelector('.testimonial-track');
const items = slider.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('#testimonialDots .dot');

let currentIndex = 0;
let sliderInterval = null;

function goToSlide(index) {
  currentIndex = index;
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  const activeDot = document.querySelector(`#testimonialDots .dot[data-index="${index}"]`);
  if (activeDot) activeDot.classList.add('active');
}

function startSlider() {
  sliderInterval = setInterval(() => {
    const next = (currentIndex + 1) % items.length;
    goToSlide(next);
  }, 3000);
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}

// Start autoplay
startSlider();

// Pause on hover
slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);

// Navigate via dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'), 10);
    goToSlide(index);
  });
});


function handleScrollTopVisibility() {
  // SCROLL TO TOP BUTTON VISIBILITY NEAR FOOTER
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const footer = document.querySelector('.footer'); 

  const footerRect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // When footer enters viewport area, show the button
  console.log("footerRect value : ", footerRect);
  console.log("windowHeight value : ", windowHeight);
  
 if (footerRect.top < windowHeight -10) {
   scrollTopBtn.classList.add('visible');
 } else {
  scrollTopBtn.classList.remove('visible');
  }
}


// Initial check
handleScrollTopVisibility();

// Scroll to top behavior
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
