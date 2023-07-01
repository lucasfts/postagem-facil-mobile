import { Platform } from "react-native";

const ENVIRONMENT = Platform.select({
    web: {
        SOLICITACOES_API:"https://localhost:7071/api/",
        FINANCEIRO_API:"https://localhost:7108/api/"
    },
    default: {
        SOLICITACOES_API:"https://postagem-facil-api-gateway.azure-api.net/servico-solicitacoes/api/",
        FINANCEIRO_API:"https://postagem-facil-api-gateway.azure-api.net/servico-financeiro/api/"
    }
})

export default ENVIRONMENT;