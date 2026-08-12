// Headerbereich (docToggleArea) öffnen / schließen

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
// Headerbereich (docToggleArea) öffnen / schließen

// Main Bereich

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.has-dropdown .item-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
});
console.log("TEST: JS-Datei wird geladen!");

// Footer bereich
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-btn');

    socialLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            // ID des Bildes holen, das zu diesem Link gehört
            const imgId = link.getAttribute('data-img-id');
            const hoverSrc = link.getAttribute('data-hover-src');
            const imgElement = document.getElementById(imgId);

            // Bildquelle austauschen
            if (imgElement && hoverSrc) {
                imgElement.src = hoverSrc;
            }
        });

        link.addEventListener('mouseout', () => {
            // ID des Bildes holen
            const imgId = link.getAttribute('data-img-id');
            const defaultSrc = link.getAttribute('data-default-src');
            const imgElement = document.getElementById(imgId);

            // Bildquelle auf Standard zurücksetzen
            if (imgElement && defaultSrc) {
                imgElement.src = defaultSrc;
            }
        });
    });
});
// Footer Bereich

// Popup Bereich
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Alle Elemente zum Öffnen und Schließen finden
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    const modalContents = document.querySelectorAll('.modal-content');

    // 2. Funktion zum Öffnen eines Modals
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Scrollen der Hauptseite verhindern
        }
    }

    // 3. Funktion zum Schließen eines Modals
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = ''; // Scrollen wieder erlauben
        }
    }

    // 4. Event-Listener für die Links im Footer
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Verhindert das Springen der Seite (href="#")
            e.stopPropagation(); // Verhindert, dass der Klick nach oben durchreicht
            const modalId = btn.getAttribute('data-modal-id');
            openModal(modalId);
        });
    });

    // 5. Event-Listener für die 'X'-Buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    // 5.1 Klick in den Inhalt verhindern, dass das Popup schließt
    modalContents.forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // 6. Schließen, wenn man *außerhalb* des Modals klickt
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // 7. Schließen mit der ESC-Taste
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains('open')) {
                    closeModal(modal);
                }
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const welcomeModal = document.getElementById('welcome-modal');
    const acceptBtn = document.getElementById('accept-consent-btn');
    const subButtons = document.querySelectorAll('.open-modal-sub');

    // 1. Prüfen, ob der Nutzer bereits akzeptiert hat
    if (!localStorage.getItem('consentAccepted')) {
        if (welcomeModal) {
            welcomeModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    } else {
        if (welcomeModal) {
            welcomeModal.classList.add('hidden');
        }
    }

    // 2. Klick auf "Verstanden & Akzeptieren"
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('consentAccepted', 'true');
            if (welcomeModal) {
                welcomeModal.classList.add('hidden');
            }
            document.body.style.overflow = '';
        });
    }

    // 3. Impressum- und Datenschutz-Buttons umschalten
    subButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            // Alle anderen Sektionen erst mal schließen (optional, für saubere Ansicht)
            document.querySelectorAll('.sub-text-section').forEach(section => {
                if (section !== targetSection) {
                    section.style.display = 'none';
                }
            });

            // Geklickte Sektion umschalten (zeigen/verstecken)
            if (targetSection) {
                if (targetSection.style.display === 'block') {
                    targetSection.style.display = 'none';
                } else {
                    targetSection.style.display = 'block';
                }
            }
        });
    });
});