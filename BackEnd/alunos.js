const mysql = require('mysql');
const config = require('./mysql-config.js');
const pagamentos = require('./pagamentos.js')

const rowsPerPage = 10;
config.multipleStatements = true;

function _insertAluno(aluno, res) {
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
            aluno.valorMensalidade, 
            aluno.tipoPlano, 
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

function _updateAluno(matricula, aluno, res) {
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
        aluno.valorMensalidade, 
        aluno.tipoPlano,
        aluno.diaPagamento,
        matricula
    ];    
    connection.query(sql, arrAluno, function(error, results, fields) {
        if (error) {
            console.log("log ERROR: ", error)
            res.status(500).send({error: "Erro inesperado."})
            throw(error)
        }
        res.status(200).send({result: {message: "Aluno atualizado com sucesso."}})
        console.log('LOG Info: Update Aluno realizado com sucesso.');  
    });
     
    connection.end();
}


function get(res, page, status) {
    let limit = rowsPerPage;
    let offset = limit * (page -1);
    let params;
    let sql;
    let getQuery;
    
    params = (status === 1)?[status, limit, offset, status]:[limit, offset];
    
    getQuery = `SELECT distinct a.matricula, a.nome, a.cpf, a.telefone, s.nome as statusPagamento, p.dataPagamentoPrevisto as proximoPagamento, a.ativo\
            FROM technofit.aluno as a\
            LEFT JOIN technofit.pagamento as p\
                on a.matricula = p.aluno_matricula\
            LEFT JOIN technofit.statuspagamento as s\
                on a.statuspagamento_idstatusPagamento = s.idstatusPagamento WHERE p.status = 1 AND `;
    getQuery += (status === 1)?`a.ativo= ? `:`a.ativo = 1 OR a.ativo = 2 `;      
    getQuery += `GROUP BY a.matricula\
            ORDER BY a.matricula desc `;
    
    let selectCount = `;SELECT COUNT(*) as total from (`;
    selectCount += getQuery;
    selectCount += `) total;`;

    getQuery += `LIMIT ? `;
    getQuery += `OFFSET ? `;
    
    sql = getQuery + selectCount;
    
    let connection = mysql.createConnection(config);
    connection.query(sql, params, function(error, results, fields){
        
        if(error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }
        else {
            console.log('LOG Info: Query realizada com sucesso.');  
            res.json({
                result: results[0],
                page: page,
                items: rowsPerPage,
                total: Math.ceil(results[1][0].total/rowsPerPage)
            });
        }
        connection.end();
    });                       
}

function getAll(res) {
    let sql;

    sql = `SELECT distinct a.matricula, a.nome, a.cpf, a.telefone, s.nome as statusPagamento, p.dataPagamentoPrevisto as proximoPagamento, a.ativo\
            FROM technofit.aluno as a\
            LEFT JOIN technofit.pagamento as p\
                on a.matricula = p.aluno_matricula\
            LEFT JOIN technofit.statuspagamento as s\
                on a.statuspagamento_idstatusPagamento = s.idstatusPagamento WHERE p.status = 1 AND `;
    sql += `a.ativo = 1 OR a.ativo = 2 `;      
    sql += `GROUP BY a.matricula\
            ORDER BY a.nome`;
    
    let connection = mysql.createConnection(config);
    connection.query(sql, function(error, results, fields){
        
        if(error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }
        else {
            console.log('LOG Info: Relatório de todos os alunos efetuado com sucesso.');  
            res.json({
                result: results,
            });
        }
        connection.end();
    });                       
}

function getAllInadimplentes(res) {
    let sql;

    sql = `SELECT distinct a.matricula, a.nome, a.cpf, a.telefone, s.nome as statusPagamento, p.dataPagamentoPrevisto as proximoPagamento, a.ativo\
            FROM technofit.aluno as a\
            LEFT JOIN technofit.pagamento as p\
                on a.matricula = p.aluno_matricula\
            LEFT JOIN technofit.statuspagamento as s\
                on a.statuspagamento_idstatusPagamento = s.idstatusPagamento WHERE p.status = 1 AND `;
    sql += `a.ativo = 1 OR a.ativo = 2 AND statuspagamento_idstatusPagamento = 2 `;      
    sql += `GROUP BY a.matricula\
            ORDER BY a.nome`;
    
    let connection = mysql.createConnection(config);
    connection.query(sql, function(error, results, fields){
        
        if(error)  {
            res.status(500).send({error: "Erro inesperado."})
            console.log('LOG Error: ', error);
        }
        else {
            console.log('LOG Info: Relatório de todos os alunos efetuado com sucesso.');  
            res.json({
                result: results,
            });
        }
        connection.end();
    });                       
}

