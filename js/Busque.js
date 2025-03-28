const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

// Función para buscar
searchButton.addEventListener('click', () => {
    if(searchInput.value.trim() !== '') {
        alert(`Buscando: ${searchInput.value}`);
        // Aquí puedes agregar la lógica de búsqueda real
    }
});

// También buscar al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && searchInput.value.trim() !== '') {
        alert(`Buscando: ${searchInput.value}`);
        // Aquí puedes agregar la lógica de búsqueda real
    }
});