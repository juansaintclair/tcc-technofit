import { bff } from '../Http';

export const GetAlunos = (page, ativo) =>  bff.get(`/alunos/${page || 1}/${ativo || 1}`);

export const GetAll = () =>  bff.get(`/todosalunos`);

export const GetAllInadimplentes = () =>  bff.get(`/todosinadimplentes`);

export const GetAlunosByName = (name, page) => bff.get(`/alunos/nome/${name}/${page || 1}`);

export const GetAlunoByMatricula = (matricula) => bff.get(`/alunosmatricula/${matricula}`);

export const DeleteAluno = (matricula) => bff.delete(`/alunos/${matricula}`);

export const UpdateAluno = (matricula, aluno) => bff.patch(`/alunos/${matricula}`, aluno);

export const InsertAluno = (aluno) => bff.post(`/alunos`, aluno);