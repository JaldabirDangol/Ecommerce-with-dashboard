import React from 'react'
import Image from 'next/image'
import Link from 'next/link';


const categoriesItem = [
  {
    name: "Laptops",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2875/2875433.png",
    href: "https://www.bestbuy.com/site/searchpage.jsp?st=laptop",
  },
  {
    name: "Smartphones",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/994/994928.png",
    href: "https://www.amazon.com/s?k=smartphones",
  },
  {
    name: "Headphones",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
    href: "https://www.apple.com/shop/accessories/all/headphones",
  },
  {
    name: "Smartwatches",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2949/2949504.png",
    href: "https://www.samsung.com/us/watches/all-watches/",
  },
  {
    name: "Gaming Consoles",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/871/871390.png",
    href: "https://www.playstation.com/en-us/ps5/buy-now/",
  },
  {
    name: "Cameras",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920141.png",
    href: "https://www.bhphotovideo.com/c/browse/Digital-Cameras/ci/9811",
  },
  {
    name: "Accessories",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/929/929566.png",
    href: "https://www.amazon.com/s?k=tech+accessories",
  },
  {
    name: "Monitors",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2282/2282201.png",
    href: "https://www.dell.com/en-us/shop/monitors/ar/4009",
  },
  {
    name: "Speakers",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2811/2811806.png",
    href: "https://www.bose.com/en_us/products/speakers.html",
  },
  {
    name: "Tablets",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3771/3771436.png",
    href: "https://www.lenovo.com/us/en/c/tablets/",
  },
  {
    name: "Routers",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3616/3616215.png",
    href: "https://www.tp-link.com/us/home-networking/wifi-router/",
  },
  {
    name: "Power Banks",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3303/3303970.png",
    href: "https://www.amazon.com/s?k=power+bank",
  },
  {
    name: "Drones",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
    href: "https://www.dji.com/products/consumer-drones",
  },
  {
    name: "Projectors",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/4407/4407422.png",
    href: "https://www.epson.com/For-Home/Projectors/c/h3",
  },
  {
    name: "Printers",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
    href: "https://www.hp.com/us-en/shop/sitesearch?keyword=printer",
  },
  {
    name: "VR Headsets",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2977/2977903.png",
    href: "https://www.meta.com/quest/quest-3/",
  }
];



export const Categories = () => {
  return (
    <div className='w-ful h-full'>

    <h2 className='text-2xl font-semibold'>
        Categoties
      </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full p-4">
      {categoriesItem.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"  
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-main-300 hover:shadow-md transition"
        >
          <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden">
            <Image
              width={64}
              height={64}
              src={item.imageUrl}
              alt={item.name}
              className="object-contain max-h-[80%] max-w-[80%]"
            />
          </div>
          <span className="mt-2 text-sm text-center">{item.name}</span>
        </Link>
      ))}
    </div>
    </div>
  );
};