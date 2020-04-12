import { bff } from '../Http';

export const GetPaymentByMatricula = (matricula) => bff.get(`/pagamentomatricula/${matricula}`);

export const RealizarPagamento = (matricula, valor) => bff.post(`/realizarpagamento/${matricula}/${valor}`);
