import type { ActivityType } from "../types"
import { motion } from "framer-motion"
import { v7 as uuidv7 } from 'uuid'
import { FormEvent, ChangeEvent, useState, Dispatch, useEffect } from "react"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type AgregarComponentProps = {
  state: ActivityState
  dispatch: Dispatch<ActivityActions>
}

const handleUUIDGenerator = () => {
  return uuidv7()
}

const initialState: ActivityType = {
  id: handleUUIDGenerator(),
  categoria: 1,
  nombre: '',
  calorias: ''
}

export default function AgregarComponent({ state, dispatch }: AgregarComponentProps) {
  const [formElements, setFormElements] = useState(initialState)

  useEffect(() => {
    if (state.editId.length > 0) {
      const actividad = state.activities.find(actv => actv.id === state.editId && actv)
      setFormElements(actividad ? actividad : initialState)
    }
  }, [state.editId])

  const handleChange = (evt: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    setFormElements({ ...formElements, [evt.target.id]: evt.target.id === 'categoria' ? +evt.target.value : evt.target.value })
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch({ type: 'save-activity', payload: { newActivity: formElements } })
    setFormElements({ ...initialState, id: handleUUIDGenerator() })
  }

  const handleValidacion = () => {
    const { nombre, calorias } = formElements
    return nombre.trim() !== '' && +calorias > 0
  }

  return (
    <>
      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex flex-col justify-center items-center space-y-16 lg:space-y-20 h-full'>
        <div className='w-full flex flex-col items-center space-y-5 lg:space-y-7'>
          <select className='w-9/12 lg:w-2/4 py-3 px-2 bg-coffee-100 text-coffee-300 rounded-md font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-coffee-300' id='categoria'
            value={formElements.categoria}
            onChange={handleChange}>
            {categories.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <motion.input className='w-9/12 lg:w-2/4 py-3 px-2 bg-coffee-100 text-coffee-300 rounded-md font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-coffee-300' whileFocus={{ scale: 1.5 }}
            id='nombre'
            type='text'
            placeholder='Nombre'
            value={formElements.nombre}
            onChange={handleChange}
            autoComplete='off'
          />
          <motion.input className={`w-9/12 lg:w-2/4 py-3 px-2 bg-coffee-100 text-coffee-300 rounded-md font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-coffee-300 ${+formElements.calorias < 0 && 'ring-2 ring-red-600 focus:ring-red-600'}`} whileFocus={{ scale: 1.5 }}
            id='calorias'
            type='number'
            placeholder='Calorias'
            value={formElements.calorias}
            onChange={handleChange}
            min={1}
          />
        </div>
        <motion.input
          whileTap={{ scale: handleValidacion() ? 0.9 : 1 }}
          type='submit'
          value={`Guardar ${categories[formElements.categoria - 1].name}`}
          disabled={!handleValidacion()}
          className='uppercase bg-coffee-400 text-white text-xl font-dosis font-bold tracking-widest py-5 w-11/12 lg:w-9/12 enabled:cursor-pointer rounded-sm hover:bg-coffee-300 disabled:bg-coffee-500 disabled:text-gray-400'
        />
      </motion.form>
    </>
  )
}
