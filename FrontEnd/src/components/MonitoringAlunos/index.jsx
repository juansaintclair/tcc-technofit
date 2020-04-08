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
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  table: {
    padding: 30,
    minWidth: 650,
  },
  containerTable: {
    padding: 100
  },
  pagination: {
    '& > *': {
      marginTop: 10,
    },
  },
});

function renderMonitoring(aluno) {
  return (
    <TableRow key={aluno.matricula}>
      <TableCell align="right">{aluno.matricula}</TableCell>
      <TableCell component="th" scope="row">
        {aluno.nome}
      </TableCell>
      <TableCell align="right">{aluno.cpf}</TableCell>
      <TableCell align="right">{aluno.telefone}</TableCell>
      {/* <TableCell align="right">{aluno.carbs}</TableCell> */}
      <TableCell align="right">{aluno.status}</TableCell>
    </TableRow>
  );
}

function handleChange(event) {
  //@todo receber o valor da paginação clicada.
  console.log("change", event.target.value);
}

function MonitoringAlunos(props) {
  let { alunos } = props;
  let pagination = {
    page: alunos.page,
    total: alunos.total
  }
  const classes = useStyles();
  alunos = alunos.result;

  return (
    <div className={classes.containerTable}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Matrícula</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Telefone</TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alunos.map((aluno) => renderMonitoring(aluno))
            } 
          </TableBody>
        </Table>
        <div className={classes.pagination}>
          <Pagination count={pagination.total} page={pagination.page} onChange={handleChange} />
        </div>
      </TableContainer>
    </div>
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
