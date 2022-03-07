import React, { useState } from "react"
import { Link } from "react-router-dom"
import  swal from 'sweetalert'
import axios from 'axios'
const URL_OLVIDE='http://localhost:4000/api/veterinarios/olvide-password'
export const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = async e =>{
    e.preventDefault()
    if(email === '' ){
      swal({
        icon:'error',
        text:'Ingrese el correo'
      })
      return
    }
    try {
      const {data} = await axios.post(URL_OLVIDE,{email})
      console.log(data);
    } catch (error) {
      console.log(error.response);
      swal({
        icon:'error',
        text:error.response.data.msg
      })

    }
  }
	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
				Recupera tu Acceso y no Pierdas tus {""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div>
			<form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 bg-gray-50 rounded-2xl mt-4 "
              type="text"
              placeholder="Email de registro"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
           
          </div>
          <input
            type="submit"
            value="enviar instrucciones"
            className="bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold
            mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>
				<nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block my-5 text-center text-gray-500">No tienes cuenta? Registrate</Link>
          <Link to="/olvide-password" className="block my-5 text-center text-gray-500">Olvide mi password</Link>
        </nav>
			</div>
		</>
	)
}