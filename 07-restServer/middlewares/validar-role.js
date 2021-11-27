const { response, request } = require("express")

const esAdminRole = ( req= request, res= response )=>{

    if ( !req.usuario ) {
        return res.status(500).json({msg: 'Se quiere verificar el ROLE sin validar el token'})
        
    }
    const {rol,nombre} = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({msg: `El usuario ${nombre} no es Administrador`});

        
    }

    next()
}
//utilizamos el operador spread para obtener todos los roles
//noo hace falta declar uno a uno sus parametros
const tieneRole = ( ...roles )=>{

    return (req,res,next)=>{
        if ( !req.usuario ) {
            return res.status(500).json({msg: 'Se quiere verificar el ROLE sin validar el token'})
            
        };
        
        if ( !roles.includes(req.usuario.rol) ) {
            return res.status(401).json({msg: `El usuario ${req.usuario.nombre} no tiene role${roles}`});

        
        }

        next();
    }


}

module.exports={
    esAdminRole,
    tieneRole
}