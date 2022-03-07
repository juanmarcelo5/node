import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import swal from "sweetalert"
const URL_OLVIDE = "http://localhost:4000/api/veterinarios/olvide-password"

export const NuevoPassword = () => {
	const [password, setPassword] = useState("")
	const [tokenValido, setTokenValido] = useState(false)
	const params = useParams()
	const { token } = params
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await axios(`${URL_OLVIDE}/${token}`, { password })
				swal({
					title: "Success",
					text: "Ingrese ahora tu nuevo password",
					icon: "success",
				})
				setTokenValido(true)
				return
			} catch (error) {
				swal({
					title: "Error",
					text: error.response.data.msg,
					icon: "error",
				})
        setTokenValido(false)
        return
			}
		}
		comprobarToken()
	}, [])
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password.length < 6) {
			swal({
				title: "Error",
				text: "El password debe tener mas de 6 caracteres",
				icon: "error",
			})
			return
		}

		try {
			const url = `${URL_OLVIDE}/${token}`
			const { data } = await axios.post(url, { password })
			swal({
				title: "Success",
				text: data.msg,
				icon: "success",
			})
		} catch (error) {
			console.log(error.response)
			swal({
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
					Recupera tu password y no pierdas acceso a tus {""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			{tokenValido && (
				<form className="mt-4" onSubmit={handleSubmit}>
					<div>
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Nuevo Password
						</label>
						<input
							className="border w-full p-3 bg-gray-50 rounded-2xl mt-4 "
							type="password"
							placeholder="Tu nuevo password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<input
						type="submit"
						value="Guardar Nuevo password"
						className="bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold
            mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
					/>
				</form>
			)}
		</>
	)
}
