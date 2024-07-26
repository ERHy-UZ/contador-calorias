import { motion } from "framer-motion"
import { useState, ReactNode } from "react"

type BotonMainProps = {
    nombre: string
    direccionOpen: ReactNode
    direccionClosed: ReactNode

}

export default function BotonMain({ nombre, direccionOpen, direccionClosed }: BotonMainProps) {
    const [isOpen, setOpen] = useState(false)

    return (
        <motion.button
            whileHover={{ scale: !isOpen ? 1.04 : 1 }}
            whileTap={{ scale: !isOpen ? 0.9 : 1 }}
            onMouseLeave={() => setOpen(false)} onClick={() => setOpen(true)} className={`bg-coffee-200 ${isOpen ? 'h-[36rem]' : 'h-48'} lg:h-full w-11/12 ${isOpen ? 'lg:w-[80rem]' : 'lg:w-96'} rounded-2xl p-10 ${isOpen && 'cursor-default'} shadow-md`}
        >
            <div className='w-full h-full'>
                <h1 className='font-dosis font-semibold text-4xl uppercase text-coffee-400'>{nombre}</h1>
                <div className='my-10 w-full h-5/6'>
                    {isOpen ?
                        direccionOpen :
                        direccionClosed
                    }
                </div>
            </div>
        </motion.button>
    )
}
