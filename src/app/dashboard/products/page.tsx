import ProductTable from '@/components/dashboard/productTable'
import { Input } from '@/components/ui/input'


const page = () => {

   
  return (
   <div className='w-full h-full flex flex-col gap-4'>

    <div className='flex w-full  justify-between items-center'>

    <div className='flex gap-2'>
            <button>ADD</button>
        <button>DELETE</button>
        <button>ACTION</button>
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