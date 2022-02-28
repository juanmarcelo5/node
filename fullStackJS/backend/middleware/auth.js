import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js'
const authCheck = async (req, res, next) => {
	let token
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(403).json({
			msg: 'No tiene token valido',
		})
	}

	try {
		token = authorization.split(' ')[1]
		const decode = jwt.verify(token, process.env.JWT_SECRET)
		req.veterinario = await Veterinario.findById(decode.id).select("-password -token -confirmado ")
		return next()
	} catch (error) {
		return res.status(403).json({
			msg: 'No tiene token valido',
			error: error.message,
		})
	}
}

export default authCheck
