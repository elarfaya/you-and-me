const LAT = 42.81747525615885;
const LNG = -1.6432828471381855;
const map = L.map('map', {
  touchZoom: false,
  doubleClickZoom: false,
  zoomControl: false
}).setView([LAT, LNG], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([42.817459, -1.643278])
  .addTo(map)
  .bindPopup("Aquí empezó todo ❤️")
  .openPopup();

const inicio = new Date("2025-05-15");
const hoy = new Date();
const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
document.getElementById("contador").innerText =
  `Llevamos ${dias} días escribiendo esta historia ❤️`;

setTimeout(() => {
  map.flyTo([LAT, LNG], 18, {
    duration: 3
  });
}, 500);