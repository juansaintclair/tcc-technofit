import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputContainer, ContainerForm, ContainerFormTwo } from './styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

class FormAluno extends Component {

  render() {
    const {
      aluno, updateAluno, sendUpdateAluno, disableAll, disableSave
    } = this.props;

    
    return (
      <div>
        <ContainerForm>
            <InputContainer>
              <TextField style={{ width: 510 }} disabled={(disableAll)?disableAll:false} name="nome" id="nome" label="Nome" value={(aluno)?aluno.nome:""} variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
            <InputContainer>
              <TextField style={{ width: 250 }} disabled={(disableAll)?disableAll:false} name="identidade" id="identidade" value={(aluno)?aluno.identidade:""} label="Identidade" variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
            <InputContainer>
              <TextField style={{ width: 347 }} disabled={(disableAll)?disableAll:false} name="cpf" id="cpf" value={(aluno)?aluno.cpf:""} label="CPF" variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
        </ContainerForm>
        <ContainerForm>
            <InputContainer>
              <TextField id="telefone" disabled={(disableAll)?disableAll:false} name="telefone" label="Telefone" value={(aluno)?aluno.telefone:""} variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
            <InputContainer>
              <TextField style={{ width: 350 }} disabled={(disableAll)?disableAll:false} name="email" id="email" value={(aluno)?aluno.email:""} label="E-mail" variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
            <InputContainer>
              <TextField style={{ width: 546 }} disabled={(disableAll)?disableAll:false} name="endereco" id="endereco" value={(aluno)?aluno.endereco:""} label="Endereço Completo" variant="outlined" onChange={(e) => updateAluno(e, e.target.value)} />
            </InputContainer>
        </ContainerForm>
        <ContainerFormTwo>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo do Plano</FormLabel>
              <RadioGroup aria-label="tipoPlano" id="tipoPlano" name="tipoPlano" value={(aluno)?aluno.tipoPlano:1} onChange={(e) => updateAluno(e, e.target.value)}>
                <FormControlLabel value="1" control={<Radio color="primary" />} label="Mensal" />
                <FormControlLabel value="2" control={<Radio color="primary" />} label="Anual" />
            </RadioGroup>
          </FormControl>
          <FormControl variant="outlined" style={{ width: 250, marginLeft: 20, marginRight: 20  }}>
            <InputLabel id="dataPagamento-label">Data Pagamento (Dia do Mês)</InputLabel>
              <Select
                labelId="dataPagamento-label"
                id="dataPagamento"
                name="dataPagamento"
                value={(aluno)?aluno.diaPagamento:5}
                label="Data Pagamento (Dia do Mês)"
                onChange={(e) => updateAluno(e, e.target.value)}
                disabled={(disableAll)?disableAll:false} 
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>

          <TextField style={{ width: 250 }} disabled={(disableAll)?disableAll:false} name="valorMensalidade" id="valorMensalidade" value={(aluno)?aluno.valorMensalidade:100} label="Valor da Mensalidade" variant="outlined" onChange={(e) => updateAluno(e, e.target.value)}/>

        </ContainerFormTwo>
        <Button 
          style={{visibility: disableSave?'hidden':'visible'}} 
          onClick={(e) => sendUpdateAluno()} 
          variant="contained" 
          color="primary"
        >
          Salvar
        </Button>
      </div>
      
    );
  }
}



export default FormAluno;
