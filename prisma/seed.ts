import { PrismaClient, OrderStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ─── helpers ────────────────────────────────────────────────────────────────

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

// ─── categories ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  {
    name: "Audio",
    slug: "audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    name: "Cameras",
    slug: "cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  },
  {
    name: "Gaming",
    slug: "gaming",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80",
  },
  {
    name: "Wearables",
    slug: "wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  },
  {
    name: "Monitors",
    slug: "monitors",
    image:
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1625695197124-6e1d3d936f80?w=400&q=80",
  },
];

// ─── products ────────────────────────────────────────────────────────────────

const PRODUCTS = [
  // Electronics
  {
    name: "MacBook Pro 16-inch M3",
    category: "Electronics",
    price: 249999,
    stock: 15,
    brand: "Apple",
    rating: 4.9,
    description:
      "The most powerful MacBook Pro ever. With M3 chip, up to 22 hours battery life, and a stunning Liquid Retina XDR display.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
    ],
    colorOptions: ["Space Black", "Silver"],
    weight: "2.14 kg",
    dimensions: "35.57 × 24.81 × 1.68 cm",
    material: "Aluminum",
    warrenty: "1 year Apple warranty",
  },
  {
    name: "Dell XPS 15 OLED",
    category: "Electronics",
    price: 189999,
    stock: 10,
    brand: "Dell",
    rating: 4.7,
    description:
      "Premium laptop with 3.5K OLED display, Intel Core i9, and NVIDIA RTX 4070. Perfect for creators and developers.",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
    colorOptions: ["Platinum Silver"],
    weight: "1.86 kg",
    dimensions: "34.4 × 23.0 × 1.8 cm",
    material: "Carbon Fiber, Aluminum",
    warrenty: "1 year Dell warranty",
  },
  {
    name: "iPad Pro 13-inch M4",
    category: "Electronics",
    price: 119999,
    stock: 25,
    brand: "Apple",
    rating: 4.8,
    description:
      "Ultra-thin, incredibly powerful. With Apple M4 chip and stunning Ultra Retina XDR display with nano-texture glass.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    ],
    colorOptions: ["Space Black", "Silver"],
    weight: "682 g",
    dimensions: "28.1 × 21.5 × 0.51 cm",
    material: "Aluminum, Glass",
    warrenty: "1 year Apple warranty",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    category: "Electronics",
    price: 139999,
    stock: 30,
    brand: "Samsung",
    rating: 4.7,
    description:
      "The ultimate Galaxy experience with a 200MP camera, built-in S Pen, and Snapdragon 8 Elite processor.",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    ],
    colorOptions: ["Titanium Black", "Titanium Gray", "Titanium Blue"],
    weight: "218 g",
    dimensions: "16.26 × 7.94 × 0.85 cm",
    material: "Titanium, Gorilla Glass Armor",
    warrenty: "1 year Samsung warranty",
  },

  // Audio
  {
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 34999,
    stock: 40,
    brand: "Sony",
    rating: 4.9,
    description:
      "Industry-leading noise cancellation with 30 hours battery life, multipoint connection, and crystal-clear hands-free calling.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    ],
    colorOptions: ["Black", "Silver"],
    weight: "250 g",
    dimensions: "Foldable",
    material: "Plastic, Synthetic leather",
    warrenty: "1 year Sony warranty",
  },
  {
    name: "Apple AirPods Pro 2nd Gen",
    category: "Audio",
    price: 27999,
    stock: 60,
    brand: "Apple",
    rating: 4.8,
    description:
      "Active Noise Cancellation, Transparency mode, Adaptive Audio, and personalized Spatial Audio with up to 30 hours total listening time.",
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
    ],
    colorOptions: ["White"],
    weight: "5.3 g per earbud",
    dimensions: "Compact case",
    material: "Plastic",
    warrenty: "1 year Apple warranty",
  },
  {
    name: "Bose QuietComfort 45",
    category: "Audio",
    price: 29999,
    stock: 35,
    brand: "Bose",
    rating: 4.7,
    description:
      "Legendary Bose noise cancellation. TriPort acoustic architecture, 24-hour battery, and premium comfort for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e736bf3e90?w=600&q=80",
    ],
    colorOptions: ["Black", "White Smoke"],
    weight: "238 g",
    dimensions: "Foldable",
    material: "Plastic, Protein leather",
    warrenty: "1 year Bose warranty",
  },
  {
    name: "JBL Flip 6 Speaker",
    category: "Audio",
    price: 12999,
    stock: 50,
    brand: "JBL",
    rating: 4.6,
    description:
      "Portable Bluetooth speaker with bold JBL Pro Sound, powerful bass via racetrack-shaped woofer, 12 hours playtime, IP67 waterproof.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    ],
    colorOptions: ["Black", "Blue", "Red", "Teal"],
    weight: "540 g",
    dimensions: "17.8 × 7.0 × 7.0 cm",
    material: "Fabric, Plastic",
    warrenty: "1 year JBL warranty",
  },

  // Cameras
  {
    name: "Sony Alpha A7 IV",
    category: "Cameras",
    price: 259999,
    stock: 8,
    brand: "Sony",
    rating: 4.9,
    description:
      "Full-frame mirrorless with 33MP BSI-CMOS sensor, 4K 60fps video, real-time tracking, and 10fps burst shooting.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    ],
    colorOptions: ["Black"],
    weight: "658 g",
    dimensions: "13.16 × 9.6 × 7.98 cm",
    material: "Magnesium alloy",
    warrenty: "1 year Sony warranty",
  },
  {
    name: "Canon EOS R6 Mark II",
    category: "Cameras",
    price: 199999,
    stock: 12,
    brand: "Canon",
    rating: 4.8,
    description:
      "40fps RAW burst, 6K oversampled 4K video, Dual Pixel CMOS AF II with subject tracking. The ultimate hybrid camera.",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    ],
    colorOptions: ["Black"],
    weight: "588 g",
    dimensions: "13.82 × 9.76 × 8.28 cm",
    material: "Magnesium alloy",
    warrenty: "1 year Canon warranty",
  },

  // Gaming
  {
    name: "PlayStation 5 Console",
    category: "Gaming",
    price: 59999,
    stock: 20,
    brand: "Sony",
    rating: 4.9,
    description:
      "Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and stunning 4K/120fps gaming.",
    images: [
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
    ],
    colorOptions: ["White"],
    weight: "3.9 kg",
    dimensions: "38.0 × 10.4 × 26.0 cm",
    material: "Plastic",
    warrenty: "1 year Sony warranty",
  },
  {
    name: "Xbox Series X",
    category: "Gaming",
    price: 54999,
    stock: 18,
    brand: "Microsoft",
    rating: 4.8,
    description:
      "World's most powerful console. 12 teraflops, 4K gaming at up to 120fps, 1TB custom NVMe SSD, and Xbox Game Pass ready.",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80",
    ],
    colorOptions: ["Carbon Black"],
    weight: "4.45 kg",
    dimensions: "30.1 × 15.1 × 15.1 cm",
    material: "Plastic",
    warrenty: "1 year Microsoft warranty",
  },
  {
    name: "Razer DeathAdder V3 Pro",
    category: "Gaming",
    price: 14999,
    stock: 45,
    brand: "Razer",
    rating: 4.7,
    description:
      "Ultra-lightweight wireless gaming mouse at 64g, 30K DPI optical sensor, 90-hour battery life, 8 programmable buttons.",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    ],
    colorOptions: ["Black", "White"],
    weight: "64 g",
    dimensions: "12.8 × 6.77 × 4.4 cm",
    material: "Plastic",
    warrenty: "2 year Razer warranty",
  },
  {
    name: "SteelSeries Arctis Nova Pro",
    category: "Gaming",
    price: 34999,
    stock: 30,
    brand: "SteelSeries",
    rating: 4.6,
    description:
      "Premium multi-system gaming headset with Active Noise Cancellation, hot-swap battery system, and Hi-Res audio certification.",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80",
    ],
    colorOptions: ["Black", "White"],
    weight: "338 g",
    dimensions: "Standard",
    material: "Aluminum, Foam",
    warrenty: "1 year SteelSeries warranty",
  },

  // Wearables
  {
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    price: 89999,
    stock: 22,
    brand: "Apple",
    rating: 4.9,
    description:
      "The most rugged and capable Apple Watch. Titanium case, 36-hour battery, precision dual-frequency GPS, and 100m water resistance.",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
    ],
    colorOptions: ["Natural Titanium", "Black Titanium"],
    weight: "61.4 g",
    dimensions: "49 mm",
    material: "Grade 5 Titanium",
    warrenty: "1 year Apple warranty",
  },
  {
    name: "Samsung Galaxy Watch 7",
    category: "Wearables",
    price: 39999,
    stock: 35,
    brand: "Samsung",
    rating: 4.6,
    description:
      "Advanced health monitoring with BioActive sensor, body composition, sleep coaching, and 40-hour battery life.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ],
    colorOptions: ["Green", "Cream", "Silver"],
    weight: "28.8 g",
    dimensions: "44mm / 40mm",
    material: "Aluminum, Sapphire Crystal",
    warrenty: "1 year Samsung warranty",
  },
  {
    name: "Fitbit Charge 6",
    category: "Wearables",
    price: 14999,
    stock: 55,
    brand: "Fitbit",
    rating: 4.4,
    description:
      "Built-in Google Maps, ECG app, YouTube Music controls, real-time workout intensity, 7-day battery life.",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    ],
    colorOptions: ["Black", "Porcelain", "Coral"],
    weight: "22 g",
    dimensions: "Slim band",
    material: "Aluminium case",
    warrenty: "1 year Fitbit warranty",
  },

  // Monitors
  {
    name: "LG UltraWide 34GP950G",
    category: "Monitors",
    price: 89999,
    stock: 12,
    brand: "LG",
    rating: 4.8,
    description:
      "34-inch UltraWide QHD Nano IPS display with 1ms response time, 144Hz, NVIDIA G-SYNC, and HDR600 for peak gaming performance.",
    images: [
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80",
    ],
    colorOptions: ["Black"],
    weight: "8.7 kg",
    dimensions: "81.4 × 36.0 × 29.7 cm",
    material: "Plastic, Metal stand",
    warrenty: "3 year LG warranty",
  },
  {
    name: "Dell UltraSharp U2723DE",
    category: "Monitors",
    price: 69999,
    stock: 15,
    brand: "Dell",
    rating: 4.7,
    description:
      "27-inch 4K USB-C Hub monitor with IPS Black technology, 2000:1 contrast ratio, built-in KVM, and 90W USB-C charging.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    ],
    colorOptions: ["Black"],
    weight: "6.6 kg",
    dimensions: "61.1 × 21.2 × 51.9 cm",
    material: "Plastic",
    warrenty: "3 year Dell warranty",
  },
  {
    name: "Samsung Odyssey G9 OLED",
    category: "Monitors",
    price: 149999,
    stock: 8,
    brand: "Samsung",
    rating: 4.9,
    description:
      "49-inch OLED curved gaming monitor with 240Hz, 0.03ms GtG, true HDR, and Dual QHD resolution for the ultimate ultrawide experience.",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c228b17a5d?w=600&q=80",
    ],
    colorOptions: ["White"],
    weight: "16.5 kg",
    dimensions: "113.3 × 51.9 × 28.9 cm",
    material: "Plastic",
    warrenty: "1 year Samsung warranty",
  },

  // Accessories
  {
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 9999,
    stock: 80,
    brand: "Logitech",
    rating: 4.8,
    description:
      "Advanced wireless mouse for power users. 8000 DPI, MagSpeed electromagnetic scroll wheel, quiet clicks, multi-device pairing.",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    ],
    colorOptions: ["Graphite", "Pale Gray", "Black"],
    weight: "141 g",
    dimensions: "12.4 × 8.4 × 5.1 cm",
    material: "Plastic, Rubber grip",
    warrenty: "2 year Logitech warranty",
  },
  {
    name: "Keychron Q1 Pro Keyboard",
    category: "Accessories",
    price: 17999,
    stock: 25,
    brand: "Keychron",
    rating: 4.7,
    description:
      "75% layout wireless mechanical keyboard with gasket mount, QMK/VIA support, Gateron G Pro switches, and CNC aluminum body.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    ],
    colorOptions: ["Carbon Black", "Carbon Gray"],
    weight: "1.3 kg",
    dimensions: "32.8 × 14.1 × 3.4 cm",
    material: "CNC Aluminum",
    warrenty: "1 year Keychron warranty",
  },
  {
    name: "Anker 737 GaNPrime Charger",
    category: "Accessories",
    price: 6999,
    stock: 100,
    brand: "Anker",
    rating: 4.6,
    description:
      "120W 3-port GaN charger with PowerIQ 4.0, can charge MacBook Pro at full speed while simultaneously charging two more devices.",
    images: [
      "https://images.unsplash.com/photo-1625695197124-6e1d3d936f80?w=600&q=80",
    ],
    colorOptions: ["Black"],
    weight: "230 g",
    dimensions: "7.2 × 6.5 × 4.0 cm",
    material: "Polycarbonate",
    warrenty: "18 month Anker warranty",
  },
  {
    name: "Elgato Stream Deck MK.2",
    category: "Accessories",
    price: 15999,
    stock: 30,
    brand: "Elgato",
    rating: 4.7,
    description:
      "15 LCD keys, fully customizable with icons and actions, one-touch control of streaming tools, apps, and audio.",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c228b17a5d?w=600&q=80",
    ],
    colorOptions: ["Black", "White"],
    weight: "220 g",
    dimensions: "11.8 × 8.4 × 2.3 cm",
    material: "Plastic",
    warrenty: "2 year Elgato warranty",
  },
];

