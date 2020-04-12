import React, { Component } from 'react';
import { Container, LinkUnderscore, ContainerWrapper } from './styles';
import { GetAll } from '../../services/Alunos';
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import MonitoringAlunos from '../MonitoringAlunos';


class RelatorioAlunosContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alunos: [],
      isLoadingAlunos: false,
      hasError: false,
      numeroAlunos: null,
      showInactive: false
    };
  }

  async componentDidMount() {
    try {
      const alunos = await GetAll(1, 1);
      this.setState({
        alunos: alunos.result,
        isLoadingAlunos: false,
        numeroAlunos: alunos.result.length
      });
    } catch (err) {
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }
  }

  render() {
    const {
      alunos, isLoadingAlunos, hasError, errors, numeroAlunos
    } = this.state;
    
    let renderPage;
    let alunosEncontrados;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      alunosEncontrados = <p>{numeroAlunos} alunos encontrados.</p>
      renderPage = <MonitoringAlunos alunos={alunos} showActions={false} /> ;
    }

    return (
      <Container>
        <p>TecnoFit Manager</p>
        <LinkUnderscore />
        <h1> Relatório de Alunos Matriculados </h1>
        <h3> Todos os alunos matriculados ordenados por ordem alfabética </h3>
        {alunosEncontrados}
        <ContainerWrapper>
            {renderPage}
        </ContainerWrapper>
      </Container>
    );
  }
}


export default RelatorioAlunosContent;
