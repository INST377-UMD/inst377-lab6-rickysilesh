// Random Coordinate Generator Function
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 Random Sets of Coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Initialize Map
const map = L.map('map').setView([32.5, -95], 5);

// Add Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Display Coordinates and Markers
coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    const coordinateDiv = document.createElement('div');
    coordinateDiv.textContent = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng})`;
    document.getElementById('coordinates').appendChild(coordinateDiv);

    // Fetch Locality
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const localityDiv = document.createElement('div');
            localityDiv.textContent = `Locality: ${data.locality || 'Unknown'}`;
            coordinateDiv.appendChild(localityDiv);
        })
        .catch(error => console.error('Error fetching locality:', error));
});
