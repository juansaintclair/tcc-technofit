import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 20
  }
});

function nextPayment(dataProximoPagamento) {
  let payment = new Date(dataProximoPagamento);
  payment = ('0' + payment.getDate()).slice(-2) + '/'
            + ('0' + (payment.getMonth()+1)).slice(-2) + '/'
            + payment.getFullYear();
  return payment;
}

function renderMonitoring(aluno) {
  let proximoPagamento = nextPayment(aluno.proximoPagamento)
  
  return (
    <TableRow key={aluno.matricula}>
      <TableCell align="right">{aluno.matricula}</TableCell>
      <TableCell component="th" scope="row">
        {aluno.nome}
      </TableCell>
      <TableCell align="right">{aluno.cpf}</TableCell>
      <TableCell align="right">{aluno.telefone}</TableCell>
      <TableCell align="right">{proximoPagamento}</TableCell>
      <TableCell align="right">{aluno.statusPagamento}</TableCell>
    </TableRow>
  );
}


function MonitoringAlunos(props) {
  let { alunos } = props;

  const classes = useStyles();

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
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alunos.map((aluno) => renderMonitoring(aluno))
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
