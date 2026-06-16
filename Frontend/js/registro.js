// Apuntamos al endpoint de registro en tu API local
const API_URL_REGISTRO = "http://localhost:3000/api/auth/register";

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", async (e) => {
      e.preventDefault(); // Evitamos que la página recargue al hacer submit

      // 1. Capturamos los elementos de la interfaz
      const btnSubmit = document.getElementById("btn-submit");
      const alerta = document.getElementById("alerta-registro");

      // 2. Extraemos los valores de los inputs
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value.trim();
      const vehicleModel = document.getElementById("vehicleModel").value.trim();

      // 3. Cambiamos el estado visual a "Cargando"
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Procesando...`;
      alerta.className = "alert d-none"; // Ocultamos alertas previas

      try {
        // 4. Hacemos la petición POST al backend
        const respuesta = await fetch(API_URL_REGISTRO, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            vehicleModel,
          }),
        });

        const data = await respuesta.json();

        // 5. Verificamos si hubo un error del lado del servidor (ej: correo ya registrado)
        if (!respuesta.ok) {
          throw new Error(data.error || "Error al registrar el usuario");
        }

        // 6. Éxito: Mostramos mensaje verde y limpiamos formulario
        alerta.className = "alert alert-success mt-4";
        alerta.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${data.message}`;
        formRegistro.reset();

        // Opcional: Redirigir al login después de unos segundos
        // setTimeout(() => { window.location.href = "login.html"; }, 3000);
      } catch (error) {
        console.error("Error en registro:", error);

        // 7. Error: Mostramos mensaje rojo con el motivo exacto
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i> ${error.message}`;
      } finally {
        // 8. Restauramos el botón a su estado original
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "Registrarme";
      }
    });
  }
});
