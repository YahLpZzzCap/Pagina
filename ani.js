document.addEventListener("DOMContentLoaded", () => {
    const textoAnimado = " Carga completada. Escribe 'help' o selecciona una época:";
    const elementoTyper = document.getElementById("cmd-typer");
    const contenedorLinks = document.getElementById("cmd-links");
    const inputCmd = document.getElementById("cmd-input");
    const outputCmd = document.getElementById("cmd-output");
    let i = 0;

    // Precarga y manejo de audio
    let audioScreamer = document.getElementById("screamer-audio");
    let audioPermitido = false;

    // Desbloquea el permiso de audio al primer clic en la página
    document.addEventListener("click", () => {
        if (!audioPermitido && audioScreamer) {
            audioScreamer.play().then(() => {
                audioScreamer.pause();
                audioScreamer.currentTime = 0;
                audioPermitido = true;
            }).catch(() => {});
        }
    }, { once: true });

    // Efecto de máquina de escribir al cargar
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

    // Listener para capturar el Enter en el input
    if (inputCmd) {
        inputCmd.addEventListener("keyup", function(e) {
            if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                const comando = this.value.trim().toLowerCase();
                this.value = "";
                ejecutarComando(comando);
            }
        });
    }

    function ejecutarComando(cmd) {
        if (!outputCmd) return;
        outputCmd.style.display = "block";

        switch(cmd) {
            case 'help':
                outputCmd.textContent = 
                    "=== COMANDOS DISPONIBLES ===\n" +
                    " • help            : Muestra la lista de comandos\n" +
                    " • cls             : Limpia la pantalla de la consola\n" +
                    " • theme vicecity  : Activa la paleta neón 80s\n" +
                    " • theme brba      : Activa la paleta Breaking Bad\n" +
                    " • theme reset     : Restaura la paleta original\n" +
                    " • overclock       : Activa el modo máximo rendimiento\n" +
                    " • 1, 2, 3, 4, 5   : Salta a la época correspondiente";
                break;

            case 'cls':
                outputCmd.textContent = "";
                outputCmd.style.display = "none";
                break;

            case 'theme vicecity':
            case 'theme vice':
                document.body.className = "theme-matrix";
                outputCmd.textContent = "[SYSTEM]: Bienvenido a Ocean Drive. Paleta Vice City activada. 🌴💖";
                break;

            case 'theme brba':
            case 'theme breakingbad':
                document.body.className = "theme-cyberpunk";
                outputCmd.textContent = "[SYSTEM]: Say my name. Paleta Breaking Bad activada. 🧪⚡";
                break;

            case 'theme reset':
                document.body.className = "";
                outputCmd.textContent = "[SYSTEM]: Tema original restaurado.";
                break;

            case 'overclock':
            case 'boost':
                outputCmd.textContent = "[SYSTEM]: Overclock aplicado al procesador. +250% de rendimiento. 🚀⚡";
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

    // Función del Screamer
    function activarScreamer() {
        const screamerContainer = document.getElementById("screamer-container");

        if (screamerContainer) {
            screamerContainer.style.display = "flex";

            // Usamos una nueva instancia en JS para forzar la reproducción
            let reproductor = new Audio("To/te.mp3");
            reproductor.volume = 1.0;
            reproductor.play().catch(e => console.error("Error cargando el archivo:", e));

            setTimeout(() => {
                screamerContainer.style.display = "none";
                reproductor.pause();
                reproductor.currentTime = 0;
            }, 2500);
        }
    }
});

function cerrarCMD() {
    const cmd = document.querySelector('.cmd-menu');
    if (cmd) {
        cmd.style.display = 'none';
    }
}