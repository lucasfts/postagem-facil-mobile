import { Box, FlatList, Heading, Stack, Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import { obterSolicitacoesPorUsuario } from "../../model/financeiro/solicitacoesService";
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from "../../components/CustomAlert";
import { useEffect, useContext } from "react";
import dateFormat from 'dateformat';
import { AuthContext } from "../../auth/AuthContext";

const SolicitacaoCard = ({ id, transportadora, tipoCaixa, pesoLimite, custo, status, dataSolicitacao }) => {
  return <Box alignItems="center" my={2} >
    <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
            R$ {custo.toFixed(2)}
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
            Solicitado em {dateFormat(dataSolicitacao, "dd/mm/yyyy HH:MM:ss")}
          </Text>
        </Stack>
      </Stack>
    </Box>
  </Box>;
};

const ListaSolictacoes = ({ route }) => {
  const { userClaims } = useContext(AuthContext);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    setAlerta(route.params?.alerta);
    if (route.params?.alerta) {
      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    }
  }, [route]);

  useFocusEffect(useCallback(() => {
    obterSolicitacoesPorUsuario(userClaims.oid).then(setSolicitacoes);
  }, []));

  return <VStack space={2} py={2} w={'90%'} h={'100%'} alignSelf={'center'} >
    {alerta && <CustomAlert status={alerta.status} title={alerta.title} closeHandler={() => setAlerta(null)} />}
    <FlatList showsVerticalScrollIndicator={false} data={solicitacoes} renderItem={({ item }) => <SolicitacaoCard {...item} />} />
  </VStack>
}

export default ListaSolictacoes;