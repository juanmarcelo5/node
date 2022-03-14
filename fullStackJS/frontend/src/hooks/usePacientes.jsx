import React, { useContext } from 'react'
import PacienteContext from '../context/PacientesProvider'

export const usePacientes = () => {
  return useContext(PacienteContext)
}
