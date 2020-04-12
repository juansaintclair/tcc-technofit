import React from 'react';
import { useParams} from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../components/Header';
import AddPagamentoContent from '../../components/AddPagamentoContent';

const AddPagamento = () => {
  let { matricula } = useParams();

  return (
  <>
    <CssBaseline />
    <Header />
    <AddPagamentoContent matricula={matricula} />
  </>
  );
};

export default AddPagamento;
