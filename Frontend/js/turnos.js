const API_URL_TURNOS = "http://localhost:3000/api/appointments";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-turno");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById("btn-submit");
      const alerta = document.getElementById("alerta-turno");

      // Recolectamos los datos
      const clientName = document.getElementById("clientName").value.trim();
      const dominio = document.getElementById("dominio").value.trim(); // <-- CAPTURAMOS LA PATENTE
      const date = document.getElementById("date").value;
      const status = "pending";

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Procesando...`;
      alerta.className = "alert d-none";

      try {
        const respuesta = await fetch(API_URL_TURNOS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName: clientName,
            vehiclePlate: dominio, // <-- ENVIAMOS LA PATENTE AL BACKEND
            date: new Date(date).toISOString(),
            status: status,
          }),
        });

        if (!respuesta.ok) {
          throw new Error("No se pudo registrar el turno en la base de datos.");
        }

        alerta.className = "alert alert-success mt-3";
        alerta.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>¡Turno confirmado para <strong>${clientName}</strong> (Patente: ${dominio})! Te esperamos.`;
        form.reset();
      } catch (error) {
        console.error("Error al agendar:", error);
        alerta.className = "alert alert-danger mt-3";
        alerta.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i>Ocurrió un error al procesar tu reserva. Asegurate de que el servidor esté encendido.`;
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "Confirmar Reserva";
      }
    });
  }
});
