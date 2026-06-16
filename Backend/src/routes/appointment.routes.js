import { Router } from "express";
import {
  getAppointments,
  createAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

router.get("/appointments", getAppointments);
// Exponemos el endpoint para que el formulario pueda enviar datos
router.post("/appointments", createAppointment);

export default router;
