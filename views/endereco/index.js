import React from 'react';
import { VStack, Button, FormControl, Input } from 'native-base';

const Endereco = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const validationErrors = {};

    if (formData.cep === undefined) {
      validationErrors.cep = 'Cep é obrigatorio';
    } else if (formData.cep.length < 8) {
      validationErrors.cep = 'Cep deve conter 8 digitos';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors);
  };

  const onSubmit = () => {
    validate();
  };

  return <VStack width="90%" mx="3" >
    <FormControl isRequired isInvalid={errors.cep}>
      <FormControl.Label _text={{ bold: true }}>Cep</FormControl.Label>
      <Input placeholder="Cep" onChangeText={value => setData({ ...formData, cep: value })} />
      {errors.cep && <FormControl.ErrorMessage>{errors.cep}</FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={errors.rua}>
      <FormControl.Label _text={{ bold: true }}>Rua</FormControl.Label>
      <Input placeholder="Rua" onChangeText={value => setData({ ...formData, rua: value })} />
      {errors.rua && <FormControl.ErrorMessage>{errors.rua}</FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={errors.numero}>
      <FormControl.Label _text={{ bold: true }}>Numero</FormControl.Label>
      <Input placeholder="Numero" onChangeText={value => setData({ ...formData, numero: value })} />
      {errors.numero && <FormControl.ErrorMessage>{errors.numero}</FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={errors.complemento}>
      <FormControl.Label _text={{ bold: true }}>Cep</FormControl.Label>
      <Input placeholder="Complemento" onChangeText={value => setData({ ...formData, complemento: value })} />
      {errors.complemento && <FormControl.ErrorMessage>{errors.complemento}</FormControl.ErrorMessage>}
    </FormControl>
    <Button onPress={onSubmit} mt="5" bg="blue.600" >
      Salvar
    </Button>
  </VStack>;
}

export default Endereco;