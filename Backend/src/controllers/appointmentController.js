// Controlador de turnosimport { prisma } from "../db.js"; // Asumiendo que reutilizas tu conexión

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};
