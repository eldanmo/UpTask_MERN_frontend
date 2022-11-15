import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  const params = useParams()
  const {token} = params

  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)

  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password !== password2) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe contener al menos 6 carácteres',
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, {password})
      setAlerta({
        mas: data.msg,
        error: false
      })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl capitalize text-center">
        Reestablece tú contraseña y no prierdas tus {''}
          <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      { tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg px-10 py-5" onSubmit={handleSubmit} >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
            Password
          </label>
          <input 
            id="password" 
            type="password" 
            placeholder="Contraseña" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">
            Confirmación de Password
          </label>
          <input 
            id="password2" 
            type="password" 
            placeholder="Confirma tú contraseña" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Reestablecer"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      ) }
      
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Iniciar Sesión</Link>
      )}
      
    </>
  )
}

export default NuevoPassword