document.addEventListener("DOMContentLoaded", () => {
    // === CONFIGURACIÓN Y ELEMENTOS ===
    const textoAnimado = " Carga completada. Escribe 'help' o selecciona una época:";
    const elementoTyper = document.getElementById("cmd-typer");
    const contenedorLinks = document.getElementById("cmd-links");
    const inputCmd = document.getElementById("cmd-input");
    const outputCmd = document.getElementById("cmd-output");
    
    // Controles de ventana CMD
    const cmdWindow = document.getElementById("cmd-window");
    const btnCerrarCmd = document.getElementById("btn-cerrar-cmd");
    const btnReabrirCmd = document.getElementById("btn-reabrir-cmd");

    // Audio Screamer
    const audioScreamer = document.getElementById("screamer-audio");
    let audioPermitido = false;

    let i = 0;

    // === DESBLOQUEO DE AUDIO (POLÍTICA DE AUTOPLAY) ===
    document.addEventListener("click", () => {
        if (!audioPermitido && audioScreamer) {
            audioScreamer.play().then(() => {
                audioScreamer.pause();
                audioScreamer.currentTime = 0;
                audioPermitido = true;
            }).catch(() => {});
        }
    }, { once: true });

    // === EFECTO MÁQUINA DE ESCRIBIR ===
    function escribirTexto() {
        if (elementoTyper && i < textoAnimado.length) {
            elementoTyper.textContent += textoAnimado.charAt(i);
            i++;
            setTimeout(escribirTexto, 35);
        } else {
            if (contenedorLinks) {
                contenedorLinks.style.display = "flex";
            }
        }
    }

    escribirTexto();

    // === CONTROL DE APERTURA Y CIERRE DEL CMD ===
    if (btnCerrarCmd && cmdWindow) {
        btnCerrarCmd.addEventListener("click", () => {
            cmdWindow.style.opacity = "0";
            cmdWindow.style.transform = "scale(0.95)";
            setTimeout(() => {
                cmdWindow.style.display = "none";
                if (btnReabrirCmd) btnReabrirCmd.style.display = "block";
            }, 300);
        });
    }

    if (btnReabrirCmd && cmdWindow) {
        btnReabrirCmd.addEventListener("click", () => {
            cmdWindow.style.display = "block";
            btnReabrirCmd.style.display = "none";
            setTimeout(() => {
                cmdWindow.style.opacity = "1";
                cmdWindow.style.transform = "scale(1)";
                if (inputCmd) inputCmd.focus();
            }, 10);
        });
    }

    // === CAPTURA DE TECLA ENTER EN EL INPUT ===
    if (inputCmd) {
        inputCmd.addEventListener("keyup", (e) => {
            if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                
                // Bajar el teclado virtual en móviles quitando el foco del input
                inputCmd.blur();

                const comando = inputCmd.value.trim().toLowerCase();
                inputCmd.value = "";
                ejecutarComando(comando);
            }
        });
    }

    // === PROCESADOR DE COMANDOS ===
    function ejecutarComando(cmd) {
        if (!outputCmd) return;
        outputCmd.style.display = "block";

        switch (cmd) {
            case 'help':
                outputCmd.textContent = 
                    "=== COMANDOS DISPONIBLES ===\n" +
                    " • help            : Muestra la lista de comandos\n" +
                    " • cls             : Limpia la pantalla de la consola\n" +
                    " • theme vicecity  : Activa la paleta neón Vice City\n" +
                    " • theme brba      : Activa la paleta Breaking Bad\n" +
                    " • theme reset     : Restaura la paleta original\n" +
                    " • credits         : Muestra los integrantes del equipo\n" +
                    " • overclock       : Activa el modo máximo rendimiento\n" +
                    " • promo2026       : Achievement de Graduación\n" +
                    " • 1, 2, 3, 4, 5   : Salta a la época correspondiente";
                break;

            case 'cls':
                outputCmd.textContent = "";
                outputCmd.style.display = "none";
                break;

            case 'theme vicecity':
            case 'theme vice':
                document.body.className = "theme-vice";
                outputCmd.textContent = "[SYSTEM]: Bienvenido a Vice City. Paleta activada";
                break;

            case 'theme brba':
            case 'theme breakingbad':
                document.body.className = "theme-brba";
                outputCmd.textContent = "[SYSTEM]: Say my name";
                break;

            case 'theme reset':
                document.body.className = "";
                outputCmd.textContent = "[SYSTEM]: Volviendo a la paleta original de Los Cheles.";
                break;

            case 'overclock':
            case 'boost':
                outputCmd.textContent = "[SYSTEM]: Overclock aplicado al procesador. +67% de rendimiento.";
                break;

            // EASTER EGG / CRÉDITOS DEL EQUIPO
            case 'credits':
            case 'loscheles':
            case 'equipo':
                outputCmd.innerHTML = `
                    <div style="color:#ce93d8; font-family: monospace; line-height: 1.5;">
                        ----------------------------------------<br>
                        <strong style="color:#ffff55;">[ INTEGRANTES - LOS CHELES .PY ]</strong><br>
                        ----------------------------------------<br>
                        • Ronny Lopez<br>
                        • Erick Mendoza<br>
                        • Anderlin Paz<br>
                        • Williams Herrera<br><br>
                        <span style="color:#80cbc4;">Los Cheles.py // 2026</span><br>
                        ----------------------------------------
                    </div>
                `;
                break;

            // EASTER EGG PROMO 2026
            case 'promo2026':
            case 'promo 2026':
                triggerPromo2026Achievement();
                outputCmd.textContent = "[ACHIEVEMENT UNLOCKED]: Achievement Made! The End? 🎓";
                break;

            // EASTER EGG SCREAMER 67
            case '67':
                activarScreamer();
                outputCmd.textContent = "[CRITICAL ERROR]: System breach detected... ⚠️";
                break;

            case '1':
                window.location.hash = "#epoca-80s";
                outputCmd.textContent = "Navegando a Época 1 (1980-1989)...";
                break;

            case '2':
                window.location.hash = "#epoca-90s";
                outputCmd.textContent = "Navegando a Época 2 (1990-1999)...";
                break;

            case '3':
                window.location.hash = "#epoca-2000s";
                outputCmd.textContent = "Navegando a Época 3 (2000-2019)...";
                break;

            case '4':
                window.location.hash = "#epoca-2020";
                outputCmd.textContent = "Navegando a Época 4 (2020-2022)...";
                break;

            case '5':
                window.location.hash = "#epoca-2023";
                outputCmd.textContent = "Navegando a Época 5 (2023-Actualidad)...";
                break;

            case '':
                break;

            default:
                outputCmd.textContent = `'${cmd}' no se reconoce como un comando interno o externo. Escribe 'help'.`;
        }
    }

    // === LÓGICA DEL SCREAMER ===
    function activarScreamer() {
        const screamerContainer = document.getElementById("screamer-container");

        if (screamerContainer && audioScreamer) {
            screamerContainer.style.display = "flex";
            audioScreamer.currentTime = 0;
            audioScreamer.volume = 1.0;

            audioScreamer.play().catch(e => console.error("Error al reproducir audio:", e));

            setTimeout(() => {
                screamerContainer.style.display = "none";
                audioScreamer.pause();
                audioScreamer.currentTime = 0;
            }, 2500);
        }
    }

    // === DISPARADOR DE NOTIFICACIÓN PROMO 2026 CON MP3 ===
    function triggerPromo2026Achievement() {
        const toast = document.getElementById('achievement-toast');
        const audioAchievement = document.getElementById('achievement-audio');

        // Reproducir el archivo MP3
        if (audioAchievement) {
            audioAchievement.currentTime = 0;
            audioAchievement.volume = 0.8;
            audioAchievement.play().catch((e) => console.log("Audio bloqueado por el navegador:", e));
        }

        // Mostrar el toast durante 8 segundos
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 6000);
        }
    }
});
