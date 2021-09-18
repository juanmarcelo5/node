const http = require('http');

http.createServer( ( req, res ) =>{
    console.log(req);

    res.write('Hello World');
    res.end();
})
.listen( 8080 );
console.log('Escuchando el puerto',8080);