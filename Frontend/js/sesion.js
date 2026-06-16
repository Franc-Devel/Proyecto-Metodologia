const API_URL_LOGIN = "http://localhost:3000/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById("btn-submit");
      const alerta = document.getElementById("alerta-login");

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Ingresando...`;
      alerta.className = "alert d-none";

      try {
        const respuesta = await fetch(API_URL_LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(data.error || "Credenciales incorrectas");
        }

        // AGREGADO: Guardamos los datos en el navegador
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alerta.className = "alert alert-success mt-4";
        alerta.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ¡Bienvenido! Ingresando al sistema...`;

        // Redirige al inicio después de un segundo y medio
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      } catch (error) {
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i> ${error.message}`;
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "Ingresar";
      }
    });
  }
});
