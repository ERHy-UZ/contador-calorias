import { ActivityActions, ActivityState } from "../reducers/activity-reducer"
import { categories } from "../data/categories"
import { ButtonType, CategoryType, ActivityType } from "../types"
import { useMemo, Dispatch, SetStateAction, useEffect } from "react"
import { motion } from "framer-motion"

type DatosComponentProps = {
  state: ActivityState
  setEdit: Dispatch<SetStateAction<ButtonType>>
  dispatch: Dispatch<ActivityActions>
}

export default function DatosComponent({ state, setEdit, dispatch }: DatosComponentProps) {

  const handleCategorias = useMemo(() => (categoria: CategoryType['id']) => categories.find(cat => cat.id === categoria)?.name, [state.activities])

  useEffect(() => {
    setEdit({ boton1: false, boton2: true })
  }, [setEdit])

  const handleEdit = (id: ActivityType['id']) => {
    setEdit({ boton1: true, boton2: false })
    dispatch({ type: 'set-edit-id', payload: { id } })
  }

  const handleDelete = (id: ActivityType['id']) => dispatch({ type: 'delete-activity', payload: { id } })

  const handleDeleteAll = () => {
    setEdit({ boton1: false, boton2: false })
    dispatch({ type: 'delete-all' })
  }

  return (
    <div className='space-y-7 h-full overflow-y-auto p-10'>
      {state.activities.map(item => (
        <div key={item.id} className='relative flex bg-coffee-100 w-full h-32 shadow-md p-10'>
          <div className={` absolute flex justify-center items-center w-36 h-12 ${item.categoria === 1 ? 'bg-neon' : 'bg-panter'} -top-3 -left-5 border-[1px] border-black`}>
            <p className='uppercase tracking-wider font-dosis font-semibold text-xl'>{handleCategorias(item.categoria)}</p>
          </div>
          <div className='flex w-full pt-2 justify-between items-center'>
            <p className='font-dosis font-bold text-4xl text-coffee-500 uppercase'>{item.nombre}</p>
            <p className='font-bold uppercase text-gray-500'><span className='font-dosis text-4xl'>{item.calorias}</span>{' '}kcal</p>
            <div className='flex space-x-2'>
              <motion.button title='EDITAR' whileTap={{ scale: 0.8 }} onClick={() => handleEdit(item.id)} className='bg-green-500 hover:bg-green-600 p-2 rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 font-bold text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </motion.button>
              <motion.button title='ELIMINAR' onClick={() => handleDelete(item.id)} whileTap={{ scale: 0.8 }} className='bg-red-700 hover:bg-red-800 p-2 rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 font-bold text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-center'>
        {state.activities.length > 0 ?
          <motion.button onClick={handleDeleteAll} className='px-10 py-5 uppercase bg-red-700 hover:bg-red-800 font-dosis font-bold text-xl text-white tracking-widest rounded-sm'
            whileTap={{ scale: 0.92 }}>
            eliminar todo
          </motion.button> :
          <motion.p className='uppercase font-dosis font-bold text-3xl text-gray-600 tracking-widest rounded-sm'>no hay datos</motion.p>
        }
      </div>
    </div>
  )
}
