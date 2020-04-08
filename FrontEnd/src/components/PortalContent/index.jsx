import React, { Component } from 'react';
import { Container } from './styles';
import { GetAlunos } from '../../services/Alunos';
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import MonitoringAlunos from '../MonitoringAlunos';

class PortalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alunos: [],
      isLoadingAlunos: true,
      hasError: false,
    };
  }

  async componentDidMount() {
    try {
      const alunos = await GetAlunos();
      this.setState({
        alunos: alunos,
        isLoadingAlunos: false,
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
      alunos, isLoadingAlunos, hasError, errors,
    } = this.state;

    let renderPage;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <MonitoringAlunos alunos={alunos} />;
    }

    return (

      <Container>
        {renderPage}
      </Container>

    );
  }
}


export default PortalContent;
