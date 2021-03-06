const { response, request } = require("express");
const { ObjectId }=require('mongoose').Types;
const {Usuario}= require('../models')

const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '',res=response )=>{
    const esMongoID =ObjectId.isValid(termino) //TRUE
    
    if ( esMongoID ) {
           const usuario = await Usuario.findById(termino) ;
          return  res.json({
               results: (usuario) ? [usuario] : []
           })
    }
}

const buscar = async ( req = request,res = response )=>{
    const {coleccion,termino} = req.params;
  
    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`

        })
    };

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino,res);
        break;
        case 'categoria':
            
        
        break;
        case 'productos':
        
        break;
        default:
        res.status(500).json({
            msg:'Se olvido de hacer esta busqueda'
        })          
    

    }

    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex},{correo:regex}]
    })

    res.json({
       results:usuarios
    })
}

module.exports={
    buscar
}