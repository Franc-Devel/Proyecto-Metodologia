import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    // Sumamos vehiclePlate a los datos que extraemos del frontend
    const { clientName, vehiclePlate, date, status } = req.body;

    const newAppointment = await prisma.appointment.create({
      data: {
        clientName,
        vehiclePlate, // <-- Se lo pasamos a Prisma para que lo guarde
        date: new Date(date),
        status: status || "pending",
      },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error al crear turno:", error);
    res.status(500).json({ error: "Error al registrar el turno" });
  }
};
