const { check } = require('express-validator');
const Role = require('../models/roles');

const {Categoria,Usuario, Producto} =  require('../models/');

const esRolValido = async ( rol = '' ) =>{
    const existeRol = await Role.findOne({ rol })
           if( !existeRol ){
               throw new Error(`El rol ${rol} no esta registrado en la DB`);
           }

}

const emailExiste  = async ( correo = '' ) => {
    //verificar correo exista
    const existeEmail = await Usuario.findOne( { correo } )
    if(existeEmail){
        throw new Error(`El correo ${correo}ya esta registrado   `)
    }

}

const existeUsuarioPorId = async( id = '' ) =>{
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El  ID: ${id} no esta registrado en la DB`);
    }

}
/**
 * Categorias validadores
 */
const existeCategoriaPorId =async ( id )=>{
    const existeCategoria = Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe${id}`);
    }

}

const existeProductoPorId =async ( id )=>{
    const existeProducto = Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe${id}`);
    }

}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas  = ( coleccion = '', colecciones = []) =>{
    const incluida = colecciones.includes( coleccion);

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
        
    }
    return true;
}
module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}