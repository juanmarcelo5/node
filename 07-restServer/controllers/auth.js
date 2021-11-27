const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require ('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async( req, res = response ) => {
    const { correo, password } =  req.body;
    

    try {
        //vericar que el email exista
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Passowrd no son correcots'
            })
        }

        //verificamos estado 
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario estado:false'
            })
        }

        //validamos la contrase;a
        const validPassword = bcryptjs.compareSync(password,usuario.password)
        
        if( !validPassword ){
            return res.status(400).json({
                msg:'Constrasna incorrecta'
            })
        }

        //GenerarJWT
        const token = await generarJWT( usuario.id)

        /*Retoran el usuaio que se logue y el token*/
        res.json({
            usuario,
            token
            
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Hable con su administrador"
        })
    }


    



}


module.exports = {
    login
}