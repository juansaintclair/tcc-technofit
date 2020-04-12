import React, { Component } from 'react';
import { Container, LinkUnderscore, ContainerWrapper } from './styles';
import { GetAlunos, GetAlunosByName, DeleteAluno } from '../../services/Alunos';
import { Link } from 'react-router-dom';
import ErrorLoadingComponent from '../ErrorLoadingComponent';
import MonitoringAlunos from '../MonitoringAlunos';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
      },
      showInactive: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.deleteAluno = this.deleteAluno.bind(this);
    this.handleShowInactive = this.handleShowInactive.bind(this);
  }

  showInactivate(active) {
    return (active)?2:1;
  }

  async componentDidMount() {
    try {
      const alunos = await GetAlunos(1, 1);
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

  async deleteAluno(matricula) {
    
    let alunoDeletado;
    try {
      alunoDeletado = await DeleteAluno(matricula);
    } catch (err) {
      this.setState({
        isLoadingAlunos: false,
        hasError: true,
      });
    }

    if (alunoDeletado) {
      try {
        const alunos = await GetAlunos(1, this.state.ativo);
        this.setState({
          alunos: alunos.result,
          isLoadingAlunos: false,
          pagination: {
            page: alunos.page,
            total: alunos.total
          }
        });
        window.alert("Aluno Inativado com sucesso.");
      } catch (err) {
        this.setState({
          isLoadingAlunos: false,
          hasError: true,
        });
      }
    }
  }

  async handleShowInactive() {
    this.setState({isLoadingAlunos: true});
    try {
      const alunos = await GetAlunos(1, this.showInactivate(!this.state.showInactive));
      this.setState({
        alunos: alunos.result,
        isLoadingAlunos: false,
        pagination: {
          page: alunos.page,
          total: alunos.total
        },
        showInactive: !this.state.showInactive
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
      alunos, isLoadingAlunos, hasError, errors, pagination, showInactive
    } = this.state;
    const deleteAluno = this.deleteAluno;
    
    let renderPage;
    let renderPagination
    let renderBtn;

    let renderCheckBox = <FormControlLabel
                          control={
                            <Checkbox
                              checked={showInactive}
                              onChange={this.handleShowInactive}
                              name="showInactives"
                              color="primary"
                            />
                          }
                          label="Mostrar Inativos"
                        />;

    if (isLoadingAlunos) {
      renderPage = <span className="loading">Carregando Informações...</span>;
    } else if (hasError) {
      renderPage = <ErrorLoadingComponent errors={errors} />;
    } else {
      renderPage = <MonitoringAlunos deleteAluno={deleteAluno} alunos={alunos} showActions={true} />;
      renderPagination = <Pagination count={pagination.total} page={pagination.page} onChange={this.handleChange} />;
      renderBtn = <Link to="/alunos/add">
                    <Button variant="contained" color="primary">
                      Novo Aluno
                    </Button>
                  </Link>;
    }


    return (
      <Container>
        <h1> Alunos Cadastrados </h1>
        <LinkUnderscore />
        <ContainerWrapper>
          <TextField id="outlined-basic" label="Filtrar por nome" variant="outlined" size="small" style={{minWidth: 400}} onChange={(e) => this.handleChangeInput(e)} />
          {renderCheckBox}
        </ContainerWrapper>
        {renderPage}
        <ContainerWrapper>
          {renderBtn}
          {renderPagination}
        </ContainerWrapper>
      </Container>
    );
  }
}


export default PortalContent;
