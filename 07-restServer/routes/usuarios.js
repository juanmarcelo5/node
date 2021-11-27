
const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-role');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),   
    check('rol').custom( esRolValido ),//no se carga los parametros explicitamente
    validarCampos
], usuariosPut );


router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),//valida que el nombre no este nulo
    check('password','El password es obligatorio').isLength({ min: 6 }),//minimo 6 caracteres
    check('correo').custom( emailExiste ),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),//no se carga los parametros explicitamente
    validarCampos
],usuariosPost );

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos

], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;