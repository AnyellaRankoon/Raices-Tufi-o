// ==========================================
// RAÍCES TUFIÑO - JAVASCRIPT
// ==========================================


// ------- 1. MOSTRAR EL AÑO EN EL PIE DE PÁGINA -------
document.getElementById("year").textContent = new Date().getFullYear();


// ------- 2. MENSAJE EMERGENTE (TOAST) -------
function mostrarMensaje(texto) {
  let toast = document.getElementById("toast");
  toast.textContent = texto;
  toast.classList.add("show");

  // El mensaje se oculta después de 3 segundos
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}


// ------- 3. CAMBIAR DE PANTALLA -------
// Cada <section class="screen"> es una pantalla.
// Se muestra la que tiene el mismo id que el enlace (#inicio, #areas, etc.)
function mostrarPantalla() {
  let id = window.location.hash.replace("#", "");

  // Si no hay nada en la dirección, se muestra la bienvenida
  if (id === "") {
    id = "bienvenida";
  }

  let pantallas = document.querySelectorAll(".screen");
  let existe = false;

  for (let i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove("active");

    if (pantallas[i].id === id) {
      pantallas[i].classList.add("active");
      existe = true;
    }
  }

  // Si la pantalla no existe, regresamos al inicio
  if (existe === false) {
    document.getElementById("inicio").classList.add("active");
  }

  // Reproducir el video solo en la pantalla de bienvenida
  let video = document.getElementById("videoBienvenida");
  let linkVideo = "https://www.youtube.com/embed/SweBjFJZpzo?autoplay=1&mute=1&loop=1&playlist=SweBjFJZpzo&controls=0&rel=0";

  if (id === "bienvenida") {
    // Volver a cargar el video para que empiece desde el inicio
    if (video.src !== linkVideo) {
      video.src = linkVideo;
    }
  } else {
    // Quitar el video para que se detenga
    video.src = "about:blank";
  }

  // Cargar datos cuando se abren algunas pantallas del portal
  if (id === "perfil") {
    cargarPerfil();
  }
  if (id === "editar-perfil") {
    llenarFormularioPerfil();
  }
  if (id === "notificaciones") {
    mostrarPedidos();
  }

  // Cerrar el menú en celulares y subir al inicio de la página
  cerrarMenu();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", mostrarPantalla);
window.addEventListener("load", mostrarPantalla);


// ------- 4. MENÚ PARA CELULARES -------
let menuButton = document.getElementById("menuButton");
let navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("active");

  if (navigation.classList.contains("active")) {
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    menuButton.setAttribute("aria-expanded", "false");
  }
});

function cerrarMenu() {
  navigation.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
}


// ------- 5. INFORMACIÓN DE PRODUCTOS Y SERVICIOS -------
// EDITA AQUÍ LAS DESCRIPCIONES
let productos = {
  "Mermeladas": "Mermeladas artesanales preparadas con frutas cultivadas en Tufiño, sin conservantes artificiales y con poca azúcar.",
  "Pickles": "Encurtidos de pepinillo, cebolla, zanahoria y otras hortalizas, preparados con vinagre natural y especias para darle mucho más sabor.",
  "Snacks": "Bocaditos saludables como chips de papa, de haba y de frutas deshidratadas, ideales para la lonchera y antojos de media tarde.",
  "Frutos secos": "Ideales para algo ligero que puedesacompañar con yogurt, granola y cereal en tus mañanas.",
  "Hortalizas frescas": "Hortalizas cosechadas en los invernaderos agroecológicos de la parroquia de Tufiño, sin químicos y seguros para tu salud y de tu familia.",
};

let servicios = {
  "Pedidos a domicilio": "Haz tu pedido por la página o por WhatsApp y lo llevamos hasta tu casa en Tulcán y sus alrededores.",
  "Venta al por mayor": "Ofrecemos precios especiales para tiendas, restaurantes, cafeterías y ferias que quieran vender productos locales.",
  "Talleres de cocina sostenible": "Talleres prácticos para aprender a preparar conservas, mermeladas y pickles, y a reducir el desperdicio de alimentos."
};


