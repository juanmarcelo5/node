import Paciente from '../models/Paciente.js'
const obtenerPacientes = async (req,res) => {
  const paciente = await Paciente.find().where('veterinario').equals(req.veterinario)

  res.json({
    paciente
  })
}
const obtenerPaciente = async (req,res) => {
  const {id} = req.params;
  const paciente = await Paciente.findById(id)
  
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({
      msg:'Accion no valida'
    })
  }


  res.json({
    paciente
  })
}
const eliminarPaciente = async (req,res)=>{
  const {id} = req.params;
  const paciente = await Paciente.findById(id)
  if(!paciente){
    return res.status(404).json({
      msg:'Paciente no encontrado'
    })
  }
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({
      msg:'Accion no valida'
    })
  }

  try {
    await paciente.deleteOne()
    res.json({msg:'Paciente eliminado correctamente'})
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg:'Ocurrio un error'
    })
  }

}
const actualizarPaciente = async ()=>{
  const {id} = req.params;
  const paciente = await Paciente.findById(id)
  if(!paciente){
    return res.status(404).json({
      msg:'Paciente no encontrado'
    })
  }
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({
      msg:'Accion no valida'
    })
  }

  paciente.nombre =  req.body.nombre
  paciente.nombre =  req.body.nombre
  paciente.nombre =  req.body.nombre
  paciente.nombre =  req.body.nombre
  try {
    const pacienteActualizado = await paciente.save()
    res.json({
      pacienteActualizado
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error
    })
  }


}
const agregaPacientes = async(req,res) => {
  const paciente = new Paciente(req.body)
  paciente.veterinario = req.veterinario._id 
  try {
    const pacienteAlmacenado = await paciente.save()
    res.status(200).json({
      msg:'Paciente almacenado correctamente',
      paciente
    })
    
  } catch (error) {
    console.log(error);
  }
}

export { obtenerPacientes, agregaPacientes,obtenerPaciente,eliminarPaciente,actualizarPaciente }
