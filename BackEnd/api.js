const express = require('express')
const cors = require('cors')
const app = express();         
const bodyParser = require('body-parser');
const port = 5000;
const alunosDb = require('./alunos.js');
const pagamentos = require('./pagamentos.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/healthcheck', (req, res) => {
    res.send("OK");
});

//Get Todos Ativos e Inativos
app.get('/alunos/:page?/:status?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Alunos.');
    const page = (req.params.page)?parseInt(req.params.page):1;
    alunosDb.get(res, page, parseInt(req.params.status));
});

//Get Todos Ativos e Inativos
app.get('/todosinadimplentes', (req, res) =>{
    console.log('LOG Info: Iniciado Get All Alunos Inadimplentes.');
    alunosDb.getAllInadimplentes(res);
});

app.get('/todosAlunos', (req, res) =>{
    console.log('LOG Info: Iniciado Get All Alunos.');
    alunosDb.getAll(res);
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
app.get('/alunosmatricula/:matricula/:page?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Aluno by ID');
    alunosDb.getByMatricula(parseInt(req.params.matricula), res);
})

//Get Get Aluno By Nome
app.get('/alunos/nome/:nome?/:page?', (req, res) =>{
    console.log('LOG Info: Iniciado Get Aluno by Nome');
    const page = (req.params.page)?parseInt(req.params.page):1;
    alunosDb.getByName(req.params.nome.toString(), page, res);
})

//Insert Aluno
app.post('/alunos', (req, res) =>{
    console.log('LOG Info: Iniciado POST para Incluir Aluno.');
    alunosDb.add(req.body, res);
})

//Insert Pagamento por Matrícula
app.post('/pagamentos/:matricula', (req, res) =>{
    console.log('LOG Info: Iniciado POST para Incluir Pagamento.');
    pagamentos.add(parseInt(req.params.matricula), res);
})

//Realizar Pagamento por Matrícula
app.post('/realizarpagamento/:matricula/:valor', (req, res) =>{
    console.log('LOG Info: Iniciado POST para Realizar Pagamento.');
    pagamentos.pay(parseInt(req.params.matricula), parseInt(req.params.valor), res);
})

//Get Pagamento por Matrícula
app.get('/pagamentomatricula/:matricula', (req, res) =>{
    console.log('LOG Info: Iniciado Get pagamento por matrícula.');
    pagamentos.get(parseInt(req.params.matricula), res);
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