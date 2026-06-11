import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1. Crear Categorías
  const aceites = await prisma.category.upsert({
    where: { slug: "aceites" },
    update: {},
    create: { name: "Aceites", slug: "aceites" },
  });

  const combustibles = await prisma.category.upsert({
    where: { slug: "combustibles" },
    update: {},
    create: { name: "Combustibles", slug: "combustibles" },
  });

  // 2. Crear Productos
  await prisma.product.createMany({
    data: [
      {
        name: "Aceite 10w40 Semisintético",
        presentation: "4x4L",
        price: 45000,
        stock: 24,
        categoryId: aceites.id,
      },
      {
        name: "Aceite 5w30 Sintético",
        presentation: "4x4L",
        price: 62000,
        stock: 12,
        categoryId: aceites.id,
      },
      {
        name: "Limpia Inyectores Nafta Ultra Conc.",
        presentation: "12x330ml",
        price: 8500,
        stock: 36,
        categoryId: combustibles.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Catálogo base de Bardahl cargado con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
