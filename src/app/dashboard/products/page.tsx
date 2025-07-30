import ProductTable from '@/components/dashboard/productTable'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import Link from 'next/link'


const page = () => {

   
  return (
   <div className='w-full h-full flex flex-col gap-4'>

    <div className='flex w-full  justify-between items-center'>

    <div className='flex gap-2'>
  <Link href={"/dashboard/products/new"}
          className=" px-4 py-2 rounded-md bg-green-200 text-green-600 font-semibold hover:bg-cyan-900 
          ring-2 ring-green-500 flex items-center gap-1 hover:cursor-pointer hover:text-gray-300"
        >
          <Plus className="w-5 h-5" /> Add
        </Link>
    </div>

    <div>
        <Input placeholder='Search'/>
    </div>
    
   
    </div>
 <main className='w-full h-full'>
       <ProductTable/>
    </main>
   </div>
  )
}

export default page