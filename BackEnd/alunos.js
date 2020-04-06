const mysql = require('mysql');
const config = require('./mysql-config.js');
const pagamentos = require('./pagamentos.js')
//@TODO validar cpf antes de cadastrar o aluno.
const rowsPerPage = 10;


function _limit(page) {
    //@TODO Verificar itens da paginação, está vindo um item da página anterior.
    let start = ((page-1) * rowsPerPage)+1;
    let final = start + (rowsPerPage);
    let limit = `${start},${final}`; 
    return limit;
}

function get(res, page, status) {
    let limit = _limit(page);
    
    const params =  [status];   
    
    let sql;
    sql = `SELECT aluno.matricula, aluno.nome, aluno.identidade, aluno.dataInscricao, aluno.email, aluno.telefone, aluno.endereco, aluno.valorMensalidade, tipoPlano.Nome as plano, ativo, diaPagamento, statuspagamento.nome as status\
            FROM technofit.aluno\
            INNER JOIN tipoplano\
                on aluno.tipoPlano_idtipoPlano = tipoPlano.idtipoPlano \
            INNER JOIN statuspagamento\
                on aluno.statuspagamento_idstatusPagamento = statuspagamento.idstatusPagamento WHERE `;
    sql += (status)?`ativo= ? `:`ativo = 1 OR ativo = 2 `;                
    sql += `ORDER BY\
                matricula desc `;
    sql += `LIMIT ${limit} `;
                    
    let connection = mysql.createConnection(config);
    connection.query(sql, params, function(error, results, fields){
        if(error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }
        else {
            console.log('LOG Info: Query realizada com sucesso.');  
            res.json({
                result: results,
                page: page,
                items: rowsPerPage
            });
        }
        connection.end();
    });                       
}

function getByName(nome, page, res) {
    nome = `%${nome}%`;
    let connection = mysql.createConnection(config);
    let limit = _limit(page);

    let sql = `SELECT\ 
                aluno.matricula, aluno.nome, aluno.identidade, aluno.dataInscricao, aluno.email, aluno.telefone, aluno.endereco, aluno.valorMensalidade, tipoPlano.Nome as plano, ativo, diaPagamento, statuspagamento.nome as status\
                FROM technofit.aluno\
                INNER JOIN tipoplano\
                    on aluno.tipoPlano_idtipoPlano = tipoPlano.idtipoPlano\
                INNER JOIN statuspagamento\
                    on aluno.statuspagamento_idstatusPagamento = statuspagamento.idstatusPagamento\
                WHERE aluno.nome like ?\
                ORDER BY\
                    matricula desc `
    sql += `LIMIT ${limit}; `;

    connection.query(sql, [nome], function(error, results, fields) {
        if (error) {
            throw error;
        }
        console.log('LOG Info: Buscar aluno por nome realizado com sucesso.');  
         res.json({
                result: results,
                page: page,
                items: rowsPerPage
            });
    });
     
    connection.end();
}

function getByMatricula(matricula, res) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT\ 
                aluno.matricula, aluno.nome, aluno.identidade, aluno.dataInscricao, aluno.email, aluno.telefone, aluno.endereco, aluno.valorMensalidade, tipoPlano.Nome as plano, ativo, diaPagamento, statuspagamento.nome as status\
                FROM technofit.aluno\
                INNER JOIN tipoplano\
                    on aluno.tipoPlano_idtipoPlano = tipoPlano.idtipoPlano\
                INNER JOIN statuspagamento\
                    on aluno.statuspagamento_idstatusPagamento = statuspagamento.idstatusPagamento\
                WHERE matricula = ?\
                ORDER BY\
                    matricula desc;`

    connection.query(sql, [matricula], function(error, results, fields) {
        if (error) {
            throw error;
        }
        console.log('LOG Info: Buscar aluno por matrícula realizado com sucesso.');  
        res.json({result: results});
    });
     
    connection.end();
}

function del(matricula, res) {
    let connection = mysql.createConnection(config);
    let sql = "UPDATE aluno SET ativo = 2 WHERE matricula = ? ";

    connection.query(sql, [matricula], function(error, results, fields) {
        if (error) {
            throw error;
        }
        console.log('LOG Info: Buscar aluno por matrícula realizado com sucesso.');  
        res.status(200).send({resut: {message: "Aluno inativado com sucesso."}})
    });
     
    connection.end();
}

function add(aluno, res) {
    let connection = mysql.createConnection(config);
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let sql = `INSERT INTO\
                aluno\
                    (nome, identidade, dataInscricao, cpf, email, telefone, endereco, valorMensalidade, tipoPlano_idtipoPlano, tipoUsuario_idtipoUsuario, ativo, diaPagamento, statuspagamento_idstatusPagamento)\
                VALUES\
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\
                `;
    const arrAluno = [
        aluno.nome, 
        aluno.identidade, 
        today, 
        aluno.cpf, 
        aluno.email, 
        aluno.telefone, 
        aluno.endereco, 
        aluno.valor, 
        aluno.plano, 
        1, 
        1,
        aluno.diaPagamento,
        2
    ];    
    connection.query(sql, arrAluno, function(error, results, fields) {
        if (error) {
            console.log("log ERROR: ", error)
            res.status(500).send({error: "Erro inesperado."})
            throw(error)
        }
        aluno.matricula = results.insertId;
        // res.status(200).send({result: {message: "Alunos cadastrado com sucesso."}})
        console.log('LOG Info: Add Aluno realizado com sucesso.');  
        console.log("LOG INFO: Chamando add Pagamento");
        pagamentos.add(aluno.matricula, res);
    });     
    connection.end();
    
}

function update(matricula, aluno, res) {
    let connection = mysql.createConnection(config);
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let sql = `UPDATE\
                aluno\
                SET\
                    nome=?, identidade=?, dataInscricao=?, cpf=?, email=?, telefone=?, endereco=?, valorMensalidade=?, tipoPlano_idtipoPlano=?, presenca_idpresenca=1, diaPagamento=?\
                    WHERE matricula=?`;
    const arrAluno = [
        aluno.nome, 
        aluno.identidade, 
        today, 
        aluno.cpf, 
        aluno.email, 
        aluno.telefone, 
        aluno.endereco, 
        aluno.valor, 
        aluno.plano,
        aluno.diaPagamento,
        matricula
    ];    
    connection.query(sql, arrAluno, function(error, results, fields) {
        if (error) {
            console.log("log ERROR: ", error)
            res.status(500).send({error: "Erro inesperado."})
            throw(error)
        }
        res.status(200).send({resut: {message: "Aluno atualizado com sucesso."}})
        console.log('LOG Info: Update Aluno realizado com sucesso.');  
    });
     
    connection.end();
}

module.exports = {
    getByMatricula: getByMatricula,
    del: del,
    add: add,
    get: get,
    update: update,
    getByName: getByName
};