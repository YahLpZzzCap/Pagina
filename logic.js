let carrito = [];

// Inyectar los estilos de la animación del contador automáticamente
document.addEventListener("DOMContentLoaded", () => {
    console.log("¡El DOM cargó correctamente!");

    const estiloAnimacion = document.createElement("style");
    estiloAnimacion.innerHTML = `
        @keyframes brincoCarrito {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); color: #00ffff; }
            100% { transform: scale(1); }
        }
        .animar-brinco {
            display: inline-block !important;
            animation: brincoCarrito 0.3s ease !important;
        }
    `;
    document.head.appendChild(estiloAnimacion);

    const btnCarrito = document.getElementById("btnCarrito");
    const ventanaCarrito = document.querySelector(".Ventana");

    if (!btnCarrito || !ventanaCarrito) {
        console.error("Faltan elementos del carrito en el HTML.");
        return;
    }

    // Evento para abrir y cerrar la ventana con el botón principal del carrito
    btnCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        ventanaCarrito.classList.toggle("activo");
    });

    // Evita que cualquier clic DENTRO de la ventana cierre el carrito
    ventanaCarrito.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Cerrar la ventana si haces clic fuera de ella
    window.addEventListener("click", () => {
        if (ventanaCarrito.classList.contains("activo")) {
            ventanaCarrito.classList.remove("activo");
        }
    });
});

// Función para agregar un producto al carrito o aumentar su cantidad
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

    // Animación del contador
    const contadorHTML = document.getElementById("contadorCarrito");
    if (contadorHTML) {
        contadorHTML.classList.remove("animar-brinco");
        void contadorHTML.offsetWidth; 
        contadorHTML.classList.add("animar-brinco");
        
        setTimeout(() => {
            contadorHTML.classList.remove("animar-brinco");
        }, 300);
    }
}

// Función para sumar o restar cantidades desde los botones
function cambiarCantidad(nombre, cambio) {
    let index = carrito.findIndex(item => item.nombre === nombre);
    
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        
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

// ==================== FUNCIONES DE LOS MODALES DE PAGO Y ÉXITO ====================

// Abrir la ventana modal de datos de pago
function abrirModalPago() {
    if (carrito.length === 0) {
        alert("¡El carrito está vacío, papi! Agrega productos antes de pagar.");
        return;
    }
    const modal = document.getElementById("modalPago");
    if (modal) {
        modal.style.display = "flex"; 
    }
}

// Cerrar la ventana modal de pago
function cerrarModalPago() {
    const modal = document.getElementById("modalPago");
    if (modal) {
        modal.style.display = "none";
    }
}

// Simular el éxito de la compra de forma limpia y profesional
function confirmarCompraColegio() {
    let inputNombre = document.getElementById("nombreCliente");
    let inputDireccion = document.getElementById("direccionCliente");

    if (!inputNombre || !inputDireccion) {
        console.error("No se encontraron los inputs del cliente en el HTML.");
        return;
    }

    let nombre = inputNombre.value.trim();
    let direccion = inputDireccion.value.trim();

    if (nombre === "" || direccion === "") {
        alert("¡Ey! Por favor completa los campos para continuar.");
        return;
    }

    let totalGeneral = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    let totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    // Armar el detalle para el recibo profesional
    let detalleHTML = `
        <strong>Cliente:</strong> ${nombre}<br>
        <strong>Entrega:</strong> ${direccion}<br>
        <strong>Artículos:</strong> ${totalItems} producto(s)<br>
        <strong>Total pagado:</strong> L ${totalGeneral.toFixed(2)}<br><br>
        <span style="color: #00ffff;">¡Gracias por tu compra, todo al tiro! 🚀 Te enviaremos el comprobante pronto.</span>
    `;

    let textoDetalle = document.getElementById("textoDetalleExito");
    if (textoDetalle) {
        textoDetalle.innerHTML = detalleHTML;
    }

    // Cerrar el modal de datos y mostrar el modal de éxito
    cerrarModalPago();
    
    let modalExito = document.getElementById("modalExito");
    if (modalExito) {
        modalExito.style.display = "flex";
    } else {
        console.error("No se encontró el elemento #modalExito en el HTML.");
    }

    // Vaciar el carrito y limpiar la vista
    carrito = [];
    actualizarCarrito();
    
    const ventanaCarrito = document.querySelector(".Ventana");
    if (ventanaCarrito) {
        ventanaCarrito.classList.remove("activo");
    }

    // Limpiar inputs
    inputNombre.value = "";
    inputDireccion.value = "";
}

// Cerrar la ventana de éxito final
function cerrarExito() {
    const modalExito = document.getElementById("modalExito");
    if (modalExito) {
        modalExito.style.display = "none";
    }
}