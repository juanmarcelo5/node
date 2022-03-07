import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import generarId from '../helpers/generarId.js'
import emailRegistro from '../helpers/emailRegister.js'
import EmailOlvidePassword from '../helpers/emailOlvidePassword.js'

const registrar = async (req, res) => {
	const { email,nombre } = req.body
	//verificar usuario duplicado
	const existeUsuario = await Veterinario.findOne({ email })
	if (existeUsuario) {
		return res.status(400).json({ msg: 'Usuario ya registrado' })
	}

	try {
		//guardar nuevo veterinario
		const veterinario = new Veterinario(req.body)
		const veterinarioGuardado = await veterinario.save()

		//enviamos el email
		emailRegistro({
			email,
			nombre,
			token:veterinarioGuardado.token
		})


		res.status(200).json({
			msg: 'Registrado correctamente',
			veterinarioGuardado,
		})
	} catch (error) {
		console.log(error)
	}
}
const perfil = (req, res) => {
	res.status(200).json({
		veterinario: req.veterinario,
	})
}
const confirmar = async (req, res) => {
	const { token } = req.params
	const usuarioConfirmar = await Veterinario.findOne({ token })
	if (!usuarioConfirmar) {
		return res.status(404).json({
			msg: 'Token no valido',
		})
	}

	try {
		usuarioConfirmar.token = null
		usuarioConfirmar.confirmado = true
		await usuarioConfirmar.save()
		res.status(200).json({
			msg: 'Usuario confirmado correctamente',
		})
	} catch (error) {
		console.log(error)
		return res.status(404).json({
			msg: 'Ocurrio un error inesperado',
		})
	}
}
const autenticar = async (req, res) => {
	const { email, password } = req.body
	//comprobar si el usuario existe
	const usuario = await Veterinario.findOne({ email })

	if (!usuario) {
		return res.status(404).json({
			msg: 'Usuario no existe',
		})
	}
	//comprobar usuario estar confirmado
	if (!usuario.confirmado) {
		return res.status(404).json({
			msg: 'Cuenta no ha sido confirmada',
		})
	}

	//revisar pass
	if (!(await usuario.comprobarPassword(password))) {
		return res.status(404).json({
			msg: 'Usuario o contrase incorrecto',
		})
	}
	res.json({
		token: generarJWT(usuario._id),
	})
}

const olvidePassword = async (req, res) => {
	const { email } = req.body
	const existeVeterinario = await Veterinario.findOne({ email })
	if (!existeVeterinario) {
		return res.status(400).json({
			msg: 'Usuario no existe',
		})
	}

	try {
		existeVeterinario.token = generarId()
		await existeVeterinario.save()
		EmailOlvidePassword({
			email,
			nombre:existeVeterinario.nombre,
			token:existeVeterinario.token
		})
		res.json({
			msg: 'Hemos enviado un email con las instrucciones',
		})
	} catch (error) {}
}
const comprobarToken = async (req, res) => {
	const { token } = req.params
	const tokenValido = await Veterinario.findOne({ token })
	if (!tokenValido) {
		return res.status(400).json({
			msg: 'Token no valido',
		})
	}


	res.json({
		msg:'token valido'
	})
}
const comprobarPassword = async (req, res) => {
	const { token }  = req.params
	const {password} = req.body
	const veterinario = await Veterinario.findOne({ token })
	if (!veterinario) {
		return res.status(400).json({
			msg: 'Token no valido',
		})
	}

	try {
		veterinario.token = null 
		veterinario.password = password
		await veterinario.save()
		res.status(200).json({
			msg:'Password modificado correctamente'
		})
	} catch (error) {
		res.status(400).json({
			msg:'Ocurrio un error'
		})
	}

}

export {
	registrar,
	perfil,
	confirmar,
	autenticar,
	olvidePassword,
	comprobarPassword,
	comprobarToken,
}