const REVIEW_TEMPLATES = [
  { rating: 5, description: "Absolutely love this product! Exceeded all my expectations. Build quality is top-notch and performance is incredible." },
  { rating: 5, description: "Best purchase I've made this year. Fast shipping, well-packaged, exactly as described. Highly recommend!" },
  { rating: 5, description: "Outstanding quality and performance. Worth every rupee. My friends are all jealous now." },
  { rating: 4, description: "Really good product overall. Minor issues with the packaging but the product itself is excellent." },
  { rating: 4, description: "Great value for money. Does everything I need and more. Only minor complaint is the instruction manual could be clearer." },
  { rating: 4, description: "Solid build quality and works exactly as advertised. Very happy with the purchase." },
  { rating: 3, description: "Decent product for the price. Not perfect but gets the job done. Customer support was helpful when I had questions." },
  { rating: 3, description: "Average performance, nothing spectacular. The design is good but I expected better at this price point." },
  { rating: 2, description: "Had some issues initially but they seem to have resolved after a few days of use. Cautiously optimistic." },
  { rating: 5, description: "Phenomenal product! The quality is immediately apparent when you take it out of the box. 10/10 would buy again." },
  { rating: 4, description: "Really impressed with the build quality. Feels premium and performs great. Highly satisfied." },
  { rating: 5, description: "Game changer! I cannot imagine going back to my old setup. The difference is night and day." },
];

