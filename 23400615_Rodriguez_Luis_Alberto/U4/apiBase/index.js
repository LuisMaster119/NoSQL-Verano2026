const express  = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
const PORT = 3000;

app.use(morgan('dev'));

let alumnos = [
    {
        id:1,
        nombre:'Luis',
        carrera:'ISC',
        semestre: 9
    },
    {
        id:2,
        nombre:'Diego',
        carrera:'ARQ',
        semestre:6
    }
]

app.post('/alumnos', (req,res) => {
    const {nombre, carrera, semestre} = req.body;
    if(!nombre || !carrera || !semestre){
        return res.status(400).json({
            mensaje:'Faltan datos del alumno'
        });
    }

    const nuevoAlumno = {
        id: alumnos.length+1,
        nombre: nombre,
        carrera: carrera,
        semestre: semestre
    }

    alumnos.push(nuevoAlumno)
    res.json({
        mensaje:'Alumno registrado correctamente',
        alumno: nuevoAlumno
    });
})

app.put('/alumnos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {nombre,carrera,semestre} = req.body;

    if(!nombre || !carrera || !semestre){
        return res.status(400).json({
            mensaje:'Faltan datos del alumno'
        });
    }

    const indice = alumnos.findIndex(alumno => alumno.id === id);

    if(indice ===-1){
        return res.status(404).json({
            mensaje:'Alumno no encontrado'
        });
    }

    alumnos[indice]={
        id:id,
        nombre: nombre,
        carrera: carrera,
        semestre: semestre
    }

    res.json({
        mensaje: 'Alumno actualizado correctamente',
        alumno: alumnos[indice]
    })
})

app.get('/alumnos',(req,res)=>{
    res.json(alumnos);
})

app.get('/alumnos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const alumno = alumnos.find(alumno => alumno.id === id);

    if(!alumno){
        return res.status(404).json({
            mensaje:'Alumno no encontrado'
        });
    }

    res.json(alumno);
})

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});

app.get('/mensaje', (req,res)=>{
    res.send('Mensaje desde Express');
});

app.get('/pagina',(req,res)=>{
    const nombre = 'Luis';
    res.send(`
        <style>
            .p1{
                color: red;
                background: blue;
            }
        </style>
        <h1>Mi pagina web</h1>
        <p class='p1'>Creada con Express</p>  
        <p>Hola ${nombre}</p>  
    `);
});

app.get("/alumno", (req, res) => {
    res.json({
        nombre:'Luis',
        carrera:'ISC',
        semestre:7
    });
});

app.get('/materias', (req,res) => {
    res.json([
        {
            nombre: 'NoSQL',
            hora:'8:00-11:00'
        },
        {
            nombre: 'Programación WEB',
            hora:'14:00-17:00'
        }
    ])
});

app.get('/mensaje/:nombre',(req,res)=>{
    res.send(`Hola ${req.params.nombre}`);
});

app.get('/suma/:a/:b',(req,res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`Resultado ${a+b}`);
});

app.get('/multiplicar/:a/:b',(req,res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`Resultado ${a*b}`);
});

app.get('/aleatorio',(req,res)=>{
    const numero = Math.floor(Math.random()*100)+1;
    res.send(`Numero generado: ${numero}`);
});

app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:"+PORT);
});