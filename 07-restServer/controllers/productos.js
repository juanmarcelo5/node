const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async ( req, res=response)=>{
    const { limit = 5 , desde = 0 } = req.query;
    //const total = await Categoria.countDocuments({ estado: true });   
    const query = { estado: true };

    //la venaaja del promise all es qque se se se ejecuta ambos al mismo timepo
    const [ total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .populate('usuario','nombre')
                .skip( Number( desde ) )
                .limit( Number( limit ))
    ])      
    
    res.json({
        total,
        productos
    });


}

const obtenerProducto = async( req, res=response)=>{
    const {id} = req.params
    console.log(id);

    const producto = await Producto.findById(id)
                                .populate('usuario','nombre')
                                .populate('categoria','nombre');
    /* if( !categoria ){
        return res.json({
            msg:'ID categoria no validad'
        })
    } */

    res.json(categoria)
}

const crearProducto =async (req, res =response )=>{
    
    const {estado,usuario, ...body} = req.body;
    const nombre= body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre});

    if ( productoDB ) {
        return res.status(401).json({
            msg: `El producto ${nombre} ya existe`
        })
    }

    //generar la data  a guardar
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto( data );
    
    //guardar en la db
    await producto.save();

    res.status(201).json( producto  )



};


const actualizarProducto = async (req, res = response )=>{
   
    const {id} = req.params  
/**
 * Se extrae todos los datos excepto el ESTADO Y USUARIO
 */
    const {estado,usuario,...data} = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario.__id;

    const producto   = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);



}

const eliminarProducto = async(req, res =response)=>{
    const {id} = req.params;    
    const productoBorrada = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json(productoBorrada);
}
module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};