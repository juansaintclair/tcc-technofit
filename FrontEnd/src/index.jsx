import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Info from './pages/Info';
import HealthCheck from './pages/HealthCheck';
import EditAluno from './pages/EditAluno';
import AddAluno from './pages/AddAluno';
import AddPagamento from './pages/AddPagamento';
import RelatorioAlunos from './pages/RelatorioAlunos';
import RelatorioInadimplentes from './pages/RelatorioInadimplentes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3eccf7',
    },
    background: {
      default: '#e8e8e8',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/alunos" component={Main} />
        <Route exact path="/alunos/add" component={AddAluno} />
        <Route exact path="/alunos/edit/:matricula" component={EditAluno} />
        <Route exact path="/pagamentos/:matricula" component={AddPagamento} />
        <Route exact path="/relatorio/alunos" component={RelatorioAlunos} />
        <Route exact path="/relatorio/inadimplentes" component={RelatorioInadimplentes} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/api/healthcheck" component={HealthCheck} />
        <Route exact path="main.js" />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
