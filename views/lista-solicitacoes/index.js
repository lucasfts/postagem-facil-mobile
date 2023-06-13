import { Box, FlatList, Heading, Stack, Text } from "native-base";
import { useEffect, useState } from "react";
import { obterSolicitacoesPorUsuario } from "../../model/financeiro/solicitacoesService";

const SolicitacaoCard = ({ id, transportadora, tipoCaixa, pesoLimite, custo, status, dataSolicitacao }) => {
  return <Box alignItems="center" margin={2}  >
    <Box width={'90%'} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <Stack p="4" space={3}  >
        <Stack space={2}>
          <Heading size="md">Postagem Id: {id}</Heading>
          <Text fontSize="xs" fontWeight="500">
            R$ {custo}
          </Text>
        </Stack>
        <Text >Status: {status.descricao} </Text>
        <Text >Transportadora: {transportadora.nome}</Text>
        <Text >Tipo de caixa: {tipoCaixa.descricao}</Text>
        <Text >Peso: {pesoLimite.descricao}</Text>
        <Stack mt={3} >
          <Text textAlign={'right'} color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="400">
            Solicitado em {dataSolicitacao.toLocaleString()}
          </Text>
        </Stack>
      </Stack>
    </Box>
  </Box>;
};

const ListaSolictacoes = () => {
  const usuarioId = 89;
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    obterSolicitacoesPorUsuario(usuarioId).then(setSolicitacoes);
  }, []);

  return <FlatList data={solicitacoes} renderItem={({ item }) => <SolicitacaoCard {...item} />} />
}

export default ListaSolictacoes;