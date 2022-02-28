import express from 'express'
import { autenticar, comprobarPassword, comprobarToken, confirmar, olvidePassword, perfil, registrar } from '../controllers/veterinarioController.js'
import authCheck from '../middleware/auth.js'

const router = express.Router()

router.post('/',registrar)
router.get('/confirmar/:token',confirmar)
router.post('/login',autenticar)
router.post('/olvide-password',olvidePassword)
router.get('/olvide-password/:token',comprobarToken)
router.post('/olvide-password/:token',comprobarPassword)

//rutas privadas
router.get('/perfil',authCheck,perfil)

export default router