import React from 'react';
import { useParams} from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../components/Header';
import EditAlunoContent from '../../components/EditAlunoContent';

const EditAluno = () => {
  let { matricula } = useParams();

  return (
  <>
    <CssBaseline />
    <Header />
    <EditAlunoContent matricula={matricula} />
  </>
  );
};

export default EditAluno;
