
import BotonMain from "./components/BotonMain"
import AgregarComponent from "./components/AgregarComponent"
import DatosComponent from "./components/DatosComponent"
import ResumenComponent from "./components/ResumenComponent"
import { useReducer } from "react"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(ActivityReducer, initialState)

  return (
    <div className='bg-coffee-100 w-screen h-full tablet:h-screen p-5'>
      <header>
        <h1 className='text-3xl font-dosis font-semibold uppercase tracking-wider text-coffee-400 '>Contador Calorias</h1>
      </header>
      <section className='flex flex-col lg:flex-row justify-center items-center space-y-11 lg:space-y-0 lg:space-x-11 my-14 h-[45rem] w-full'>
        <BotonMain
          nombre='Agregar'
          direccionOpen={<AgregarComponent dispatch={dispatch} />}
          direccionClosed={<></>}
        />
        <BotonMain
          nombre='Datos'
          direccionOpen={<DatosComponent state={state} />}
          direccionClosed={<ResumenComponent />}
        />
      </section>
    </div>
  )
}

export default App
