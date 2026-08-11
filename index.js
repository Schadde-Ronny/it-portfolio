document.addEventListener("DOMContentLoaded", () => {
    const toggleArea = document.getElementById("docToggleArea");

    if (toggleArea) {
        // 1. Klick auf den Header-Bereich: Öffnen / Schließen umschalten
        toggleArea.addEventListener("click", (event) => {
            // Verhindert, dass der Klick direkt das "Außen-Klick"-Ereignis auslöst
            event.stopPropagation();
            toggleArea.classList.toggle("active");
        });

        // 2. Klick irgendwo anders auf der Seite (z.B. Main oder Footer) schließt das Menü
        document.addEventListener("click", (event) => {
            // Prüfen, ob der Klick außerhalb des toggleArea-Bereichs war
            if (!toggleArea.contains(event.target)) {
                toggleArea.classList.remove("active");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const headerArea = document.getElementById("docToggleArea"); // Dein Header-Interaktionsbereich
    const mainArea = document.querySelector("main"); // Dein Main-Bereich
    const profileImg = document.getElementById("profileImg");

    // Trage hier deine genauen Dateinamen ein:
    const normalImg = "Ronny.png"; // Dein Standard-Bild (für den Main-Bereich)
    const hoverImg = "Ronny2.png";   // Dein zweites Bild (für den Header-Bereich)

    if (headerArea && profileImg) {
        // 1. Wenn man im Header-Bereich interagiert (Maus drüber oder Klick) -> Zweites Bild
        headerArea.addEventListener("mouseenter", () => {
            profileImg.src = hoverImg;
        });

        headerArea.addEventListener("click", () => {
            profileImg.src = hoverImg;
        });
    }

    if (mainArea && profileImg) {
        // 2. Sobald man im Main-Bereich interagiert (Klick oder Maus rein) -> Zurück zum ersten Bild
        mainArea.addEventListener("click", () => {
            profileImg.src = normalImg;
            // Falls der Header dabei auch zugehen soll:
            if (headerArea) {
                headerArea.classList.remove("active");
            }
        });

        mainArea.addEventListener("mouseenter", () => {
            profileImg.src = normalImg;
        });
    }
});