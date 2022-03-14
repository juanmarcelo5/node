import { request } from 'express';
import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js'
const authCheck = async (req = request, res, next) => {
	let token
	
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
	try {
		token = req.headers.authorization.split(' ')[1]
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
}

export default authCheck
