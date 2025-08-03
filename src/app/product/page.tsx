import ProductFilter from "@/components/productFilter"


const ProductsPage = () => {
  return (
    <div className="w-full flex justify-center max-w-9xl bg-gray-100  rounded-xl gap-2 shadow-sm mt-2">
           <ProductFilter/>

           <div className="flex-1">
                    main
           </div>
    </div>
  )
}

export default ProductsPage