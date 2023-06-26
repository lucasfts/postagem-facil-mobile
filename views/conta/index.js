import { Avatar, Box, Button, Divider, HStack, Heading, Text, VStack } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const Conta = () => {
    const { userClaims, signOut } = useContext(AuthContext);

    return <Box bg={'white'} m={5} p={5}>
        <HStack space={3} m={5} >
            <Avatar size="70px" source={require('../../assets/avatar.png')} />
            <VStack>
                <Heading size="md">
                    {userClaims.given_name} {userClaims.family_name}
                </Heading>
                <Text>
                    Email: {userClaims.emails[0]}
                </Text>
                <Text>
                    Tel: {userClaims.extension_Phone}
                </Text>
            </VStack>
        </HStack>
        <VStack space={2} m={5} my={0} >
            <Heading size="md">Endereço</Heading>
            <Text >CEP: {userClaims.postalCode}</Text>
            <Text >Endereço: {userClaims.streetAddress}</Text>
            <Text >Estado: {userClaims.state}</Text>
            <Text >Cidade: {userClaims.city}</Text>

            <Button onPress={signOut} mt="5" bg="blue.600" >
                Sair
            </Button>
        </VStack>
    </Box>
}

export default Conta;