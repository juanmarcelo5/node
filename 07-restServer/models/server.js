const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        this.pahts = {
                auth: '/api/auth',
                categorias:'/api/categorias',
                usuarios:'/api/usuarios',
                productos:'/api/productos',
                buscar:'/api/buscar'
        }
    
      
        
        //conectar DB
        this.conectarDb();
        
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
    
    async conectarDb(){
        await dbConection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.pahts.auth, require('../routes/auth'));
        this.app.use( this.pahts.usuarios, require('../routes/usuarios'));
        this.app.use( this.pahts.categorias, require('../routes/categorias'));
        this.app.use( this.pahts.productos, require('../routes/productos'));
        this.app.use( this.pahts.buscar, require('../routes/buscar'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
