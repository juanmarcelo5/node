import { createContext, useState, useEffect } from "react"
import axios from "axios"
import swal from "sweetalert"
const URL_POST = "http://localhost:4000/api/pacientes"


const PacienteContext = createContext()

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([])
  useEffect(() => {
  const obtenerPacientes = async ()=>{
    try {
      const token = localStorage.getItem('token')
      if(!token )return
      const config={
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const {data} =  await axios(URL_POST,config)
      
      setPacientes(data.paciente)
    } catch (error) {
      console.log(error);
    }
  }
  obtenerPacientes()
  }, [])
  

  const guardarPaciente = async (paciente)=>{
    try {
      const token = localStorage.getItem('token')
      const config={
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const {data} =  await axios.post(URL_POST,paciente,config)
      const {createdAt,updatedAt,__v,...pacienteAlmacenado} = data
      setPacientes(pacienteAlmacenado, ...paciente)
      console.log('Paciente registrado correctamente');
    } catch (error) {
      console.log(error.response.data.msg);
      
    }
    
  }
	return (
		<PacienteContext.Provider value={{pacientes,guardarPaciente}}>{children}</PacienteContext.Provider>
	)
}
export default PacienteContext
