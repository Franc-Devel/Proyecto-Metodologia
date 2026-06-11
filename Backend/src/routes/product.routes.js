import { Router } from "express";
import { getProducts } from "../controllers/productController.js";

const router = Router();

// Endpoint: GET /api/productos
// Endpoint con filtro: GET /api/productos?categoria=aceites
router.get("/productos", getProducts);

export default router;
