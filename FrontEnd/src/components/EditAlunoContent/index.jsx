import React, { Component } from 'react';
import { Container, LinkUnderscore, ContainerWrapper } from './styles';
import { GetAlunoByMatricula, UpdateAluno } from '../../services/Alunos';
import { Redirect } from "react-router-dom";
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import FormAluno from '../FormAluno';


class EditAlunoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: [],
      isLoadingAlunos: true,
      hasError: false,
      pagination: {
        page: 1,
        total: 0
      },
      showInactive: false
    };

    this.updateAluno = this.updateAluno.bind(this);
    this.sendUpdateAluno = this.sendUpdateAluno.bind(this);
  }

  async componentDidMount() {
    try {
      let matricula = this.props.matricula;
      const aluno = await GetAlunoByMatricula(matricula);
      this.setState({
        aluno: aluno.result[0],
        isLoadingAlunos: false,
      });
    } catch (err) {
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }
  }

  updateAluno(event, value) {
    const aluno = {...this.state["aluno"]};
    aluno[event.target.name] = value;
    
    this.setState({ 
      aluno: aluno 
    });
  }

  async sendUpdateAluno() {
    try {
      const aluno = this.state.aluno;
      let success = await UpdateAluno(aluno.matricula, aluno);
      (success)?alert("Aluno Alterado com sucesso."):console.error("Não foi possível editar aluno.");
      console.log(aluno);
      return <Redirect to="/alunos" />

    } catch (err) {
      console.error(err);
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }
  }

  render() {
    const {
      aluno, isLoadingAlunos, hasError, errors,
    } = this.state;

    let renderPage;
    let formAction = "/alunos/"+aluno.matricula;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <FormAluno aluno={aluno} updateAluno={this.updateAluno} sendUpdateAluno={this.sendUpdateAluno} />;
    }

    return (
      <Container>
        <h1> Editar Aluno </h1>
        <LinkUnderscore />
        <ContainerWrapper>
          <form action={formAction} method="PATCH">
            {renderPage}
          </form>
        </ContainerWrapper>
      </Container>
    );
  }
}


export default EditAlunoContent;
