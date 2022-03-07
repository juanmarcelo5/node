import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"

export const Register = () => {
	const [dataForm, setDataForm] = useState({
		nombre: "",
		email: "",
		password: "",
		repetirPassword: "",
	})
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (
			(dataForm.nombre ||
				dataForm.email ||
				dataForm.password ||
				dataForm.repetirPassword) === ""
		) {
			return swal({
				title: "Error",
				text: "Todos los campos son obligatorios!",
				icon: "error",
			})
		}
		if (dataForm.password !== dataForm.repetirPassword) {
			return swal({
				title: "Error",
				text: "El password no coincide",
				icon: "error",
			})
		}
		try {
			const url = "http://localhost:4000/api/veterinarios"
			const respuesta = await axios.post(url, dataForm)
			return swal({
				title: "Success",
				text: 'Usuario Registrado! revisa tu email',
				icon: "success",
			})
			
		} catch (error) {
			return swal({
				title: "Error",
				text: error.response.data.msg,
				icon: "error",
			})
		}
	}
	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
					Crea tu cuenta y administra tus{""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div>
				<form className="mt-4" onSubmit={handleSubmit}>
					<div>
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Nombre
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4 "
							type="text"
							placeholder="Tu nombre"
							value={dataForm.nombre}
							onChange={(e) =>
								setDataForm({ ...dataForm, nombre: e.target.value })
							}
						/>
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Email
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4 "
							type="text"
							placeholder="Email de registro"
							value={dataForm.email}
							onChange={(e) =>
								setDataForm({ ...dataForm, email: e.target.value })
							}
						/>
						<label className="uppercase text-gray-600 block text-xl font-bold mt-4">
							Password
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4"
							type="password"
							placeholder="Password"
							value={dataForm.password}
							onChange={(e) =>
								setDataForm({ ...dataForm, password: e.target.value })
							}
						/>
						<label className="uppercase text-gray-600 block text-xl font-bold mt-4">
							Repetir Password
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4"
							type="password"
							placeholder="Password"
							value={dataForm.repetirPassword}
							onChange={(e) =>
								setDataForm({ ...dataForm, repetirPassword: e.target.value })
							}
						/>
					</div>
					<input
						type="submit"
						value="iniciar sesion"
						className="bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold
            mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link to="/" className="block my-5 text-center text-gray-500">
						Ya tienes cuenta? Inica Secion
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
