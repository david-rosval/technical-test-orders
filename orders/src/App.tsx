
import { SquareArrowOutUpRight } from 'lucide-react'
import { Link } from 'react-router'

function App() {

  return (
    <div className='h-dvh w-full justify-center items-center flex flex-col gap-10'>
      <h1 className='text-3xl md:text-5xl lg:text-8xl font-bold'>Order Management</h1>
      <div className='flex flex-col gap-5 items-center rounded-lg p-8 bg-neutral-200 dark:bg-neutral-800 shadow-lg min-w-full md:min-w-48'>
        <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold mb-4'>Menu</h2>
        <Link className='flex gap-2 items-center text-lg' to={"/my-orders"}>My Orders <SquareArrowOutUpRight size={20} /></Link>
        <Link className='flex gap-2 items-center text-lg' to={"/products"}>Products <SquareArrowOutUpRight size={20} /></Link>
      </div>
    </div>
  )
}

export default App
