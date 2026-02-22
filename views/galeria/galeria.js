const images = document.querySelectorAll('.galeria-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});