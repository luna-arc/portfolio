const nav = document.querySelector(".nav-container");
const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

nav.addEventListener("mousemove", (e) => {
  const rect = nav.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;

  glow.style.opacity = 0.5;
});

nav.addEventListener("mouseleave", () => {
  glow.style.opacity = 0;
});

function animate() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  glow.style.left = currentX + "px";
  glow.style.top = currentY + "px";

  requestAnimationFrame(animate);
}

animate();