const ORDER_STATUSES = [
  OrderStatus.PENDING,
  OrderStatus.PAID,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

const NOTIFICATION_TEMPLATES = [
  (orderStatus: string, _productName: string) => ({ type: "ORDER_UPDATE", message: `Your order status has been updated to ${orderStatus}.`, }),
  (_orderStatus: string, _productName: string) => ({ type: "PROMOTION", message: "Flash sale! Get 20% off on all Audio products this weekend only.", }),
  (_orderStatus: string, _productName: string) => ({ type: "PROMOTION", message: "New arrivals in Gaming category. Check out the latest deals!", }),
  (_orderStatus: string, productName: string) => ({ type: "WISHLIST", message: `${productName} from your wishlist is now on sale!`, }),
  (_orderStatus: string, _productName: string) => ({ type: "ORDER_PLACED", message: "Your order has been placed successfully. Thank you for shopping with us!", }),
];

// ─── main seed ───────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed...");

  // ── 1. Categories ──────────────────────────────────────────────────────────
  console.log("📦 Seeding categories...");

  for (const cat of CATEGORIES) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image },
      create: cat,
    });
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`);

  // ── 2. Products ────────────────────────────────────────────────────────────
  console.log("🛍️  Seeding products...");
  const productIds: string[] = [];

  for (const p of PRODUCTS) {
    const created = await prisma.product.upsert({
      where: { name: p.name },
      update: {
        price: p.price,
        stock: p.stock,
        rating: p.rating,
        isPublished: true,
      },
      create: {
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        brand: p.brand,
        rating: p.rating,
        images: p.images,
        colorOptions: p.colorOptions,
        weight: p.weight,
        dimensions: p.dimensions,
        material: p.material,
        warrenty: p.warrenty,
        isPublished: true,
        categoryId: p.category, // schema FK references ProductCategory.name
      },
    });
    productIds.push(created.id);
  }
  console.log(`  ✓ ${PRODUCTS.length} products`);

  // ── 3. Users ───────────────────────────────────────────────────────────────
  console.log("👥 Seeding users...");
  const password = await bcrypt.hash("password123", 10);

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@shop.com" },
    update: {},
    create: {
      email: "admin@shop.com",
      name: "Admin User",
      username: "admin",
      password,
      role: Role.ADMIN,
      phoneNumber: "+977-9800000001",
    },
  });

  // Regular users
  const userSeeds = [
    { email: "alice@example.com", name: "Alice Sharma", username: "alice_sharma", phone: "+977-9800000002" },
    { email: "bob@example.com", name: "Bob Tamang", username: "bob_tamang", phone: "+977-9800000003" },
    { email: "carol@example.com", name: "Carol Thapa", username: "carol_thapa", phone: "+977-9800000004" },
    { email: "david@example.com", name: "David Rai", username: "david_rai", phone: "+977-9800000005" },
    { email: "eva@example.com", name: "Eva Gurung", username: "eva_gurung", phone: "+977-9800000006" },
  ];

  const users: { id: string; name: string | null }[] = [admin];

  for (const u of userSeeds) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        username: u.username,
        password,
        role: Role.USER,
        phoneNumber: u.phone,
      },
    });
    users.push(user);
  }
  console.log(`  ✓ ${users.length} users (admin@shop.com / alice,bob,carol,david,eva @example.com — password: password123)`);

  // ── 4. Addresses ───────────────────────────────────────────────────────────
  console.log("📍 Seeding addresses...");
  const addressData = [
    { street: "Thamel Marg 12", city: "Kathmandu", postal: "44600", country: "Nepal", phone: "+977-9800000002" },
    { street: "New Road 45", city: "Pokhara", postal: "33700", country: "Nepal", phone: "+977-9800000003" },
    { street: "Lakeside 7", city: "Pokhara", postal: "33701", country: "Nepal", phone: "+977-9800000004" },
    { street: "Durbar Marg 3", city: "Kathmandu", postal: "44601", country: "Nepal", phone: "+977-9800000005" },
    { street: "Boudha Ring Rd 89", city: "Kathmandu", postal: "44602", country: "Nepal", phone: "+977-9800000006" },
  ];

  for (let i = 0; i < userSeeds.length; i++) {
    const user = users[i + 1]; // skip admin
    const addr = addressData[i];

    const address = await prisma.address.create({
      data: { ...addr, userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { defaultAddressId: address.id, shippingAddressId: address.id },
    });
  }
  console.log(`  ✓ addresses created`);

  // ── 5. Reviews ─────────────────────────────────────────────────────────────
  console.log("⭐ Seeding reviews...");
  let reviewCount = 0;

  for (const productId of productIds) {
    // Each product gets 2–5 reviews from different users
    const reviewers = [...users].sort(() => Math.random() - 0.5).slice(0, rand(2, 5));

    for (const reviewer of reviewers) {
      const existing = await prisma.review.findUnique({
        where: { userId_productId: { userId: reviewer.id, productId } },
      });
      if (existing) continue;

      const template = pick(REVIEW_TEMPLATES);
      await prisma.review.create({
        data: {
          userId: reviewer.id,
          productId,
          rating: template.rating,
          description: template.description,
        },
      });
      reviewCount++;
    }
  }
  console.log(`  ✓ ${reviewCount} reviews`);

  // ── 6. Carts ───────────────────────────────────────────────────────────────
  console.log("🛒 Seeding carts...");
  for (const user of users.slice(1, 4)) {
    // alice, bob, carol get carts
    let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } });
    }

    const cartProducts = productIds.sort(() => Math.random() - 0.5).slice(0, rand(2, 4));
    for (const productId of cartProducts) {
      await prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: {},
        create: { cartId: cart.id, productId, quantity: rand(1, 3) },
      });
    }
  }
  console.log(`  ✓ carts with items`);

  // ── 7. Wishlists ───────────────────────────────────────────────────────────
  console.log("❤️  Seeding wishlists...");
  // WishlistItem.productId is @unique — a product can only appear in ONE wishlist
  const existingWishlistItems = await prisma.wishlistItem.findMany({ select: { productId: true } });
  const usedWishlistProductIds = new Set<string>(existingWishlistItems.map((i) => i.productId));

  for (const user of users.slice(1)) {
    let wishlist = await prisma.wishlist.findUnique({ where: { userId: user.id } });
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({ data: { userId: user.id } });
    }

    const available = productIds.filter((id) => !usedWishlistProductIds.has(id));
    if (available.length === 0) break;

    const wishProducts = available.sort(() => Math.random() - 0.5).slice(0, rand(2, 4));

    for (const productId of wishProducts) {
      await prisma.wishlistItem.create({
        data: { wishlistId: wishlist.id, productId },
      });
      usedWishlistProductIds.add(productId);
    }
  }
  console.log(`  ✓ wishlists with items`);

  // ── 8. Orders ──────────────────────────────────────────────────────────────
  console.log("📦 Seeding orders...");
  let orderCount = 0;
  const paymentMethods = ["stripe", "khalti", "cash_on_delivery"];

  const pastMonths = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d;
  });

  for (const user of users.slice(1)) {
    // Each user gets 3–6 orders
    const numOrders = rand(3, 6);

    for (let o = 0; o < numOrders; o++) {
      const orderDate = pick(pastMonths);
      orderDate.setDate(rand(1, 28));

      const numItems = rand(1, 4);
      const orderProducts = productIds
        .sort(() => Math.random() - 0.5)
        .slice(0, numItems);

      const itemsData = orderProducts.map((productId) => {
        const product = PRODUCTS.find((_, i) => productIds[i] === productId);
        const price = product?.price ?? randFloat(1000, 50000);
        return { productId, quantity: rand(1, 2), priceAtPurchase: price };
      });

      const total = itemsData.reduce(
        (sum, item) => sum + item.priceAtPurchase * item.quantity,
        0
      );

      const status = pick(ORDER_STATUSES);

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total,
          createdAt: orderDate,
          items: {
            create: itemsData.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
              status,
            })),
          },
        },
      });

      // Payment for paid/delivered orders
      if (
        status !== OrderStatus.CANCELLED &&
        status !== OrderStatus.PENDING
      ) {
        await prisma.payment.create({
          data: {
            orderId: order.id,
            userId: user.id,
            method: pick(paymentMethods),
            status: "completed",
            amount: total,
            createdAt: orderDate,
          },
        });
      }

      orderCount++;
    }
  }
  console.log(`  ✓ ${orderCount} orders with payments`);

  // ── 9. Notifications ──────────────────────────────────────────────────────
  console.log("🔔 Seeding notifications...");
  let notifCount = 0;

  for (const user of users.slice(1)) {
    const numNotifs = rand(4, 8);
    for (let n = 0; n < numNotifs; n++) {
      const templateFn = pick(NOTIFICATION_TEMPLATES);
      const { type, message } = templateFn(
        pick(["DELIVERED", "SHIPPED", "PROCESSING"]) as string,
        pick(PRODUCTS).name as unknown as string
      );

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - rand(0, 30));

      await prisma.notification.create({
        data: {
          userId: user.id,
          type,
          message,
          isRead: Math.random() > 0.4,
          createdAt,
          link: type === "ORDER_UPDATE" ? "/profile?tab=orders" : undefined,
        },
      });
      notifCount++;
    }
  }
  console.log(`  ✓ ${notifCount} notifications`);

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log("\n✅ Seed complete!");
  console.log("─────────────────────────────────────────");
  console.log(`  Categories   : ${CATEGORIES.length}`);
  console.log(`  Products     : ${PRODUCTS.length}`);
  console.log(`  Users        : ${users.length}`);
  console.log(`  Reviews      : ${reviewCount}`);
  console.log(`  Orders       : ${orderCount}`);
  console.log(`  Notifications: ${notifCount}`);
  console.log("─────────────────────────────────────────");
  console.log("  🔑 Login credentials:");
  console.log("     Admin  : admin@shop.com / password123");
  console.log("     User   : alice@example.com / password123");
  console.log("─────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
