import { ButtonType } from "./types"
import BotonMain from "./components/BotonMain"
import AgregarComponent from "./components/AgregarComponent"
import DatosComponent from "./components/DatosComponent"
import ResumenComponent from "./components/ResumenComponent"
import { useEffect, useReducer, useState } from "react"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(ActivityReducer, initialState)
  const [isEditOne, setEditOne] = useState(false)
  const [isEditTwo, setEditTwo] = useState(false)

  const handleEdit = ({boton1, boton2} : ButtonType) => {
    setEditOne(boton1)
    setEditTwo(boton2)
  }

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
          isEdit={isEditOne}
          setEdit={setEditOne}
        />
        <BotonMain
          nombre='Datos'
          direccionOpen={<DatosComponent state={state} handleEdit={handleEdit} dispatch={dispatch} />}
          direccionClosed={<ResumenComponent />}
          isEdit={isEditTwo}
          setEdit={setEditTwo}
        />
      </section>
    </div>
  )
}

export default App
