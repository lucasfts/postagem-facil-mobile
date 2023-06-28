import axios from 'axios';

const axiosInstance = axios.create({ baseURL: "https://postagem-facil-api-gateway.azure-api.net/servico-solicitacoes/api/" });

const obterSolicitacoesPorUsuario = async (usuarioId) =>
    axiosInstance.get(`solicitacoes/${usuarioId}`)
        .then(response => response.data);

const criarSolicitacao = async (solicitacao) => {
    var headers = { 'Content-Type': 'multipart/form-data' };
    var formData = new FormData();
    Object.keys(solicitacao).forEach(key => formData.append(key, solicitacao[key]));
    return axiosInstance.post(`solicitacoes`, formData, { headers })
        .then(response => response.data);
}

export { obterSolicitacoesPorUsuario, criarSolicitacao };