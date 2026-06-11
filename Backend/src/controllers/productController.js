import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    let whereClause = {};

    // Si el frontend envía la categoría, armamos el filtro
    if (categoria) {
      whereClause = {
        category: {
          slug: categoria,
        },
      };
    }

    // Buscamos los productos en la base de datos
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true, // Incluye la información de la categoría asociada
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
