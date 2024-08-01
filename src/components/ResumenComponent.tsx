import { useMemo } from "react"
import { ActivityState } from "../reducers/activity-reducer"
import { motion } from "framer-motion"

type ResumenComponentProps = {
  state: ActivityState
}

export default function ResumenComponent({ state }: ResumenComponentProps) {
  const caloriesCosumed = useMemo(() => state.activities.reduce((accumulator, value) => value.categoria === 1 ? accumulator + +value.calorias : accumulator, 0), [state.activities])
  const caloriesBurned = useMemo(() => state.activities.reduce((accumulator, value) => value.categoria === 2 ? accumulator + +value.calorias : accumulator, 0), [state.activities])

  return (
    <div className='max-lg:grid max-lg:grid-cols-2 lg:flex lg:flex-col max-lg:divide-x-2 lg:divide-y-2 divide-coffee-300 w-full h-full'>
      <motion.div className='flex flex-col justify-center items-center uppercase font-dosis w-full lg:py-20 text-green-700'>
        <p className='text-2xl lg:text-5xl font-semibold'>{caloriesCosumed}</p>
        <p className='lg:text-xl font-semibold'>Consumidas</p>
      </motion.div>
      <motion.div className='flex flex-col justify-center items-center uppercase font-dosis w-full lg:py-20 text-orange-700'>
        <p className='text-2xl lg:text-5xl font-semibold'>{caloriesBurned}</p>
        <p className='lg:text-xl font-semibold'>Quemadas</p>
      </motion.div>
    </div>
  )
}
