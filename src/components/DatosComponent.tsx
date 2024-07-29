import { ActivityState } from "../reducers/activity-reducer"
import { categories } from "../data/categories"
import { CategoryType } from "../types"
import { useMemo } from "react"

type DatosComponentProps = {
  state: ActivityState
}

export default function DatosComponent({ state }: DatosComponentProps) {

  const handleCategorias = useMemo(() => (categoria: CategoryType['id']) => categories.find(cat => cat.id === categoria)?.name, [state.activities])

  return (
    <div className='space-y-7 h-full overflow-y-auto p-10'>
      {state.activities.map(item => (
        <div className='relative flex bg-coffee-100 w-full h-32 shadow-md p-10'>
          <div className={` absolute flex justify-center items-center w-36 h-12 ${item.categoria === 1 ? 'bg-neon' : 'bg-panter'} -top-3 -left-5 border-[1px] border-black`}>
            <p className='uppercase tracking-wider font-dosis font-semibold text-xl'>{handleCategorias(item.categoria)}</p>
          </div>
          <div className='flex w-full pt-4 justify-between'>
            <p className='font-dosis font-bold text-4xl text-coffee-500 uppercase'>{item.nombre}</p>
            <div className='lg:w-96'>
              <p className='font-bold uppercase text-gray-500'><span className='font-dosis text-4xl'>{item.calorias}</span>{' '}kcal</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
