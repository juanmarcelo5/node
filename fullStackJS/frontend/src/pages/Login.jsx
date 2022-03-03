import React from "react"
import { Link } from "react-router-dom"

export const Login = () => {
	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
					Inicia Sesion y administra tus <span className="text-black">Pacientes</span>
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
            <label className="uppercase text-gray-600 block text-xl font-bold mt-4">
              Password
            </label>
            <input
              className="border w-full p-3 bg-gray-50 rounded-2xl mt-4"
              type="password"
              placeholder="Password"
            
            />
          </div>
          <input
            type="button"
            value="crear cuenta"
            className="bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold
            mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/registrar" className="block my-5 text-center text-gray-500">No tienes cuenta? Registrate</Link>
          <Link to="/olvide-password" className="block my-5 text-center text-gray-500">Olvide mi password</Link>
        </nav>
      </div>
		</>
	)
}
 