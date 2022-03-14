import React from 'react'

export const Paciente = ({paciente}) => {
  const {email,fecha,nombre,propietario,sintomas,_id}=paciente
  return (
    <div className='mx-5 my-10 bg-gray-100 shadow-md px-5 py-5 rounded-xl'>
      <p className='font-bold uppercase text-indigo-600'>Nombre:{''} <span className='font-normal normal-case text-black'>{nombre}</span></p>  
    </div>
  )
}
  