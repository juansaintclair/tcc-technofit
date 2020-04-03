const express = require('express')
const app = express();         
const bodyParser = require('body-parser');
const port = 5000;
const alunosDb = require('./alunos.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    res.send("OK");
});

//Get Todos Ativos e Inativos
app.get('/alunos/:page?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Alunos.');
    const page = (req.params.page)?parseInt(req.params.page):1;
    alunosDb.get(res, page, null);
});

//Get Todos Alunos Ativos
app.get('/alunos/ativos/:page?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Alunos Ativos.');
    const page = (req.params.page)?parseInt(req.params.page):1;
    alunosDb.get(res, page, 1);
});

//Get Todos Alunos Inativos
app.get('/alunos/inativos/:page?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Alunos Inativos.');
    const page = (req.params.page)?parseInt(req.params.page):1;
    alunosDb.get(res, page, 2);
});

//Get Get Aluno By Matricula
app.get('/alunos/matricula/:matricula?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Aluno by ID');
    alunosDb.getByMatricula(parseInt(req.params.matricula), res);
})

//Insert Aluno
app.post('/alunos', (req, res) =>{
    console.log('LOG Info: Iniciado POST para Incluir Aluno.');
    alunosDb.add(req.body, res);
})

//Delete Inativação do aluno
app.delete('/alunos/:matricula', (req, res) => {
    console.log('LOG Info: Iniciado Inativação de Aluno');
    alunosDb.del(parseInt(req.params.matricula), res);
})

//Alterar Inativação do aluno
app.patch('/alunos/:matricula', (req, res) => {
    console.log('LOG Info: Iniciado Alteração de Aluno');
    alunosDb.update(parseInt(req.params.matricula), req.body, res);
})

//Start Server
app.listen(port);
console.log('=== API Iniciada ===');