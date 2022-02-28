import express from 'express'
import { agregaPacientes, obtenerPacientes,obtenerPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacienteController.js'
import authCheck from '../middleware/auth.js'
const router = express.Router()

router.route('/')
  .get(authCheck,obtenerPacientes)
  .post(authCheck,agregaPacientes)
router.route('/:id')
  .get(authCheck,obtenerPaciente)
  .put(authCheck,actualizarPaciente)
  .delete(authCheck,eliminarPaciente)

export default router