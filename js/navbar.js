// =========================================
// DATAQUEST NAVBAR FUNCTIONALITY
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");

  const navMenu = document.querySelector(".nav-menu");

  const navLinks = document.querySelectorAll(".nav-links a");

  // Check if navbar exists on current page

  if (!menuToggle || !navMenu) {
    return;
  }

  // =========================================
  // OPEN / CLOSE MOBILE MENU
  // =========================================

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");
  });

  // =========================================
  // CLOSE MENU AFTER CLICKING LINK
  // =========================================

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");
    });
  });

  // =========================================
  // CLOSE WHEN CLICKING OUTSIDE
  // =========================================

  document.addEventListener("click", (event) => {
    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar) {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");
    }
  });

  // =========================================
  // CLOSE MENU WHEN SCREEN EXPANDS
  // =========================================

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");
    }
  });
});
