import React from 'react'
import { initialProducts } from '../data/product'
import {Tag} from 'lucide-react'

const availabaleCategories = [
   "All", ...new Set(initialProducts.map(p=>p.category))
]

const CategoryFilter = ({selectCategory,setSelectCategory}) => {
  return (
    <>
      <div className='flex flex-wrap gap-3 pb-6 border-b border-gray-800'>
        <Tag className='w-5 h-5 mr-2 mt-2 hidden sm:block text-orange-500' />
        {availabaleCategories.map((category) => (
           <button key={category} 
           onClick={()=>setSelectCategory(category)}
           className={`px-5 py-2 text-sm font-bold rounded-full transition duration-200 shadow-md   ${selectCategory===category ? 'bg-orange-600 text-white shadow-orange-800/50': 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400 border border-gray-700'}`}>{category}</button>
        ))}
      </div>
    </>
  )
}

export default CategoryFilter
