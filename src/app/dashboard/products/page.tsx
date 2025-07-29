import ProductTable from '@/components/dashboard/productTable'
import { Input } from '@/components/ui/input'
import { MoveDown, Plus, Trash } from 'lucide-react'


const page = () => {

   
  return (
   <div className='w-full h-full flex flex-col gap-4'>

    <div className='flex w-full  justify-between items-center'>

    <div className='flex gap-2'>
         <div className='flex gap-4 p-2'> 
  <button
    className="p-2 rounded-md bg-green-200 text-green-600 font-semibold hover:bg-green-700 
    ring-2 ring-green-500 flex  items-center gap-1 hover:cursor-pointer hover:text-white"
  >
    <Plus className='w-5 h-5' />
    ADD
  </button> <button
    className="p-2 rounded-md bg-red-300 text-red-600 font-semibold hover:bg-red-900 
    ring-2 ring-red-500 flex  items-center gap-1 hover:cursor-pointer hover:text-gray-300"
  >
    <Trash className='w-5 h-5' />
   DELETE
  </button> <button
    className="px-4 py-2 rounded-md bg-cyan-100 text-cyan-600 font-semibold hover:bg-cyan-900 
    ring-2 ring-blue-400 flex  items-center gap-1 hover:cursor-pointer hover:text-gray-300"
  >
    ADD
    <MoveDown className='w-5 h-5' />
  </button>

</div>
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