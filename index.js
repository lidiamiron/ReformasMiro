// Copyright Year update
const currentYear = new Date().getFullYear();

document.querySelector("#copyright-year").innerHTML = currentYear;

// Menu hamburgesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const body = document.querySelector('body');

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
  abrir.classList.remove('displayMenu');
  cerrar.classList.add('displayMenu');
  body.classList.add('stop-scrolling');
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
  abrir.classList.add('displayMenu');
  cerrar.classList.remove('displayMenu');
  body.classList.remove('stop-scrolling');
});
function scrollToLocation(location) {
  document.querySelector(location).scrollIntoView({
    behavior: "smooth",
  });
  nav.classList.remove("visible");
  body.classList.remove('stop-scrolling');
  abrir.classList.add('displayMenu');
  cerrar.classList.remove('displayMenu')
}

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );

  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

const sliderScrollbar = document.querySelector(".slider-scrollbar");
const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

function sendMail() {
  const params = {
    fullName: document.querySelector("#fullName").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    message: document.querySelector("#message").value,
  };
  console.log(params);
  const serviceId = "service_sileukt";
  const templateId = "template_9lf19fg";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.querySelector("#fullName").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#message").value = "";
      console.log("Mesajul a fost trimis");
    })
    .catch((error) => console.log(error));
}



//EmailJS service
// function initializeEmailJS() {
//   emailjs.init("_BGQNrYK0RyRbNvqA");
// }
// document.addEventListener("DOMContentLoaded", () => initializeEmailJS());
