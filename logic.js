let carrito = [];

// Inyectar estilos CSS, cargar datos y crear el Footer al iniciar el DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("¡El DOM cargó correctamente!");

    // 1. Recuperar el carrito guardado en localStorage si existe
    let carritoGuardado = localStorage.getItem("miCarritoHardware");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }

    // 2. Inyectar estilos CSS para la notificación flotante (Toast)
    const estilosToast = document.createElement("style");
    estilosToast.innerHTML = `
        .toast-notificacion {
            position: fixed;
            bottom: 20px;
            right: -300px;
            background: #180529;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            border: 1px solid #00ffff;
            box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
            font-family: sans-serif;
            z-index: 9999;
            transition: right 0.4s ease-in-out, opacity 0.4s ease;
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .toast-notificacion.mostrar {
            right: 20px;
            opacity: 1;
        }
        .toast-icono {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(estilosToast);

    // 3. Inyectar estilos CSS para la animación de brinco del contador
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

    // 4. Inyectar estilos CSS para el Footer Profesional
    const estilosFooter = document.createElement("style");
    estilosFooter.innerHTML = `
        .footer-tienda {
            background-color: #12031c;
            color: #b8b8b8;
            padding: 40px 20px 20px 20px;
            margin-top: 60px;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
            font-family: sans-serif;
            text-align: center;
        }
        .footer-contenido {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
            text-align: left;
        }
        .footer-columna h4 {
            color: #00ffff;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        .footer-columna p, .footer-columna a {
            color: #b8b8b8;
            font-size: 0.9rem;
            text-decoration: none;
            display: block;
            margin-bottom: 8px;
            transition: color 0.2s;
        }
        .footer-columna a:hover {
            color: #00ffff;
        }
        .footer-copy {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
            font-size: 0.85rem;
            color: #888;
        }
    `;
    document.head.appendChild(estilosFooter);

    // 5. Crear y añadir el Footer al final de la página completamente libre de emojis
    const footer = document.createElement("footer");
    footer.className = "footer-tienda";
    footer.innerHTML = `
        <div class="footer-contenido">
            <div class="footer-columna">
                <h4>Los Cheles .py</h4>
                <p>Tu tienda de confianza para armar el setup de tus sueños con los mejores componentes de hardware.</p>
            </div>
            <div class="footer-columna">
                <h4>Enlaces Rápidos</h4>
                <a href="index.html">Inicio</a>
                <a href="Historia.html">Historia</a>
                <a href="Contactos.html">Contactos</a>
                <a href="Creditos.html">Créditos</a>
                <a href="Reseñas.html">Reseñas</a>
            </div>
            <div class="footer-columna">
                <h4>¡Conéctate!</h4>
                <p>Disponible para todo el colegio</p>
                <p>Soporte técnico y preventas</p>
                <p>Todo al Cheque y 100% funcional</p>
            </div>
        </div>
        <div class="footer-copy">
            <p>&copy; 2026 Los Cheles .py — Todos los derechos reservados. La mejor pagina de 12vo</p>
        </div>
    `;
    document.body.appendChild(footer);

    // 6. Lógica para abrir/cerrar la ventana flotante del carrito
    const btnCarrito = document.getElementById("btnCarrito");
    const ventanaCarrito = document.querySelector(".Ventana");

    if (!btnCarrito || !ventanaCarrito) {
        console.error("Faltan elementos del carrito en el HTML.");
        return;
    }

    btnCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        ventanaCarrito.classList.toggle("activo");
    });

    ventanaCarrito.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    window.addEventListener("click", () => {
        if (ventanaCarrito.classList.contains("activo")) {
            ventanaCarrito.classList.remove("activo");
        }
    });
});

// Función para mostrar la notificación flotante (Toast)
function mostrarNotificacion(nombreProducto) {
    const toast = document.createElement("div");
    toast.className = "toast-notificacion";
    toast.innerHTML = `
        <span class="toast-icono">✅</span>
        <span>¡Agregaste <strong>${nombreProducto}</strong> al carrito!</span>
    `;

    document.body.appendChild(toast);
    void toast.offsetWidth; 
    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400); 
    }, 3000);
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    actualizarCarrito();
    
    const ventanaCarrito = document.querySelector(".Ventana");
    if (ventanaCarrito) {
        ventanaCarrito.classList.add("activo");
    }

    const contadorHTML = document.getElementById("contadorCarrito");
    if (contadorHTML) {
        contadorHTML.classList.remove("animar-brinco");
        void contadorHTML.offsetWidth; 
        contadorHTML.classList.add("animar-brinco");
        
        setTimeout(() => {
            contadorHTML.classList.remove("animar-brinco");
        }, 300);
    }

    mostrarNotificacion(nombre);
}

// Función para sumar o restar cantidades
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

// Función para vaciar todo el carrito de golpe
function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    if (confirm("¿Estás seguro de que quieres vaciar el carrito, papi?")) {
        carrito = [];
        localStorage.removeItem("miCarritoHardware");
        actualizarCarrito();
    }
}

// Función para renderizar el carrito, calcular totales y guardar en localStorage
function actualizarCarrito() {
    const listaHTML = document.getElementById("listaProductos");
    const totalHTML = document.getElementById("totalPrecio");
    const contadorHTML = document.getElementById("contadorCarrito");
    
    if (!listaHTML) return;

    listaHTML.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    let btnVaciarExistente = document.getElementById("btnVaciarCarrito");

    if (carrito.length === 0) {
        listaHTML.innerHTML = "<li>El carrito está vacío</li>";
        totalHTML.textContent = "L 0.00";
        contadorHTML.textContent = "0";
        localStorage.removeItem("miCarritoHardware");
        
        if (btnVaciarExistente) {
            btnVaciarExistente.style.display = "none";
        }
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
    localStorage.setItem("miCarritoHardware", JSON.stringify(carrito));

    const ventanaCarrito = document.querySelector(".Ventana");
    if (ventanaCarrito) {
        let btnVaciar = document.getElementById("btnVaciarCarrito");
        if (!btnVaciar) {
            btnVaciar = document.createElement("button");
            btnVaciar.id = "btnVaciarCarrito";
            btnVaciar.textContent = "🗑️ Vaciar Carrito";
            btnVaciar.style.cssText = `
                width: 100%;
                margin-top: 10px;
                padding: 8px;
                background: #ff2a85;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.2s;
            `;
            btnVaciar.addEventListener("click", vaciarCarrito);
            ventanaCarrito.appendChild(btnVaciar);
        } else {
            btnVaciar.style.display = "block";
        }
    }
}

// ==================== MODALES DE PAGO Y ÉXITO ====================

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

function cerrarModalPago() {
    const modal = document.getElementById("modalPago");
    if (modal) {
        modal.style.display = "none";
    }
}

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

    let detalleHTML = `
        <strong>Cliente:</strong> ${nombre}<br>
        <strong>Entrega:</strong> ${direccion}<br>
        <strong>Artículos:</strong> ${totalItems} producto(s)<br>
        <strong>Total pagado:</strong> L ${totalGeneral.toFixed(2)}<br><br>
        <span style="color: #00ffff;">¡Gracias por tu compra! Te enviaremos el comprobante pronto.</span>
    `;

    let textoDetalle = document.getElementById("textoDetalleExito");
    if (textoDetalle) {
        textoDetalle.innerHTML = detalleHTML;
    }

    cerrarModalPago();
    
    let modalExito = document.getElementById("modalExito");
    if (modalExito) {
        modalExito.style.display = "flex";
    }

    carrito = [];
    localStorage.removeItem("miCarritoHardware");
    actualizarCarrito();
    
    const ventanaCarrito = document.querySelector(".Ventana");
    if (ventanaCarrito) {
        ventanaCarrito.classList.remove("activo");
    }

    inputNombre.value = "";
    inputDireccion.value = "";
}

function cerrarExito() {
    const modalExito = document.getElementById("modalExito");
    if (modalExito) {
        modalExito.style.display = "none";
    }
}