import { PrismaClient } from "@prisma/client";

// Inyectamos la URL directamente para cumplir con el estándar moderno
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const getProducts = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    let whereClause = {};

    if (categoria) {
      whereClause = {
        category: {
          slug: categoria,
        },
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
