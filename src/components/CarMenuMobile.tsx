import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchCarTypes } from '../lib/repositories/car_typeApi'
import type { CarType } from '../lib/models/car_type'

interface CarMenuMobileProps {
   closeMobileMenu: () => void
}

export default function CarMenuMobile({ closeMobileMenu }: CarMenuMobileProps) {
   const [carTypes, setCarTypes] = useState<CarType[]>([])

   useEffect(() => {
      fetchCarTypes().then(setCarTypes).catch(console.error)
   }, [])

   return (
      <div className="space-y-2">
         <div className="pl-4 space-y-2">
            {carTypes.map((type) => (
               <Link
                  key={type.id}
                  href={`/cars/${type.id}`}
                  onClick={closeMobileMenu}
                  className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
               >
                  {type.name}
               </Link>
            ))}
         </div>
      </div>
   )
}
