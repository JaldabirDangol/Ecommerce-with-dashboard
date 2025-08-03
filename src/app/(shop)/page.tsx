import Categories  from "@/components/categories";
import { Hovercard } from "@/components/hoverCard";
import JustForYou from "@/components/justForYou";
import { ProductFeatureCard } from "@/components/productfeaturecard";
import { prisma } from "@/lib/db";

export default async function ShopPage() {

  const product1 = await prisma.product.findUnique({
    where:{
      id:"cmdvbws2v0002h1e4cvlr4vsw"
    }
  })
    const product2 = await prisma.product.findUnique({
    where:{
      id:"cmdu32n280001h1xoeec7457c"
    }
  })
  return (
    <div className="flex flex-col w-full mt-4 gap-4">
      <h2 className="text-2xl font-semibold">Welcome to the Shop!</h2>
      <p>Browse our products and enjoy your shopping experience.</p>

<div className="flex w-full gap-4">

   <div className="relative max-w-4xl mx-auto">
        <Hovercard />
      </div>

      <div className="flex flex-col gap-2 w-full">
  <ProductFeatureCard
        title="New Gen X-Bud"
        imageUrl="/earbud.jpg"
        href={`/product/${product2?.id}`}
      />
<ProductFeatureCard
  title="UltraSharp 6K Monitor"
  subtitle="Crystal clarity for pro creators"
  imageUrl="/monitor.webp"
  href={`/product/${product1?.id}`}
/>
      </div>
</div>
  
  <Categories/>

    <JustForYou/>

    </div>
  );
}
