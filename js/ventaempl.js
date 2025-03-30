function toggleInfo(panelNumber) {
    const rectangle = document.querySelectorAll('.rectangle')[panelNumber - 1];
    const infoPanel = document.getElementById(`infoPanel${panelNumber}`);
    const arrow = rectangle.querySelector('.arrow');
    
    // Alternar clases activas
    rectangle.classList.toggle('active');
    infoPanel.classList.toggle('active');
    
    // Cambiar la flecha
    if (infoPanel.classList.contains('active')) {
        arrow.textContent = '';
    } else {
        arrow.textContent = '';
    }}