import { prisma } from "./src/lib/db";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function updateSlugsForOldCategories() {
  const categoriesWithoutSlug = await prisma.productCategory.findMany({
    where: {
      OR: [
        { slug: null },
        { slug: "" },
      ],
    },
  });

  for (const category of categoriesWithoutSlug) {
    const slug = generateSlug(category.name);

    // Optional: Check slug uniqueness, or add category.id suffix if needed

    await prisma.productCategory.update({
      where: { id: category.id },
      data: { slug },
    });

    console.log(`Updated slug for category: ${category.name}`);
  }
}

updateSlugsForOldCategories()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    prisma.$disconnect();
  });
