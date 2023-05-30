import { FlatList, Text, VStack } from "native-base";

const Notificacao = ({ mensagem, data }) => <VStack padding={3} margin={5} my={1} bg='white'>
    <Text>{data}</Text>
    <Text bold>{mensagem}</Text>
</VStack>

const Notificacoes = () => {
    const data = [
        { mensagem: 'A postagem 123 foi coletada', data: new Date().toLocaleString() },
        { mensagem: 'A postagem será coletada hoje entre as 13h e 18h', data: new Date().toLocaleString() },
    ];

    return <FlatList data={data} renderItem={({ item }) => <Notificacao {...item} />} />
}

export default Notificacoes;