// ------- 6. DETALLE DE PRODUCTO -------
let tarjetasProducto = document.querySelectorAll(".area-card");

for (let i = 0; i < tarjetasProducto.length; i++) {
  tarjetasProducto[i].addEventListener("click", function () {
    let nombre = this.getAttribute("data-area");
    abrirProducto(nombre);
  });
}

function abrirProducto(nombre) {
  document.getElementById("areaTitle").textContent = nombre;
  document.getElementById("areaDescription").textContent = productos[nombre];

  // También se selecciona el producto en el formulario de pedido
  let selectProducto = document.getElementById("appointmentArea");
  for (let i = 0; i < selectProducto.options.length; i++) {
    if (selectProducto.options[i].text === nombre) {
      selectProducto.selectedIndex = i;
    }
  }
}


// ------- 7. DETALLE DE SERVICIO -------
let tarjetasServicio = document.querySelectorAll(".service-card");

for (let i = 0; i < tarjetasServicio.length; i++) {
  tarjetasServicio[i].addEventListener("click", function () {
    let nombre = this.getAttribute("data-service");
    abrirServicio(nombre);
  });
}

function abrirServicio(nombre) {
  document.getElementById("serviceTitle").textContent = nombre;
  document.getElementById("serviceDescription").textContent = servicios[nombre];
}


// ------- 8. BÚSQUEDA -------
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let categoryFilter = document.getElementById("categoryFilter");
let searchResults = document.getElementById("searchResults");

function buscar() {
  let texto = searchInput.value.toLowerCase().trim();
  let categoria = categoryFilter.value;

  if (texto === "") {
    searchResults.innerHTML = "<p>Escribe una palabra para buscar información.</p>";
    return;
  }

  let html = "";
  let cantidad = 0;

  // Buscar en productos
  if (categoria === "all" || categoria === "area") {
    for (let nombre in productos) {
      let descripcion = productos[nombre];
      if (nombre.toLowerCase().includes(texto) || descripcion.toLowerCase().includes(texto)) {
        html += '<a href="#detalle-area" class="result-card" onclick="abrirProducto(\'' + nombre + '\')">';
        html += "<h3>" + nombre + "</h3>";
        html += "<p>Producto · " + descripcion + "</p>";
        html += "</a>";
        cantidad++;
      }
    }
  }

  // Buscar en servicios
  if (categoria === "all" || categoria === "service") {
    for (let nombre in servicios) {
      let descripcion = servicios[nombre];
      if (nombre.toLowerCase().includes(texto) || descripcion.toLowerCase().includes(texto)) {
        html += '<a href="#detalle-servicio" class="result-card" onclick="abrirServicio(\'' + nombre + '\')">';
        html += "<h3>" + nombre + "</h3>";
        html += "<p>Servicio · " + descripcion + "</p>";
        html += "</a>";
        cantidad++;
      }
    }
  }

  if (cantidad === 0) {
    searchResults.innerHTML = "<p>No se encontraron resultados para \"" + texto + "\".</p>";
  } else {
    searchResults.innerHTML = html;
  }
}

searchButton.addEventListener("click", buscar);
categoryFilter.addEventListener("change", buscar);

// Buscar también al presionar Enter
searchInput.addEventListener("keyup", function (evento) {
  if (evento.key === "Enter") {
    buscar();
  }
});


// ------- 9. FORMULARIO DE PEDIDO -------
// Los pedidos se guardan en el navegador con localStorage
let appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let pedido = {
    nombre: document.getElementById("appointmentName").value,
    telefono: document.getElementById("appointmentPhone").value,
    correo: document.getElementById("appointmentEmail").value,
    producto: document.getElementById("appointmentArea").value,
    fecha: document.getElementById("appointmentDate").value,
    detalle: document.getElementById("appointmentMessage").value
  };

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  document.getElementById("confirmationMessage").textContent =
    "Gracias " + pedido.nombre + ", registramos tu pedido de " + pedido.producto +
    " para el " + pedido.fecha + ". Pronto te contactaremos al " + pedido.telefono + ".";

  appointmentForm.reset();
  window.location.hash = "confirmacion";
});

