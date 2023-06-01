import React from 'react';
import { VStack, Button, FormControl, Input, Select, WarningOutlineIcon, CheckIcon, Text, HStack } from 'native-base';

const FormularioSolicitacao = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const transportadoras = [
    { id: 1, nome: "Correios" },
    { id: 2, nome: "JadLog" },
    { id: 3, nome: "DHL" },
    { id: 4, nome: "UPS" },
    { id: 5, nome: "FedEx" }
  ];

  const tiposCaixa = [
    { id: 1, nome: "30cm x 30cm x 30cm" },
    { id: 2, nome: "60cm x 60cm x 60cm" },
    { id: 3, nome: "90cm x 90cm x 90cm" },
    { id: 4, nome: "120cm x 120cm x 120cm" }
  ];

  const pesos = [
    { id: 1, nome: "Até 3kg" },
    { id: 2, nome: "Entre 3kg e 10kg" },
    { id: 3, nome: "Entre 10kg e 20kg" }
  ];

  const validate = () => {
    const validationErrors = {};
    
    if (!formData.transportadora)
      validationErrors.transportadora = 'O campo Transportadora é obrigatório';
    if (!formData.tipoCaixa)
      validationErrors.tipoCaixa = 'O campo Tipo de caixa é obrigatório';
    if (!formData.peso)
      validationErrors.peso = 'O campo Peso é obrigatório';

    setErrors(validationErrors);

    return Object.keys(validationErrors);
  };

  const onSubmit = () => {
    validate();
  };

  return <VStack width="calc(100% - 10)" mx="3" bg={'white'} p={5} m={5} >
    <FormControl isRequired isInvalid={errors.transportadora}>
      <FormControl.Label>Transportadora</FormControl.Label>
      <Select placeholder="Escolha a transportadora" onValueChange={value => setData({ ...formData, transportadora: value })} >
        {transportadoras.map(x => (<Select.Item label={x.nome} value={`${x.id}`} key={`transportadora-${x.id}`} />))}
      </Select>
      {errors.transportadora && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors.transportadora}
      </FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={errors.tipoCaixa}>
      <FormControl.Label>Tipo de caixa</FormControl.Label>
      <Select placeholder="Escolha o tipo de caixa (altura x largura x profundidade)" onValueChange={value => setData({ ...formData, tipoCaixa: value })} >
        {tiposCaixa.map(x => (<Select.Item label={x.nome} value={`${x.id}`} key={`tipoCaixa-${x.id}`} />))}
      </Select>
      {errors.tipoCaixa && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors.tipoCaixa}
      </FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={errors.peso}>
      <FormControl.Label>Peso</FormControl.Label>
      <Select placeholder="Escolha o peso aproximado" onValueChange={value => setData({ ...formData, peso: value })} >
        {pesos.map(x => (<Select.Item label={x.nome} value={`${x.id}`} key={`peso-${x.id}`} />))}
      </Select>
      {errors.peso && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors.peso}
      </FormControl.ErrorMessage>}
    </FormControl>
    <HStack pt="4" space={1}>
      <Text fontSize="sm" color={"muted.500"} fontWeight={500}>Custo:</Text>
      <Text fontSize="sm" >R$ 123.00</Text>
    </HStack>
    <Button onPress={onSubmit} mt="5" bg="blue.600" >
      Solicitar Postagem
    </Button>
  </VStack>;
}

export default FormularioSolicitacao;