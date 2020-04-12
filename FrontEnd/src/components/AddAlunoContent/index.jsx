import React, { Component } from 'react';
import { Container, LinkUnderscore, ContainerWrapper } from './styles';
import { InsertAluno } from '../../services/Alunos';
import { Redirect } from "react-router-dom";
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import FormAluno from '../FormAluno';


class AddAlunoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: {
        nome: "",
        cpf: "",
        identidade: "",
        email: "",
        telefone: "",
        endereco: "",
        valorMensalidade: 100,
        tipoPlano: 1,
        diaPagamento: 5,
      },
      isLoadingAlunos: false,
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
      let success = await InsertAluno(aluno);
      (success)?alert("Aluno Adicionado com sucesso."):console.error("Não foi possível adicionar aluno.");
      
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

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <FormAluno aluno={aluno} updateAluno={this.updateAluno} sendUpdateAluno={this.sendUpdateAluno} />;
    }

    return (
      <Container>
        <h1> Adicionar Aluno </h1>
        <LinkUnderscore />
        <ContainerWrapper>
            {renderPage}
        </ContainerWrapper>
      </Container>
    );
  }
}


export default AddAlunoContent;
