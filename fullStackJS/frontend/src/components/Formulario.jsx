import React, { useState } from "react"
import swal from "sweetalert"
import { usePacientes } from "../hooks/usePacientes"

export const Formulario = () => {
	const [nombre, setNombre] = useState("")
	const [propietario, setPropietario] = useState("")
	const [email, setEmail] = useState("")
	const [fecha, setFecha] = useState("")
	const [sintomas, setSintomas] = useState("")
	const { guardarPaciente } = usePacientes()
	const handleSubmit = (e) => {
		e.preventDefault()
		if ([nombre, propietario, email, fecha, sintomas].includes("")) {
			swal({
				title: "Error",
				text: "Todos los campos son obligatorios",
				icon: "error",
			})
			return
		}
		guardarPaciente({
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		})
	}
	return (
		<>
			<h2 className="font-black text-3xl text-center">
				Administrador de pacientes
			</h2>
			<p className="text-xl mt-5 mb-10 text-center">
				Añade tus pacientes y {""}
				<span className="font-bold text-indigo-600">Administralos</span>
			</p>
			<form
				className="bg-white py-10 px-5 mb-10 lg:mb-0"
				onSubmit={handleSubmit}
			>
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="text-gray-700 uppercase font-bold "
					>
						Nombre Mascota
					</label>
					<input
						type="text"
						id="mascota"
						placeholder="Nombre de la mascota"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="text-gray-700 uppercase font-bold "
					>
						Nombre Propietario
					</label>
					<input
						type="text"
						id="propietario"
						placeholder="Nombre del propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
						value={propietario}
						onChange={(e) => setPropietario(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="email" className="text-gray-700 font-bold uppercase">
						Email del propietario
					</label>
					<input
						type="text"
						id="email"
						placeholder="Nombre del propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="fecha" className="text-gray-700 font-bold uppercase">
						Fecha alta
					</label>
					<input
						type="date"
						id="fecha"
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="sintomas"
						className="text-gray-700 font-bold uppercase"
					>
						Sintomas
					</label>
					<input
						type="text"
						id="sintomas"
						placeholder="Describe los sintomas"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
						value={sintomas}
						onChange={(e) => setSintomas(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					className="bg-indigo-600 w-full p-3 text-white"
					value="Agregar Pacientes"
				/>
			</form>
		</>
	)
}
