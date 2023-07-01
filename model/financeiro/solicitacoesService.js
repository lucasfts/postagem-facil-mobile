import axios from 'axios';
import ENVIRONMENT from '../../environment';

const axiosInstance = axios.create({ baseURL: ENVIRONMENT.SOLICITACOES_API });

const obterSolicitacoesPorUsuario = async (clienteId) =>
    axiosInstance.get(`solicitacoes/${clienteId}`)
        .then(response => response.data);

const criarSolicitacao = async (solicitacao) => {
    var headers = { 'Content-Type': 'multipart/form-data' };
    var formData = new FormData();
    Object.keys(solicitacao).forEach(key => formData.append(key, solicitacao[key]));
    return axiosInstance.post(`solicitacoes`, formData, { headers })
        .then(response => response.data);
}

export { obterSolicitacoesPorUsuario, criarSolicitacao };