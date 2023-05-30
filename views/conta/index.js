import { Avatar, Box, HStack, Heading, Text, VStack } from "native-base";
import Endereco from "../endereco";

const Conta = () => {
    return <Box>
        <HStack space={3} margin={5} p={5} bg={'white'} >
            <Avatar size="70px" source={require('../../assets/avatar.png')} />
            <VStack>
                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                    {'Fulano'}
                </Text>
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                    Email: {'fulano@gmail.com'}
                </Text>
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                    Tel: 12345-6789
                </Text>
            </VStack>
        </HStack>
        <VStack space={3} margin={5} p={5} bg={'white'} >
            <Heading>Endereço</Heading>
            <Endereco />
        </VStack>
    </Box>
}

export default Conta;