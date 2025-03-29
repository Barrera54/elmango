function toggleInfo() {
    const rectangle = document.querySelector('.rectangle');
    const infoPanel = document.getElementById('infoPanel');
    
    // Alternar clases activas
    rectangle.classList.toggle('active');
    infoPanel.classList.toggle('active');
    
    // Cambiar el texto del rectángulo si lo deseas
    if (infoPanel.classList.contains('active')) {
        rectangle.querySelector('h2').innerHTML = 'Información Importante <span class="arrow">▲</span>';
    } else {
        rectangle.querySelector('h2').innerHTML = 'Información Importante <span class="arrow">▼</span>';
    }
}