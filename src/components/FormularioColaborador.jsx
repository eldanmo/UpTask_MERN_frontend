import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')

    const {mostrarAlerta, alerta, submitColaborador} = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if(email === '') {
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        submitColaborador(email)
    }

    const { msg } = alerta

  return (
    <>
        <form 
            className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label 
                    htmlFor="email" 
                    className="text-gray-600 uppercase font-bold text-sm"
                    >Email Colaborador
                </label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Email de usuario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    type="submit"
                    className="bg-sky-600 hover:ng-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm mt-3"
                    value="Buscar Colaborador"
                />
                
            </div>
        </form>
    </>
  )
}

export default FormularioColaborador