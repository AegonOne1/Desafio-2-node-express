const express = require('express');
const morgan = require('morgan')
const fs = require('fs');
const PORT = 3000;

//MIDDLEWARE
const app = express();
app.use(morgan('dev'));
app.use(express.json());

//RUTA HOME
app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

//OBTENER
app.get("/canciones", (req, res) =>{
    try {
        const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({error: 'Error al leer el archivo'});
    };
});

//CREAR
app.post("/canciones", (req, res) =>{
    try {
        const nuevaCancion = req.body;
        const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
        canciones.push(nuevaCancion);
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2));
        res.status(201).send('Cancion agregada al repertorio');
    } catch (error) {
        res.status(500).json({error: 'Error al agregar cancion al archivo'});
    };
});

//EDITAR
app.put("/canciones/:id", (req,res) =>{
    try {
        const id = req.params.id;
        const cancionEditada = req.body;
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
        const index = canciones.findIndex(c => c.id === id);
        if (index === -1){
            return res.status(400).send('Cancion no encontrada');
        };
        canciones[index] = cancionEditada;
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
        res.status(200).send('Cancion Modificada con exito');
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al Modificar la cancion'});
    };
});

//BORRAR
app.delete("/canciones/:id", (req,res) =>{
    try {
        const {id} = req.params;
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
        const index = canciones.findIndex(c => c.id == id);
        canciones.splice(index, 1);
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
        res.status(200).send('Cancion eliminada con exito!');
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar una cancion'});
    };
});

//404 not found type
app.all('*', (req,res) =>{
    res.status(404).send('Ruta no encontrada')
})

app.listen(PORT, console.log(`¡Servidor encendido! http://localhost:${PORT}`));