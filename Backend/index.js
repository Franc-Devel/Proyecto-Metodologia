import express from "express";
import cors from "cors";

// Importación de rutas
import productRoutes from "./src/routes/product.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES
// ==========================================
// Habilita peticiones cruzadas (CORS) para que tu HTML local pueda consumir la API
app.use(cors());
// Permite que el backend entienda los datos JSON que le envíe el frontend
app.use(express.json());

// ==========================================
// RUTAS
// ==========================================
app.use("/api", productRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", paymentRoutes);

// Ruta base de comprobación
app.get("/", (req, res) => {
  res.send("API del Sistema de Lubricentro funcionando correctamente 🚀");
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(
    `👉 Endpoint de catálogo listo en: http://localhost:${PORT}/api/productos`,
  );
});