// No permitir elegir una fecha que ya pasó
let hoy = new Date().toISOString().split("T")[0];
document.getElementById("appointmentDate").setAttribute("min", hoy);


// ------- 10. REGISTRO -------
let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let usuario = {
    nombre: document.getElementById("registerName").value,
    correo: document.getElementById("registerEmail").value,
    telefono: document.getElementById("registerPhone").value,
    clave: document.getElementById("registerPassword").value
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));
  localStorage.setItem("sesion", "activa");

  registerForm.reset();
  mostrarMensaje("¡Cuenta creada! Bienvenido " + usuario.nombre);
  window.location.hash = "portal";
});


// ------- 11. INICIAR SESIÓN -------
let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let correo = document.getElementById("loginEmail").value;
  let clave = document.getElementById("loginPassword").value;
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario === null) {
    mostrarMensaje("Primero debes crear una cuenta.");
    window.location.hash = "registro";
  } else if (usuario.correo === correo && usuario.clave === clave) {
    localStorage.setItem("sesion", "activa");
    loginForm.reset();
    mostrarMensaje("Hola de nuevo, " + usuario.nombre);
    window.location.hash = "portal";
  } else {
    mostrarMensaje("Correo o contraseña incorrectos.");
  }
});


// ------- 12. RECUPERAR CONTRASEÑA -------
let recoveryForm = document.getElementById("recoveryForm");

recoveryForm.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let correo = document.getElementById("recoveryEmail").value;
  mostrarMensaje("Enviamos las instrucciones a " + correo + " (demostración).");
  recoveryForm.reset();
  window.location.hash = "login";
});


// ------- 13. CERRAR SESIÓN -------
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.setItem("sesion", "inactiva");
  mostrarMensaje("Cerraste sesión.");
});


// ------- 14. PERFIL -------
function cargarPerfil() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario !== null) {
    document.getElementById("profileName").textContent = usuario.nombre;
    document.getElementById("profileEmail").textContent = usuario.correo;
    document.getElementById("profilePhone").textContent = usuario.telefono || "No registrado";
  }
}

function llenarFormularioPerfil() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario !== null) {
    document.getElementById("editName").value = usuario.nombre;
    document.getElementById("editEmail").value = usuario.correo;
    document.getElementById("editPhone").value = usuario.telefono;
  }
}

let profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  usuario.nombre = document.getElementById("editName").value;
  usuario.correo = document.getElementById("editEmail").value;
  usuario.telefono = document.getElementById("editPhone").value;

  localStorage.setItem("usuario", JSON.stringify(usuario));
  mostrarMensaje("Datos guardados correctamente.");
  window.location.hash = "perfil";
});


// ------- 15. NOTIFICACIONES (MIS PEDIDOS) -------
function mostrarPedidos() {
  let lista = document.getElementById("ordersList");
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    lista.innerHTML = "<p>Todavía no tienes pedidos registrados.</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < pedidos.length; i++) {
    html += '<div class="order-item">';
    html += "<strong>" + pedidos[i].producto + "</strong>";
    html += "<p>Entrega: " + pedidos[i].fecha + " · Estado: en preparación</p>";
    html += "</div>";
  }
  lista.innerHTML = html;
}


// ------- 16. CONFIGURACIÓN -------
let noticePreference = document.getElementById("noticePreference");

// Recordar la opción elegida
if (localStorage.getItem("novedades") === "no") {
  noticePreference.checked = false;
}

noticePreference.addEventListener("change", function () {
  if (noticePreference.checked) {
    localStorage.setItem("novedades", "si");
    mostrarMensaje("Recibirás novedades de temporada.");
  } else {
    localStorage.setItem("novedades", "no");
    mostrarMensaje("Ya no recibirás novedades.");
  }
});