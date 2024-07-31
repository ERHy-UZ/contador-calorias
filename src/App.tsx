import { ButtonType } from "./types"
import BotonMain from "./components/BotonMain"
import AgregarComponent from "./components/AgregarComponent"
import DatosComponent from "./components/DatosComponent"
import ResumenComponent from "./components/ResumenComponent"
import { useEffect, useReducer, useState } from "react"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(ActivityReducer, initialState)
  const [isEdit, setEdit] = useState<ButtonType>({ boton1: false, boton2: false })

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <div className='bg-coffee-100 w-screen h-full tablet:h-screen p-5'>
      <header>
        <h1 className='text-3xl font-dosis font-semibold uppercase tracking-wider text-coffee-400 '>Contador Calorias</h1>
      </header>
      <section className='flex flex-col lg:flex-row justify-center items-center space-y-11 lg:space-y-0 lg:space-x-11 my-14 h-[45rem] w-full'>
        <BotonMain
          nombre='Agregar'
          direccionOpen={<AgregarComponent state={state} dispatch={dispatch} />}
          direccionClosed={<></>}
          isEdit={isEdit.boton1}
        />
        <BotonMain
          nombre='Datos'
          direccionOpen={<DatosComponent state={state} setEdit={setEdit} dispatch={dispatch} />}
          direccionClosed={<ResumenComponent />}
          isEdit={isEdit.boton2}
        />
      </section>
    </div>
  )
}

export default App
