localStorage.removeItem("resenas");
let resenas = JSON.parse(localStorage.getItem("resenas")) || [
    {
        nombre: "Carlos",
        estrellas: 5,
        comentario: "Me gustó mucho la página, está muy bien organizada."
    },
    {
        nombre: "Sofia",
        estrellas: 4,
        comentario: "La información sobre los componentes está muy interesante."
    },
    {
        nombre: "Daniel",
        estrellas: 5,
        comentario: "La sección para armar una PC está genial."
    },
    {
        nombre: "Valeria",
        estrellas: 5,
        comentario: "Me gustó mucho el diseño de la página."
    },
    {
        nombre: "Mateo",
        estrellas: 4,
        comentario: "La página es sencilla y fácil de utilizar."
    },
    {
        nombre: "Andrea",
        estrellas: 5,
        comentario: "Aprendí varias cosas sobre las computadoras."
    },
    {
        nombre: "Luis",
        estrellas: 4,
        comentario: "Me gustó la información y la forma en que está presentada."
    },
    {
        nombre: "Camila",
        estrellas: 5,
        comentario: "El apartado de componentes me ayudó bastante."
    },
    {
        nombre: "Jorge",
        estrellas: 5,
        comentario: "Está muy buena la página, especialmente el diseño."
    },
    {
        nombre: "Natalia",
        estrellas: 4,
        comentario: "Me parece una página interesante y entretenida."
    },
    {
        nombre: "Kevin",
        estrellas: 5,
        comentario: "La sección de armar tu PC es mi favorita."
    },
    {
        nombre: "Mariana",
        estrellas: 5,
        comentario: "La información está explicada de una manera fácil."
    },
    {
        nombre: "Diego",
        estrellas: 3,
        comentario: "Está bien hecha y tiene información interesante."
    },
    {
        nombre: "Gabriela",
        estrellas: 5,
        comentario: "Me encantó cómo quedó el diseño."
    },
    {
        nombre: "Samuel",
        estrellas: 4,
        comentario: "Muy buena página para aprender sobre computadoras."
    }
];


// PUBLICAR RESEÑA

function agregarResena() {

    let nombre = document.getElementById("nombre").value;
    let estrellas = document.getElementById("estrellas").value;
    let comentario = document.getElementById("comentario").value;

    // Comprobar que haya información
    if (nombre.trim() === "" || comentario.trim() === "") {

        alert("Completa todos los campos");

        return;
    }

    // Crear la nueva reseña
    let nuevaResena = {
        nombre: nombre,
        estrellas: estrellas,
        comentario: comentario
    };

    // Agregarla a la lista
    resenas.push(nuevaResena);

    // Guardarla
    localStorage.setItem(
        "resenas",
        JSON.stringify(resenas)
    );

    // Limpiar los campos
    document.getElementById("nombre").value = "";
    document.getElementById("comentario").value = "";

    // Mostrar las reseñas
    mostrarResenas();
}


// MOSTRAR RESEÑAS

function mostrarResenas() {

    let lista = document.getElementById("listaResenas");

    lista.innerHTML = "";

    resenas.forEach(function(resena, indice) {

        let estrellas = "⭐".repeat(
            Number(resena.estrellas)
        );

        lista.innerHTML += `
            <div class="resena">

                <h3>${resena.nombre}</h3>

                <p>${estrellas}</p>

                <p>${resena.comentario}</p>

                <button onclick="eliminarResena(${indice})">
                    🗑️ Eliminar
                </button>

            </div>
        `;

    });
}


// ELIMINAR RESEÑA

function eliminarResena(indice) {

    let confirmar = confirm(
        "¿Seguro que quieres eliminar esta reseña?"
    );

    if (confirmar) {

        // Eliminar la reseña
        resenas.splice(indice, 1);

        // Actualizar lo guardado
        localStorage.setItem(
            "resenas",
            JSON.stringify(resenas)
        );

        // Actualizar la pantalla
        mostrarResenas();
    }
}


// Mostrar las reseñas al abrir la página
mostrarResenas();;
