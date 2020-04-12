import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 20
  },
  ativo2: {
    backgroundColor: '#ffebeb'
  }
});

function nextPayment(dataProximoPagamento) {
  let payment = new Date(dataProximoPagamento);
  payment = ('0' + payment.getDate()).slice(-2) + '/'
            + ('0' + (payment.getMonth()+1)).slice(-2) + '/'
            + payment.getFullYear();
  return payment;
}

function handleDelete(matricula, nome, deleteAluno) {
  let response = window.confirm("Você tem certeza que deseja inativar o aluno "+  nome +"?");
  
  (response)
    ?console.log(deleteAluno(matricula))
    :console.log("não deleta");
}

function renderMonitoring(aluno, deleteAluno, classes, showActions) {
  let proximoPagamento = nextPayment(aluno.proximoPagamento)
  let rowClassName = 'ativo'+aluno.ativo;
  let deleteClassName = 'delete'+aluno.ativo;
  let renderActions;

  if (showActions) {
    renderActions = <TableCell align="right">
        <IconButton aria-label="edit">
          <Link to={"/alunos/edit/"+aluno.matricula}>
            <Edit color="primary" />
          </Link>
        </IconButton>
        <IconButton className={classes[deleteClassName]} onClick={() => handleDelete(aluno.matricula, aluno.nome, deleteAluno) } aria-label="delete">
          <Delete style={{color: 'red'}} />
        </IconButton>
        <IconButton aria-label="payment">
          <Link to={"/pagamentos/"+aluno.matricula}>
            <PaymentIcon style={{color: '#589144'}} />
          </Link>
        </IconButton>
      </TableCell>
  }

  return (
    <TableRow key={aluno.matricula} className={classes[rowClassName]}>
      <TableCell align="right">{aluno.matricula}</TableCell>
      <TableCell component="th" scope="row">
        {aluno.nome}
      </TableCell>
      <TableCell align="right">{aluno.cpf}</TableCell>
      <TableCell align="right">{aluno.telefone}</TableCell>
      <TableCell align="right">{proximoPagamento}</TableCell>
      <TableCell align="right">{aluno.statusPagamento}</TableCell>
      {renderActions}
    </TableRow>
  );
}


function MonitoringAlunos(props) {
  let { alunos, deleteAluno, showActions } = props;
  let renderActions;
  const classes = useStyles();

  if (showActions) {
    renderActions = <TableCell align="right">Ações</TableCell>
  }

  return (
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Matrícula</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Data Próx. Pagamento</TableCell>
              <TableCell align="right">Status</TableCell>
              {renderActions}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alunos.map((aluno) => renderMonitoring(aluno, deleteAluno, classes, showActions))
            } 
          </TableBody>
        </Table>
      </TableContainer>
  );
}

MonitoringAlunos.propTypes = {
  jobs: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.array,
    PropTypes.object]),
};

export default MonitoringAlunos;
