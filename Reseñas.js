localStorage.removeItem("resenas");
let resenas = JSON.parse(localStorage.getItem("resenas")) || [];


function agregarResena() {

    let nombre = document.getElementById("nombre").value;
    let estrellas = document.getElementById("estrellas").value;
    let comentario = document.getElementById("comentario").value;


    if (nombre.trim() === "" || comentario.trim() === "") {

        alert("Completa todos los campos");

        return;
    }


    let nuevaResena = {

        nombre: nombre,
        estrellas: estrellas,
        comentario: comentario

    };


    resenas.push(nuevaResena);


    localStorage.setItem(
        "resenas",
        JSON.stringify(resenas)
    );


    document.getElementById("nombre").value = "";

    document.getElementById("comentario").value = "";


    mostrarResenas();

}


function mostrarResenas() {

    let lista = document.getElementById("listaResenas");

    lista.innerHTML = "";


    resenas.forEach(function(resena) {

        let estrellas = "⭐".repeat(
            Number(resena.estrellas)
        );


        lista.innerHTML += `

            <div class="resena">

                <h3>${resena.nombre}</h3>

                <p>${estrellas}</p>

                <p>${resena.comentario}</p>

            </div>

        `;

    });

}


mostrarResenas();
