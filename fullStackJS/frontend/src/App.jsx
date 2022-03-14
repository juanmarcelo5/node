import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthLayout } from "./layout/AuthLayout"
import { RutaProtegida } from "./layout/RutaProtegida"
import { AdministrarPacientes } from "./pages/AdministrarPacientes"
import { ConfirmarCuenta } from "./pages/ConfirmarCuenta"
import { Login } from "./pages/Login"
import { NuevoPassword } from "./pages/NuevoPassword"
import { OlvidePassword } from "./pages/OlvidePassword"
import { Register } from "./pages/Register"
import { AuthProvider } from "./context/AuthProvider"
function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path="registrar" element={<Register />} />
						<Route path="olvide-password" element={<OlvidePassword />} />
						<Route path="olvide-password/:token" element={<NuevoPassword />} />
						<Route path="confirmar/:id" element={<ConfirmarCuenta />} />
					</Route>
					<Route path="/admin" element={<RutaProtegida />}>
						<Route index element={<AdministrarPacientes />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
