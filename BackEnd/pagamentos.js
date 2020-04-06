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

async function add(matricula, res) {
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

function addByMatricula(matricula, res) {
    //@TODO verificar se é melhor fazer essa função ou se é melhor fazer tudo na mesma função de cima. 
    //Mas tem que pegar o aluno por matrícula do banco e não do json que vem.
}

module.exports = {
    add: add
}