// =========================================
// DATAQUEST INTERACTIVE LAB NAVIGATION
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const labButtons = document.querySelectorAll(".lab-button");

  // =========================================
  // LAB PAGE ROUTING
  // =========================================

  labButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLab = button.dataset.lab;

      if (selectedLab === "bar") {
        window.location.href = "bar-builder.html";
      }

      if (selectedLab === "pie") {
        window.location.href = "pie-builder.html";
      }

      if (selectedLab === "line") {
        window.location.href = "line-builder.html";
      }
    });
  });

  // =========================================
  // CARD HOVER INTERACTION
  // =========================================

  const cards = document.querySelectorAll(".lab-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });
});
