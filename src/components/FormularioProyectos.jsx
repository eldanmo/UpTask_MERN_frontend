import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"

const FormularioProyectos = () => {
    const [id, setId] = useState(null)
    const [ nombre, setNombre ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ fechaEntrega, setFechaEntrega ] = useState('')
    const [ cliente, setCliente ] = useState('')

    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()
    const params = useParams()

    useEffect(()=>{
        if(params.id){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    },[params])

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente})

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const {msg} = alerta

  return (
    <form 
        className="bg-white py-5 px-5 md:w-2/3 rounded-lg shadow" 
        onSubmit={handleSubmit}
    >
        { msg && <Alerta alerta={alerta}/> }
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="nombre"
            >
                Nombre Proyecto
            </label>

            <input
                id="nombre"
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Proyecto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="descripcion"
            >
                Descripción Proyecto
            </label>

            <textarea
                id="descripcion"
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="descripcion del Proyecto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="fechaEntrega"
            >
                Fecha de Entrega Proyecto
            </label>

            <input
                id="fechaEntrega"
                type="date"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="cliente"
            >
                Cliente
            </label>

            <input
                id="cliente"
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Cliente del Proyecto"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>
        <input 
            type="submit"
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default FormularioProyectos