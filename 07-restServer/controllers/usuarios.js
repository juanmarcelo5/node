const { response, request } = require('express');
const bcryp = require('bcryptjs')
const Usuario =  require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limit = 5 , desde = 0 } = req.query;
   /*  const usuarios = await Usuario.find({ estado: true })
                    .skip( Number(desde) )
                    .limit(Number(limit));

    const total = await Usuario.countDocuments({ estado: true }); */  
    const query = { estado: true };

    //la venaaja del promise all es qque se se se ejecuta ambos al mismo timepo
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip( Number( desde ) )
                .limit( Number( limit ))
    ])              

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
  
    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario( req.body)


//encriptar la contrase;a
    const salt = bcryp.genSaltSync(10);
    usuario.password =  bcryp.hashSync( password, salt);

// guardamos en la db    
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id,password, google,correo, ...resto} = req.body

    //Validar contra la base de datos
    if( password ){
        //encriptar la contrase;a
        const salt = bcryp.genSaltSync(10);
        resto.password =  bcryp.hashSync( password, salt);
            
    }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
  
    
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    console.log(id);

    const usuario  = await Usuario.findByIdAndUpdate(id,{estado: false});
    //const usuarioAutenticado = req.usuario;

    res.json(usuario)

    
    res.json({
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}