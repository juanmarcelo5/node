const { request, response } = require("express");
const {Categoria} = require("../models");//como utilizamos index no hace falta especificar


// -paginado - total -populate
const obtenerCategorias = async( req, res=response)=>{
    const { limit = 5 , desde = 0 } = req.query;
    //const total = await Categoria.countDocuments({ estado: true });   
    const query = { estado: true };

    //la venaaja del promise all es qque se se se ejecuta ambos al mismo timepo
    const [ total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
                .populate('usuario','nombre')
                .skip( Number( desde ) )
                .limit( Number( limit ))
    ])      
    
    res.json({
        total,
        categorias
    });



}
const obtenerCategoria = async( req, res=response)=>{
    const {id} = req.params
    console.log(id);

    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    /* if( !categoria ){
        return res.json({
            msg:'ID categoria no validad'
        })
    } */

    res.json(categoria)
}

const crearCategoria = async( req = request, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({nombre});

    if ( categoriaDB ) {
        return res.status(401).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    //generar la data  a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    
    //guardar en la db
    await categoria.save();

    res.status(201).json( categoria  )

}

//actualizar categoria
const actualizarCategoria = async (req, res = response )=>{
   
        const {id} = req.params  
    /**
     * Se extrae todos los datos excepto el ESTADO Y USUARIO
     */
        const {estado,usuario,...data} = req.body
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario.__id;
    
        const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    
        res.json(categoria);
   


}
const eliminarCategoria = async(req, res =response)=>{
    const {id} = req.params;    
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json(categoriaBorrada);
}
module.exports= {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria 

}