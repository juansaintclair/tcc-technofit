const mysql = require('mysql');
const config = require('./mysql-config.js');


function _insertPayment(matricula, dataPagamento, res) {
    console.log("LOG INFO: Inserir pagamento para o aluno.");
    let connection = mysql.createConnection(config);
    const arrNewPayment = [matricula, dataPagamento, 1]
    let sql = `INSERT INTO\
        pagamento\
            (aluno_matricula, dataPagamentoPrevisto, status)\
        VALUES\
            (?, ?, ?)\
        `;
        connection.query(sql, arrNewPayment, function(error, results, fields){
            if (error)  {
                res.status(500).send({error: "Erro inesperado."})
                console.log('LOG Error: ', error);
            }
            console.log("LOG INFO: Pagamento incluído com sucesso para o aluno de matrícula:", matricula);
            res.status(200).send({message: "Cadastrado com sucesso."})
            connection.end();    
        });
}

function _defineFirstPayment() {
    console.log("LOG INFO: Definindo primeiro pagamento.");
    let firstPayment = new Date();
        firstPayment = `${firstPayment.getFullYear()}-${firstPayment.getMonth() + 1}-${firstPayment.getDate()}`;

    return firstPayment;    
}

function _defineNextPayment(tipoPlano, ultimoPagamento, diaPagamento) {
    console.log("LOG INFO: Definindo próximo pagamento.");

    let nextPayment;
    if (tipoPlano === 1) {
        console.log("LOG INFO: Tipo de plano Mensal");
        nextPayment = `${ultimoPagamento.getFullYear()}-${ultimoPagamento.getMonth() + 2}-${diaPagamento}`;
    } else if (tipoPlano === 2) {
        console.log("LOG INFO: Tipo de plano Anual");
        nextPayment = `${ultimoPagamento.getFullYear() +1}-${ultimoPagamento.getMonth() + 1}-${diaPagamento}`;
    }
    return nextPayment;
}

function add(matricula, res) {
    console.log("LOG INFO: Entrou na função de add Pagamento.")
    config.multipleStatements = true;
    let connection = mysql.createConnection(config);
    let sql = "SELECT dataPagamentoPrevisto FROM pagamento WHERE aluno_matricula = ? ORDER BY dataPagamentoPrevisto desc LIMIT 1;SELECT * FROM aluno WHERE matricula = ?";
    
    connection.query(sql, [matricula, matricula], function(error, results, fields){
        if (error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }        
        
        ultimoPagamento = (results[0].length >=1)?results[0][0].dataPagamentoPrevisto:[];
        aluno = results[1][0];

        let datePayment;
        if (ultimoPagamento.length === 0) {
            console.log("LOG INFO: Não há pagamento registrado.");
            datePayment = _defineFirstPayment();
        } else {
            console.log("LOG INFO: Existe pagamento registrado.");
            datePayment = _defineNextPayment(aluno.tipoPlano_idtipoPlano, ultimoPagamento, aluno.diaPagamento);
        } 
        _insertPayment(matricula, datePayment, res);
    });    
    connection.end();    
}

function get(matricula, res) {
    console.log("LOG INFO: Entrou na função de get Pagamento by matrícula.")
    config.multipleStatements = true;
    let connection = mysql.createConnection(config);

    let sql = `SELECT p.idPagamento, p.dataPagamentoEfetuado, p.valorPago, p.aluno_matricula as matricula, p.dataPagamentoPrevisto, p.status, a.valorMensalidade\
    FROM technofit.pagamento as p\ 
    LEFT JOIN technofit.aluno as a\
       on a.matricula = p.aluno_matricula\
    where aluno_matricula=?
    ORDER BY p.dataPagamentoPrevisto desc;`
    connection.query(sql, [matricula], function(error, results, fields){
        if (error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }        

        console.log("LOG INFO: Select pagamento by matrícula realizado com sucesso.");
        res.json({
            result: results,
        });
    });    
    connection.end();    
}


function pay(idPagamento, valor, res) {
    console.log("LOG INFO: Entrou na função de realizar Pagamento.");
    config.multipleStatements = true;
    let today = new Date();
        today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let connection = mysql.createConnection(config);
    let sql = "UPDATE pagamento SET dataPagamentoEfetuado = ?, valorPago = ?, status = 2 WHERE idPagamento = ?;SELECT aluno_matricula FROM pagamento WHERE idPagamento = ?;";

    connection.query(sql, [today, valor, idPagamento, idPagamento], function(error, results, fields){
        if (error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }        
        console.log('LOG INFO: Pagamento realizado com sucesso.');

        add(results[1][0].aluno_matricula, res);
        // _defineStatusAluno(results[1][0].aluno_matricula, res);
    });    
    connection.end();    
}

// function _defineStatusAluno(matricula) {
//     console.log("LOG INFO: Entrou na função de verificar status do aluno.");
//     let connection = mysql.createConnection(config);
//     let sql = "select * from pagamento where aluno_matricula = 95 ORDER BY DataPagamentoEfetuado desc LIMIT 1;"
//     connection.query(sql, [today, valor, idPagamento, idPagamento], function(error, results, fields){
//         if (error)  {
//             res.status(500).send({error: "Erro inesperado."})
//             console.log('LOG Error: ', error);
//         }        
//         console.log('LOG INFO: Pagamento realizado com sucesso.');

//         add(results[1][0].aluno_matricula, res);
//         _defineStatusAluno(results[1][0].aluno_matricula, res);
//     });    
//     connection.end();    
// }


module.exports = {
    add: add,
    get: get,
    pay: pay
}