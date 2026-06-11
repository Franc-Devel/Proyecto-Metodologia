import fs from "fs";
import path from "path";

const baseDirs = ["src/controllers", "src/routes", "src/middlewares"];

// Estructura de archivos base necesarios para tu nuevo sistema
const filesToCreate = [
  {
    path: "src/controllers/appointmentController.js",
    content: "// Controlador de turnos",
  },
  {
    path: "src/controllers/paymentController.js",
    content: "// Controlador de pagos",
  },
  {
    path: "src/routes/appointment.routes.js",
    content:
      'import { Router } from "express";\nconst router = Router();\nexport default router;',
  },
  {
    path: "src/routes/payment.routes.js",
    content:
      'import { Router } from "express";\nconst router = Router();\nexport default router;',
  },
];

baseDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Carpeta creada: ${dir}`);
  }
});

filesToCreate.forEach((file) => {
  if (!fs.existsSync(file.path)) {
    fs.writeFileSync(file.path, file.content);
    console.log(`📄 Archivo creado: ${file.path}`);
  }
});

console.log("🚀 Estructura de directorios inicializada correctamente.");
