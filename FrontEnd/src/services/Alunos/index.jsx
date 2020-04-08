import { bff } from '../Http';

export const GetAlunos = () => bff.get('/alunos/');
