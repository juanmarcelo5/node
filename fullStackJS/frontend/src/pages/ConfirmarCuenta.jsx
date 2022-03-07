import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import swal from "sweetalert"

export const ConfirmarCuenta = () => {
  const {id:token} = useParams()
  const [confirmado, setConfirmado] = useState(false)
  useEffect(() => {
    const confirmarCuenta = async ()=>{
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${token}`
        const {data} = await axios(url)
        console.log(data);
        setConfirmado(true)
        
      } catch (e) {
        console.log(e.response);
      }
    } 
    confirmarCuenta()
  }, [])
  const home = ()=>{
    window.location.href = 'http://localhost:3000/'
  }
  
	return (
		<>
			<div>
				<h1 className="text-indigo-600 md:grid font-black text-6xl mt-4">
					Confirma tu cuenta y registra  tus{""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div>
				{confirmado && swal({title:'Registrado',text:'Cuenta confirmada!',icon:'success'}).then(()=> home())}
        <Link to="/" className="block my-5 text-center text-gray-500">
						Iniciar sesion
				</Link>
			</div>
		</>
	)
}
