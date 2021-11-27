const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto,obtenerProductos,eliminarProducto, actualizarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-role');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

//OBTENER TODAS LAS CATEGORIAS
router.get('/',[
    check('id','El no es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProductos);


//OBTENER Una categoria por id - publico
router.get('/:id',[
    check('id','El no es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],
obtenerProductos) 

//Crear un producto - privado -cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)
    

//Actualizar - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
    
],actualizarProducto)

//Borrar producto
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El no es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,

],eliminarProducto);



module.exports = router;