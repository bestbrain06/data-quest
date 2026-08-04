// =========================================
// DATAQUEST BUILDER NAVBAR
// MOBILE TOGGLE ENGINE
// =========================================

// Select elements

const builderMenuButton = document.querySelector(".builder-menu-toggle");

const builderMenu = document.querySelector(".builder-nav-menu");

// Check if navbar exists
// (prevents errors on pages without builder navbar)

if (builderMenuButton && builderMenu) {
  // ==============================
  // OPEN / CLOSE MENU
  // ==============================

  builderMenuButton.addEventListener("click", () => {
    builderMenu.classList.toggle("active");

    builderMenuButton.classList.toggle("active");
  });

  // ==============================
  // CLOSE AFTER CLICKING LINK
  // ==============================

  const builderLinks = document.querySelectorAll(
    ".builder-links a, .builder-back",
  );

  builderLinks.forEach((link) => {
    link.addEventListener("click", () => {
      builderMenu.classList.remove("active");

      builderMenuButton.classList.remove("active");
    });
  });

  // ==============================
  // CLOSE WHEN CLICKING OUTSIDE
  // ==============================

  document.addEventListener("click", (event) => {
    const clickedInside = builderMenu.contains(event.target);

    const clickedButton = builderMenuButton.contains(event.target);

    if (!clickedInside && !clickedButton) {
      builderMenu.classList.remove("active");

      builderMenuButton.classList.remove("active");
    }
  });

  // ==============================
  // CLOSE WHEN RESIZING DESKTOP
  // ==============================

  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      builderMenu.classList.remove("active");

      builderMenuButton.classList.remove("active");
    }
  });
}
