import React, { useState } from "react"
import swal from "sweetalert"
import axios from "axios"
import { Link,useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const URL_AUTH = "http://localhost:4000/api/veterinarios/login"
export const Login = () => {
	const {setAuth}= useAuth()
	const navigate =useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()

		if ([email, password].includes("")) {
			swal({
				text: "Todos los campos son obligatorios",
				icon: "error",
			})
		}

		try {
			const { data } = await axios.post(URL_AUTH,{email,password})
			console.log(data.usuario);
      localStorage.setItem('token',data.usuario.token)
			setAuth(data.usuario)
			navigate('/admin')
    } catch (error) {
      swal({
				text: error.response.data.msg,
				icon: "error",
			})
		}
    
  }
	

	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
					Inicia Sesion y administra tus{" "}
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
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label className="uppercase text-gray-600 block text-xl font-bold mt-4">
							Password
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input
						type="submit"
						value="Iniciar Sesion"
						className="bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold
            mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link
						to="/registrar"
						className="block my-5 text-center text-gray-500"
					>
						No tienes cuenta? Registrate
					</Link>
					<Link
						to="/olvide-password"
						className="block my-5 text-center text-gray-500"
					>
						Olvide mi password
					</Link>
				</nav>
			</div>
		</>
	)
}

