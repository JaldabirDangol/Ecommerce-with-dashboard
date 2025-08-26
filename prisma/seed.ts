// prisma/seed.ts
import { PrismaClient, Prisma, OrderStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting data seeding...');

  const usersToCreate = 10;
  const categoriesToCreate = 5;
  const productsToCreate = 50;

  // Clear existing data
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < usersToCreate; i++) {
    users.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      phoneNumber: faker.phone.number(),
      password: faker.internet.password(),
      role: i === 0 ? 'ADMIN' : 'USER',
      cartItem: { create: {} },
    });
  }

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      const createdUser = await prisma.user.create({ data: user });

      const address = await prisma.address.create({
        data: {
          userId: createdUser.id,
          fullName: createdUser.name || '',
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          postal: faker.location.zipCode(),
          country: faker.location.country(),
          phone: createdUser.phoneNumber || '',
        },
      });

      return prisma.user.update({
        where: { id: createdUser.id },
        data: {
          defaultAddress: { connect: { id: address.id } },
          shippingAddress: { connect: { id: address.id } },
        },
      });
    })
  );

  console.log(`Created ${createdUsers.length} users with addresses.`);

  // Create categories
  const categories: Prisma.ProductCategoryCreateInput[] = [];
  for (let i = 0; i < categoriesToCreate; i++) {
    categories.push({
      name: faker.commerce.department(),
      image: faker.image.urlLoremFlickr({ category: 'fashion' }),
      slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
    });
  }
  const createdCategories = await prisma.productCategory.createMany({ data: categories, skipDuplicates: true });
  console.log(`Created ${createdCategories.count} product categories.`);

  const existingCategories = await prisma.productCategory.findMany();
  if (existingCategories.length === 0) {
    console.error('No categories found. Cannot create products.');
    return;
  }

  // Create products
  const products: Prisma.ProductCreateManyInput[] = [];
  for (let i = 0; i < productsToCreate; i++) {
    const randomCategory = faker.helpers.arrayElement(existingCategories);
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
      stock: faker.number.int({ min: 0, max: 200 }),
      brand: faker.company.name(),
      warrenty: '1 Year Limited',
      dimensions: '10x10x10 cm',
      images: [faker.image.urlLoremFlickr({ category: 'product' }), faker.image.urlLoremFlickr({ category: 'product' })],
      colorOptions: ['red', 'blue', 'green'],
      weight: '500g',
      material: faker.commerce.productMaterial(),
      categoryId: randomCategory.name, // important for createMany
    });
  }

  const createdProducts = await prisma.product.createMany({ data: products });
  console.log(`Created ${createdProducts.count} products.`);

  const allUsers = await prisma.user.findMany();
  const allProducts = await prisma.product.findMany();

  // Create orders, payments, reviews, wishlist
  for (const user of allUsers) {
    const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];
    const numItems = faker.number.int({ min: 1, max: 5 });
    let total = 0;

    for (let i = 0; i < numItems; i++) {
      const randomProduct = faker.helpers.arrayElement(allProducts);
      const quantity = faker.number.int({ min: 1, max: 3 });
      const priceAtPurchase = randomProduct.price;
      total += priceAtPurchase * quantity;

      orderItems.push({
        product: { connect: { id: randomProduct.id } },
        quantity,
        priceAtPurchase,
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
        total,
        items: { create: orderItems },
      },
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        method: faker.finance.transactionType(),
        status: faker.helpers.arrayElement(['success', 'failed']),
        amount: order.total,
      },
    });

    await prisma.review.create({
      data: {
        userId: user.id,
        productId: faker.helpers.arrayElement(allProducts).id,
        rating: faker.number.int({ min: 1, max: 5 }),
        description: faker.lorem.sentence(),
      },
    });

    const wishlist = await prisma.wishlist.create({
      data: { userId: user.id },
    });

    const numWishlistItems = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numWishlistItems; i++) {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId: faker.helpers.arrayElement(allProducts).id,
        },
      });
    }
  }

  console.log('Seeding complete! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
