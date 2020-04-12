import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

function _getPaymentDate(data) {
    let date = new Date(data);
    date = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth()+1)).slice(-2) + '/'
            + date.getFullYear();
    return date;
}

function _renderPagamento(pagamento, realizarPagamento) {
    let dtPgto = pagamento.dataPagamentoEfetuado;
    if (dtPgto) {
        return _getPaymentDate(dtPgto);
    } else {
        return <Button 
            onClick={(e) => _realizarPagamento(pagamento, realizarPagamento)} 
            variant="contained" 
            color="primary"
        >
            Realizar Pagamento
        </Button>
    }
}

function _realizarPagamento(pagamento, realizarPagamento) {
    let confirmPayment = window.confirm("Deseja efetuar pagamento para este aluno?");
    if (confirmPayment) {
        realizarPagamento(pagamento.idPagamento, pagamento.valorMensalidade);
    }
}

function renderMonitoring(pagamento, realizarPagamento) {
  return (
    <TableRow key={pagamento.idPagamento}>
      <TableCell align="right">{_getPaymentDate(pagamento.dataPagamentoPrevisto)}</TableCell>
      <TableCell component="th" scope="row">{pagamento.valorMensalidade}</TableCell>
      <TableCell align="right">{(pagamento.status === "1")?"Pendente":"Pago"}</TableCell>
      <TableCell align="right">{_renderPagamento(pagamento, realizarPagamento)}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit">
          <Link to={"/pagamentos/edit/"+pagamento.matricula}>
            <Edit color="primary" />
          </Link>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}


function MonitoringAlunos(props) {
  let { pagamentos, realizarPagamento } = props;

  return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Data Prevista</TableCell>
              <TableCell>Vaor a Pagar</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Gerenciar Pagamentos</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              pagamentos.map((pagamento) => renderMonitoring(pagamento, realizarPagamento))
            } 
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default MonitoringAlunos;