function getByName(nome, page, res) {
    nome = `%${nome}%`;

    let params;
    let sql;
    let getQuery;

    params = [nome, nome];
    
    getQuery = `SELECT distinct a.matricula, a.nome, a.cpf, a.telefone, s.nome as statusPagamento, p.dataPagamentoPrevisto as proximoPagamento\
            FROM technofit.aluno as a\
            LEFT JOIN technofit.pagamento as p\
                on a.matricula = p.aluno_matricula\
            LEFT JOIN technofit.statuspagamento as s\
                on a.statuspagamento_idstatusPagamento = s.idstatusPagamento WHERE a.nome like ? AND p.status = 1 AND `;
    getQuery += `ativo = 1 `;      
    getQuery += `GROUP BY a.matricula\
            ORDER BY a.matricula desc `;
    
    let selectCount = `;SELECT COUNT(*) as total from (`;
    selectCount += getQuery;
    selectCount += `) total;`;
    
    sql = getQuery + selectCount;  
    
    let connection = mysql.createConnection(config);
    connection.query(sql, params, function(error, results, fields) {
        if (error) {
            throw error;
        }
        console.log('LOG Info: Buscar aluno por nome realizado com sucesso.');  
         res.json({
                result: results[0],
                page: page,
                items: rowsPerPage,
                total: results[1]/rowsPerPage
            });
    });
     
    connection.end();
}

function getByMatricula(matricula, res) {
    console.log("LOG INFO: Iniciando Buscar Aluno por Matrícula.");
    let connection = mysql.createConnection(config);
    let sql = `SELECT\ 
                aluno.matricula, aluno.nome, aluno.cpf, aluno.identidade, aluno.dataInscricao, aluno.email, aluno.telefone, aluno.endereco, aluno.valorMensalidade, aluno.tipoPlano_idtipoPlano as tipoPlano, ativo, diaPagamento, statuspagamento.nome as status\
                FROM technofit.aluno\
                INNER JOIN tipoplano\
                    on aluno.tipoPlano_idtipoPlano = tipoPlano.idtipoPlano\
                INNER JOIN statuspagamento\
                    on aluno.statuspagamento_idstatusPagamento = statuspagamento.idstatusPagamento\
                WHERE matricula = ?\;`

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
        console.log('LOG Info: Inativação de aluno concluída.');  
        res.status(200).send({result: {message: "Aluno inativado com sucesso."}})
    });
     
    connection.end();
}

function add(aluno, res) {
    console.log("LOG INFO: Entrou no ADD Aluno . Checando CPF.");
    let sql = `SELECT cpf from technofit.aluno WHERE cpf=?`;
    let connection = mysql.createConnection(config);
    connection.query(sql, [aluno.cpf], function(error, results, fields) {
        if (error) {
            console.log("log ERROR: ", error)
            res.status(500).send({error: "Erro inesperado."})
            throw(error)
        }

        if (results.length >= 1) {
            console.log("LOG INFO: Usuário já cadastrado com mesmo cpf.")
            res.status(500).send({error: "CPF já cadastrado."})
        } else {
            console.log("LOG INFO: CPF Não cadastrado, seguir com o cadastro.")
            _insertAluno(aluno, res);
        }
    });
    connection.end();
}

function update(matricula, aluno, res) {
    console.log("LOG INFO: Entrou no Update Aluno. Checando CPF.");
    let sql = `SELECT cpf, matricula from technofit.aluno WHERE cpf=? AND matricula != ?`;
    let connection = mysql.createConnection(config);
    connection.query(sql, [aluno.cpf, matricula], function(error, results, fields) {
        if (error) {
            console.log("log ERROR: ", error)
            res.status(500).send({error: "Erro inesperado."})
            throw(error)
        }

        if (results.length >= 1) {
            console.log("LOG INFO: Usuário já cadastrado com mesmo cpf.")
            res.status(200).send({message: "CPF já cadastrado."})
        } else {
            console.log("LOG INFO: CPF Não cadastrado, seguir com o cadastro.")
            _updateAluno(matricula, aluno, res)
        }
    });
    connection.end();  
}

module.exports = {
    getByMatricula: getByMatricula,
    del: del,
    add: add,
    get: get,
    update: update,
    getByName: getByName,
    getAll: getAll,
    getAllInadimplentes: getAllInadimplentes
};