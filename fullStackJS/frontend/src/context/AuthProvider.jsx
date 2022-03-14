import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
 const  AuthContext = createContext()
const URL_AUTH = "http://localhost:4000/api/veterinarios/perfil"

const AuthProvider = ({ children }) => {
	const [cargando, setCargando] = useState(true)
	const [auth, setAuth] = useState({})
	useEffect(() => {
		const autenticarUsuario = async () => {
			const token = localStorage.getItem("token")
			if (!token) {
				setCargando(false)
				return
			}

			const config = {
				headers: {
					'Content-Type':'application/json',
					Authorization:'Bearer '+ token,
				},
			}
			try {
				const {data} = await axios.get(URL_AUTH,config)
				setAuth(data.veterinario)
				setCargando(false)
			} catch (error) {
				console.log(error.response.data.msg)
				setAuth({})
				return
			}
		}
		autenticarUsuario()
	}, [])

	const cerrarSesion = ()=>{
		localStorage.removeItem('token')
		setAuth({})
	}

	return (
		<AuthContext.Provider value={{ auth, setAuth ,cargando,setCargando,cerrarSesion}}>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthProvider}
export default AuthContext