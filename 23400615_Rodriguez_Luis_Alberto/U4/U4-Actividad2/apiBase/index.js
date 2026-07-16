const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3030;

app.use(morgan('dev'));

app.get('/par/:numero', (req,res) => {
    const numero = parseInt(req.params.numero);
   
    if(numero % 2 === 0){
        res.send('Resultado es Par')
    } else {
        res.send('Resultado es impar')
    }

});

app.get('/edad/:edad', (req,res) => {
    const edad = parseInt(req.params.edad);

    if(edad >= 18){
        res.send('Mayor de edad')
    }else{
        res.send('Menor de edad')
    }
});

app.get('/calculadora/:operacion/:a/:b', (req,res) => {
    const operacion = req.params.operacion;
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    switch(operacion){
        case 'suma':
            res.send(`Resultado: ${a+b}`);
            break;
        case 'resta':
            res.send(`Resultado: ${a-b}`);
            break;
        case 'multiplicacion':
            res.send(`Resultado: ${a*b}`);
            break;
        case 'division':
            res.send(`Resultado: ${a/b}`);
            break;
    }
});

app.get('/tabla/:multiplicar', (req,res)=> {
    const multiplicar = parseInt(req.params.multiplicar);
    let tabla='';
    for(let i = 1; i <= 10; i++){
        tabla += `${multiplicar} x ${i} = ${multiplicar*i} <br>`;
    }
    res.send(tabla);
})

app.get('/calificacion/:nota', (req,res) => {
    const nota = parseInt(req.params.nota);

    if(nota < 70){
        res.send('KILLER (Reprobado)');
    }else if(nota < 80){
        res.send('Aprobado');
    }else if(nota < 90){
        res.send('Muy bien');
    }else if(nota > 90 && nota <= 100){
        res.send('Excelente');
    }else{
        res.send('Tu mama es tan pero tan vieja que te amamantaba con leche en polvo');
    }
})

app.listen(PORT, () => {
    console.log('Servidor iniciado en http://localhost:' + PORT);
})