import React from "react"
import { Link } from "react-router-dom"

export const OlvidePassword = () => {
	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
				Recupera tu Acceso y no Pierdas tus {""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div>
			<form className="mt-4">
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 bg-gray-50 rounded-2xl mt-4 "
              type="text"
              placeholder="Email de registro"
            
            />
           
          </div>
          <input
            type="button"
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