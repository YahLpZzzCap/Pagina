let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log("¡El DOM cargó correctamente!");

    const btnCarrito = document.getElementById("btnCarrito");
    const ventanaCarrito = document.querySelector(".Ventana");

    if (!btnCarrito) {
        console.error("¡No encontré el botón con id 'btnCarrito'!");
        return;
    }

    if (!ventanaCarrito) {
        console.error("¡No encontré el elemento con clase '.Ventana'!");
        return;
    }

    // Evento para abrir y cerrar la ventana con el clic en el botón del carrito
    btnCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        ventanaCarrito.classList.toggle("activo");
    });

    // Cerrar la ventana al hacer clic fuera de ella (sin cerrarse si haces clic dentro)
    window.addEventListener("click", (e) => {
        if (ventanaCarrito.contains(e.target) || btnCarrito.contains(e.target)) {
            return;
        }
        ventanaCarrito.classList.remove("activo");
    });
});

// Función para agregar un producto al carrito o aumentar su cantidad si ya existe
function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    actualizarCarrito();
    
    // Abre la ventana automáticamente al agregar un producto
    const ventanaCarrito = document.querySelector(".Ventana");
    if (ventanaCarrito) {
        ventanaCarrito.classList.add("activo");
    }
}

// Función para sumar o restar cantidades desde los botones
function cambiarCantidad(nombre, cambio) {
    let index = carrito.findIndex(item => item.nombre === nombre);
    
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        
        // Si la cantidad baja a 0 o menos, se elimina por completo
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }
    actualizarCarrito();
}

// Función para eliminar un producto por completo
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

// Función para actualizar la vista de la lista, totales y contador en Lempiras
function actualizarCarrito() {
    const listaHTML = document.getElementById("listaProductos");
    const totalHTML = document.getElementById("totalPrecio");
    const contadorHTML = document.getElementById("contadorCarrito");
    
    if (!listaHTML) return;

    listaHTML.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        listaHTML.innerHTML = "<li>El carrito está vacío</li>";
        totalHTML.textContent = "L 0.00";
        contadorHTML.textContent = "0";
        return;
    }

    carrito.forEach((producto) => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        totalItems += producto.cantidad;

        let item = document.createElement("li");
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.marginBottom = "8px";

        item.innerHTML = `
            <span>${producto.nombre} (x${producto.cantidad})</span>
            <span>L ${subtotal.toFixed(2)}</span>
            <div>
                <button onclick="cambiarCantidad('${producto.nombre}', -1)" style="padding: 2px 6px; cursor:pointer;">-</button>
                <button onclick="cambiarCantidad('${producto.nombre}', 1)" style="padding: 2px 6px; cursor:pointer;">+</button>
                <button onclick="eliminarDelCarrito('${producto.nombre}')" style="padding: 2px 6px; background:#ff2a85; color:#fff; border:none; border-radius:3px; cursor:pointer;">X</button>
            </div>
        `;
        listaHTML.appendChild(item);
    });

    totalHTML.textContent = `L ${total.toFixed(2)}`;
    contadorHTML.textContent = totalItems;
}