import { Box, FlatList, Heading, Stack, Text } from "native-base";

const SolicitacaoCard = ({ id, dimensoes, peso, valorCobrado, status }) => {
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
          <Heading size="md">Id: {id}</Heading>
          <Text fontSize="xs" fontWeight="500">
            R$ {valorCobrado}
          </Text>
        </Stack>
        <Text >Status: {status} </Text>
        <Text >Data Solicitação: {new Date().toLocaleString()}</Text>
        <Text >Dimensões: {dimensoes}</Text>
        <Text >Peso: {peso}</Text>
      </Stack>
    </Box>
  </Box>;
};

const ListaSolictacoes = () => {
  const data = [{
    id: 1,
    usuario: 'Jose',
    enderecoRetirada: 'Rua abc',
    enderecoEntrega: 'Avenida 123',
    dimensoes: '190x50x30',
    peso: '12kg',
    valorCobrado: '785.00',
    status: 'Coletado'
  },
  {
    id: 2,
    usuario: 'Maria',
    enderecoRetirada: 'Rua abc',
    enderecoEntrega: 'Avenida 123',
    dimensoes: '190x50x30',
    peso: '12kg',
    valorCobrado: '785.00',
    status: 'Coletado'
  },
  ];

  return <FlatList data={data} renderItem={({ item }) => <SolicitacaoCard {...item} />} />
}

export default ListaSolictacoes;