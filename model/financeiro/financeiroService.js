import axios from 'axios';
import ENVIRONMENT from '../../environment';

const axiosInstance = axios.create({ baseURL: ENVIRONMENT.FINANCEIRO_API });

const obterCustoPostal = async (transportadoraId, tipoCaixaId, pesoLimiteId) =>
    axiosInstance.get(`custos/transportadora/${transportadoraId}/tipo-caixa/${tipoCaixaId}/peso-limite/${pesoLimiteId}`)
        .then(response => response.data);

const obterPesosLimite = async () =>
    axiosInstance.get(`parametros/pesos-limite`)
        .then(response => response.data);

const obterTiposCaixa = async () =>
    axiosInstance.get(`parametros/tipos-caixa`)
        .then(response => response.data);

const obterTransportadoras = async () =>
    axiosInstance.get(`parametros/transportadoras`)
        .then(response => response.data);

export { obterCustoPostal, obterPesosLimite, obterTiposCaixa, obterTransportadoras };