// Apuntamos al endpoint de creación de turnos de tu API
const API_URL_TURNOS = "http://localhost:3000/api/appointments";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-turno");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Elementos de UI
    const btnSubmit = document.getElementById("btn-submit");
    const alerta = document.getElementById("alerta-turno");

    // Recolectamos los datos
    const clientName = document.getElementById("clientName").value.trim();
    const date = document.getElementById("date").value;
    const status = "pending"; // Estado por defecto para nuevos turnos

    // Estado de carga visual
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Procesando...`;
    alerta.className = "alert d-none"; // Ocultamos alertas previas

    try {
      const respuesta = await fetch(API_URL_TURNOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: clientName,
          date: new Date(date).toISOString(), // Formateamos para que Prisma lo entienda
          status: status,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo registrar el turno en la base de datos.");
      }

      // Exito
      alerta.className = "alert alert-success mt-3";
      alerta.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>¡Turno confirmado para <strong>${clientName}</strong>! Te esperamos.`;
      form.reset(); // Limpiamos el formulario
    } catch (error) {
      console.error("Error al agendar:", error);
      // Error visual
      alerta.className = "alert alert-danger mt-3";
      alerta.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i>Ocurrió un error al procesar tu reserva. Asegurate de que el servidor esté encendido.`;
    } finally {
      // Restauramos el botón
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = "Confirmar Reserva";
    }
  });
});
