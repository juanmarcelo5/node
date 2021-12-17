require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const app = express();
let port = process.env.PORT;
app.set('view engine','hbs');


//servir contenido estatico
app.use( express.static('public'))
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', ( req, res ) => {
    res.render('home',
    {
        nombre: 'Juan Marcelo',
        titulo: 'Curso de Node'
    });
})
app.get('/elements', ( req, res ) => {
    res.render('elements',
    {
        nombre: 'Juan Marcelo',
        titulo: 'Curso de Node'
    });
})
app.get('/generic', ( req, res ) => {
    res.render('generic',
    {
        nombre: 'Juan Marcelo',
        titulo: 'Curso de Node'
    });
})

/* app.get('/hola-mundo', function ( req, res ) {
    res.send('Hola mundo en su respectiva ruta');
}) */
/*  app.get('/generic', function ( req, res ) {
    res.sendFile(__dirname + '/public/generic.html');
}) 
app.get('/elements', function ( req, res ) {
    res.sendFile(__dirname + '/public/elements.html');
}) 
 */


//en el caso de que no se busque ninguna ruta 
app.get('*', function ( req, res ) {
    res.sendFile(__dirname + '/public/404.html');
})
app.listen(port)