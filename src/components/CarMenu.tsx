import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchCarTypes } from '../lib/repositories/car_typeApi'
import type { CarType } from '../lib/models/car_type'

export default function CarTypeMenu() {
   const [carTypes, setCarTypes] = useState<CarType[]>([])

   useEffect(() => {
      fetchCarTypes().then(setCarTypes).catch(console.error)
   }, [])

   return (
      <div className="absolute top-full left-0 mt-2 w-40 xl:w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
         <div className="py-2">
            {carTypes.map((type) => (
               <Link
                  key={type.id}
                  href={`/cars/${type.slug}`}
                  className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
               >
                  {type.name}
               </Link>
            ))}
         </div>
      </div>
   )
}
