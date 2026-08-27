let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

function agregarReseña() {

    let nombre = document.getElementById("nombre").value;
    let estrellas = document.getElementById("estrellas").value;
    let comentario = document.getElementById("comentario").value;

    if (nombre == "" || comentario == "") {
        alert("Completa todos los campos");
        return;
    }

    let nuevaReseña = {
        nombre: nombre,
        estrellas: estrellas,
        comentario: comentario
    };

    resenas.push(nuevaReseña);

    localStorage.setItem("reseñas", JSON.stringify(reseñas));

    document.getElementById("nombre").value = "";
    document.getElementById("comentario").value = "";

    mostrarReseñas();
}

function mostrarReseñas() {

    let lista = document.getElementById("listaReseñas");

    lista.innerHTML = "";

    reseñas.forEach(function(reseña) {

        let estrellas = "⭐".repeat(reseña.estrellas);

        lista.innerHTML += `
            <div class="resena">
                <h3>${reseña.nombre}</h3>
                <p>${estrellas}</p>
                <p>${reseña.comentario}</p>
            </div>
        `;
    });
}

mostrarReseñas();