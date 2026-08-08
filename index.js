document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('legalModal');
    const openBtn = document.getElementById('openModal');
    const acceptBtn = document.getElementById('acceptModal');

    // 1. Öffnen
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex'; // Hier wird es sichtbar gemacht
        });
    }

    // 2. Schließen durch Akzeptieren
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            modal.style.display = 'none'; // Hier wird es wieder unsichtbar gemacht
        });
    }

    // 3. Schließen durch Hintergrund-Klick
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});