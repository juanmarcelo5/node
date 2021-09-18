const express = require('express');
const app = express();
app.set('view engine','hbs');

//servir contenido estatico
app.use( express.static('public'))

/* app.get('/', function ( req, res ) {
    res.send('hello world');
}) */

/* app.get('/hola-mundo', function ( req, res ) {
    res.send('Hola mundo en su respectiva ruta');
}) */
 app.get('/generic', function ( req, res ) {
    res.sendFile(__dirname + '/public/generic.html');
}) 
app.get('/elements', function ( req, res ) {
    res.sendFile(__dirname + '/public/elements.html');
}) 



//en el caso de que no se busque ninguna ruta 
app.get('*', function ( req, res ) {
    res.sendFile(__dirname + '/public/404.html');
})
app.listen(8081)