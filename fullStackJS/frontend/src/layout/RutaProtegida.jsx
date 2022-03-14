import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import useAuth from "../hooks/useAuth"

export const RutaProtegida = () => {
	const { auth, cargando } = useAuth()
	if (cargando) {
		return "cargando"
	}
	return (
		<>
			<Header />

			{auth?._id ? <Outlet /> : <Navigate to="/" />}
			<Footer />
		</>
	)
}
