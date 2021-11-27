const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario =  require('../models/usuario');

const validarJWT =async ( req = request,res = response,next ) => {
    const token =req.header('xtoken');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }


    try {

        const {uid} = jwt.verify(token,process.env.SECRETKEY)  ;  

        /*leer el usuario que corresponde al ID*/
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            
            res.status(401).json({
                msg: ' Usuario no existe en BD'
            })
        }
        
        //verificar si el UID no esta en false
        if ( !usuario.estado ) {
            
        }


        
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: ' token no valido'
        })
    }

}

module.exports ={
    validarJWT
}