const express = require('express');
const morgan = require('morgan')
const fs = require('fs');
const PORT = 3000;

const app = express();

//MIDDLEWARE

app.use(morgan('dev'));


//RUTA
app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})
app.get("/canciones", (req, res) =>{
    res.send("Hello");
});

//OBTENER
app.post("/canciones", (req, res) =>{
    res.res('SOY UN POST')
})

//CREAR


//EDITAR


//BORRAR


app.listen(PORT, console.log(`¡Servidor encendido! Http://localhost:${PORT}`));