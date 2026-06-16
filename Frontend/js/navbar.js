document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LÓGICA DEL MENÚ DE USUARIO ---
  const menuUsuario = document.getElementById("menu-usuario");
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  // Función para saber si estamos en la raíz o en la carpeta /pages/
  const isInPages = window.location.pathname.includes("/pages/");
  const pathPrefix = isInPages ? "" : "pages/";
  const indexPrefix = isInPages ? "../" : "";

  // VERIFICACIÓN CLAVE: Solo ejecutamos esto si el menú existe en la página
  if (menuUsuario) {
    if (token && userStr) {
      // Si está LOGUEADO
      const user = JSON.parse(userStr);
      menuUsuario.innerHTML = `
        <li><h6 class="dropdown-header text-uppercase custom-text-primary fw-bold">Hola, ${user.name.split(" ")[0]}</h6></li>
        <li><a class="dropdown-item" href="${pathPrefix}turnos.html"><i class="bi bi-calendar-check me-2"></i>Mis Turnos</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger fw-bold cursor-pointer" id="btn-logout"><i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</a></li>
      `;

      // Acción de cerrar sesión
      document.getElementById("btn-logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload(); // Recargamos para que vuelva al estado normal
      });
    } else {
      // Si NO está LOGUEADO
      menuUsuario.innerHTML = `
        <li><a class="dropdown-item" href="${pathPrefix}sesion.html"><i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión</a></li>
        <li><a class="dropdown-item" href="${pathPrefix}registro.html"><i class="bi bi-person-plus me-2"></i>Registrarse</a></li>
      `;
    }
  }

  // --- 2. LÓGICA DEL BUSCADOR ---
  const formBuscador = document.getElementById("form-buscador");
  if (formBuscador) {
    formBuscador.addEventListener("submit", (e) => {
      e.preventDefault();
      const termino = document.getElementById("input-buscador").value.trim();

      if (termino) {
        // Redirigimos al inicio pasándole la palabra clave en la URL
        window.location.href = `${indexPrefix}index.html?q=${encodeURIComponent(termino)}`;
      }
    });
  }
});
