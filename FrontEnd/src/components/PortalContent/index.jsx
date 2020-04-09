import React, { Component } from 'react';
import { Container, LinkUnderscore, BottomContainer } from './styles';
import { GetAlunos, GetAlunosByName } from '../../services/Alunos';
import { Link } from 'react-router-dom';
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import MonitoringAlunos from '../MonitoringAlunos';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class PortalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alunos: [],
      isLoadingAlunos: true,
      hasError: false,
      pagination: {
        page: 1,
        total: 0
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  async componentDidMount() {
    try {
      const alunos = await GetAlunos();
      this.setState({
        alunos: alunos.result,
        isLoadingAlunos: false,
        pagination: {
          page: alunos.page,
          total: alunos.total
        }
      });
    } catch (err) {
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }
  }

  async handleChange(event, page) {
    try {
      const alunos = await GetAlunos(page);
      this.setState({
        alunos: alunos.result,
        pagination: {
          page: alunos.page,
          total: alunos.total
        }
      });
    } catch (err) {
      this.setState({
        hasError: true,
      });
    }
  }

  async handleChangeInput(event) {
    try {
      let alunos;
      if (event.target.value.length >= 1) {
        alunos = await GetAlunosByName(event.target.value);
      } else {
        alunos = await GetAlunos(1);
      }

      this.setState({
        hasError: false,
        alunos: alunos.result,
        pagination: {
          page: alunos.page,
          total: alunos.total
        }
      });
    } catch (err) {
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    const {
      alunos, isLoadingAlunos, hasError, errors, pagination
    } = this.state;
    
    let renderPage;
    let renderPagination
    let renderBtn;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <MonitoringAlunos alunos={alunos} />;
      renderPagination = <Pagination count={pagination.total} page={pagination.page} onChange={this.handleChange} />;
      renderBtn = <Link to="/aluno/add">
                    <Button variant="contained" color="primary">
                      Novo Aluno
                    </Button>
                  </Link>;
    }


    return (
      <Container>
        <h1> Alunos Cadastrados </h1>
        <LinkUnderscore />
        <TextField id="outlined-basic" label="Filtrar por nome" variant="outlined" size="small" style={{minWidth: 400}} onChange={(e) => this.handleChangeInput(e)} />
        {renderPage}
        <BottomContainer>
          {renderBtn}
          {renderPagination}
        </BottomContainer>
      </Container>
    );
  }
}


export default PortalContent;
