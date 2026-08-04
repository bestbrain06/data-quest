// ===============================
// LESSON READING PROGRESS
// ===============================

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / documentHeight) * 100;

  const progressFill = document.getElementById("progressFill");

  const progressPercentage = document.getElementById("progressPercentage");

  if (progressFill && progressPercentage) {
    progressFill.style.width = progress + "%";

    progressPercentage.textContent = Math.round(progress) + "%";
  }
});
