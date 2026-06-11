// src/routes/appointment.routes.js
import { Router } from "express";
import { getAppointments } from "../controllers/appointmentController.js";

const router = Router();
router.get("/appointments", getAppointments);

export default router;
