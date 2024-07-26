
import BotonMain from "./components/BotonMain"
import AgregarComponent from "./components/AgregarComponent"
import DatosComponent from "./components/DatosComponent"
import ResumenComponent from "./components/ResumenComponent"

function App() {

  return (
    <div className='bg-coffee-100 w-screen h-dvh p-5'>
      <header>
        <h1 className='text-3xl font-dosis font-semibold uppercase tracking-wider text-coffee-400 '>Contador Calorias</h1>
      </header>
      <section className='flex flex-col lg:flex-row justify-center items-center space-y-11 lg:space-y-0 lg:space-x-11 my-14 h-[45rem] w-full'>
        <BotonMain
          nombre='Agregar'
          direccionOpen={<AgregarComponent />}
          direccionClosed={<></>}
        />
        <BotonMain
          nombre='Datos'
          direccionOpen={<DatosComponent />}
          direccionClosed={<ResumenComponent />}
        />
      </section>
    </div>
  )
}

export default App
