import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarasouelCard } from "@/components/carssouelProduct"

// Sample product data
const products = [
  {
    title: "iPhone 16 Pro Max",
    description: "Experience the power of the A17 chip and stunning camera system in your palm.",
    label: "📱 Premium Smartphone",
    imageUrl: "/iphone-16-pro-max.webp", // put the image in /public/products
  },
  {
    title: "MacBook Pro M4",
    description: "Unleash performance with the latest M3 chip — perfect for creators and pros.",
    label: "💻 High-End Laptop",
    imageUrl: "/macbook-pro-m4.jpg",
  },
  {
    title: "Noise-Cancelling Headphones",
    description: "Block out the world and dive into your favorite music in peace.",
    label: "🎧 Audio Gear",
    imageUrl: "/headphone.jpg",
  },
  {
    title: "Smartwatch Ultra X",
    description: "Track your fitness, get notifications, and stay connected on the go.",
    label: "⌚ Wearable Tech",
    imageUrl: "/smartwatch.webp",
  },
  {
    title: "USB-C Docking Station",
    description: "Expand your laptop's potential with HDMI, USB, SD card, and more.",
    label: "🔌 Essential Accessory",
    imageUrl: "/usb-c.jpg",
  },
];



export const Hovercard = () => {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index}>
            <CarasouelCard
              title={product.title}
              description={product.description}
              label={product.label}
              imageUrl={product.imageUrl}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
