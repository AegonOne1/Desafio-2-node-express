const express = require('express');
const morgan = require('morgan')
const fs = require('fs');
const PORT = 3000;

//MIDDLEWARE
const app = express();
app.use(morgan('dev'));

//RUTA HOME
app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

//OBTENER
app.get("/canciones", (req, res) =>{
    try {
        const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({error: 'Error al leer el archivo'});
    }
});

//CREAR
app.post("/canciones", (req, res) =>{
    res.res('SOY UN POST')
})


//EDITAR


//BORRAR


app.listen(PORT, console.log(`¡Servidor encendido! http://localhost:${PORT}`));