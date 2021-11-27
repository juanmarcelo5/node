const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-role');
const { validarCampos } = require('../middlewares/validar_campos');
const router = Router();

//OBTENER TODAS LAS CATEGORIAS
router.get('/',obtenerCategorias);


//OBTENER Una categoria por id - publico
router.get('/:id',[
    check('id','El no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
obtenerCategoria)

//Crear una nueva categoria - privado -cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos

    ],crearCategoria)

//Actualizar - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
    
],actualizarCategoria)

//Borrar categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,

],eliminarCategoria);



module.exports = router;