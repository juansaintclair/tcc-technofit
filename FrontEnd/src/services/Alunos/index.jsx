import { bff } from '../Http';

export const GetAlunos = (page) => bff.get(`/alunos/${page || 1}`);

export const GetAlunosByName = (name, page) => bff.get(`/alunos/nome/${name}/${page || 1}`);