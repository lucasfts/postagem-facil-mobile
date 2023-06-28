import { Avatar, Box, Button, Divider, HStack, Heading, Text, VStack } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const Conta = () => {
    const { userClaims, signOut } = useContext(AuthContext);

    return <Box bg={'white'} m={5} p={5}>

        <VStack alignItems={'center'}>
            <Avatar size={100} source={require('../../assets/avatar.png')} />
            <Heading size="md" pt={3}>
                {userClaims.given_name} {userClaims.family_name}
            </Heading>
            <Text>
                Email: {userClaims.emails[0]}
            </Text>
            <Text>
                Tel: {userClaims.extension_Phone}
            </Text>

            <Heading size="md" pt={3}>Endereço</Heading>
            <Text>CEP: {userClaims.postalCode}</Text>
            <Text>{userClaims.streetAddress}</Text>
            <Text>{userClaims.city} - {userClaims.state}</Text>
            <Button onPress={signOut} w={200} mt="5" bg="blue.600" >
                Sair
            </Button>

        </VStack>

    </Box>
}

export default Conta;