import React, { Component } from 'react';
import { Container, LinkUnderscore, ContainerWrapper } from './styles';
import { GetAlunoByMatricula } from '../../services/Alunos';
import { GetPaymentByMatricula, RealizarPagamento } from '../../services/Pagamentos';
// import { Redirect } from "react-router-dom";
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import FormAluno from '../FormAluno';
import PaymentTable from '../PaymentTable'

class AddPagamentoContent extends Component {
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

    this.realizarPagamento = this.realizarPagamento.bind(this);
  }

  async componentDidMount() {
    try {
      let matricula = this.props.matricula;
      const aluno = await GetAlunoByMatricula(matricula);
      const alunoPagamento = await GetPaymentByMatricula(matricula);

      this.setState({
        aluno: aluno.result[0],
        pagamentos: alunoPagamento.result,
        isLoadingAlunos: false,
      });
    } catch (err) {
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }
  }

  async realizarPagamento(idPagamento, valor) {
    let matricula = this.props.matricula;
    console.log("matricula", matricula);
    try {
      const realizarPagamento = await RealizarPagamento(idPagamento, valor);
      const updatePagamento = await GetPaymentByMatricula(matricula);
      (realizarPagamento)?alert("Pagamento efetuado com sucesso."):console.error("Não foi possível editar aluno.");
      
      this.setState({
        pagamentos: updatePagamento.result,
        isLoadingAlunos: false,
      });

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
      aluno, isLoadingAlunos, hasError, errors, pagamentos,
    } = this.state;

    let renderPage;
    let renderPaymentTable;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <FormAluno aluno={aluno} disableAll={true} disableSave={true} />;
      renderPaymentTable = <PaymentTable pagamentos={pagamentos} realizarPagamento={this.realizarPagamento} />
    }

    return (
      <Container>
        <h1> Gerenciar Pagamentos </h1>
        <LinkUnderscore />
        <ContainerWrapper>
          {renderPage}
        </ContainerWrapper>
        {renderPaymentTable}
      </Container>
    );
  }
}


export default AddPagamentoContent;
