const map = L.map('map').setView([42.817459, -1.643278], 20); // Cambia coords

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([42.817459, -1.643278])
  .addTo(map)
  .bindPopup("Aquí empezó todo ❤️")
  .openPopup();