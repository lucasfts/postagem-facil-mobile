import React from 'react';
import { VStack, Button, FormControl, Input, Select, WarningOutlineIcon, CheckIcon } from 'native-base';

const FormularioSolicitacao = () => {
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
      <FormControl.Label _text={{
        bold: true
      }}>Cep</FormControl.Label>
      <Input placeholder="John" onChangeText={value => setData({ ...formData, cep: value })} />
      {errors.cep && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.cep}</FormControl.ErrorMessage>}
    </FormControl>
    <FormControl  isRequired isInvalid>
        <FormControl.Label>Transportadora</FormControl.Label>
        <Select placeholder="Choose Service" >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>
    <Button onPress={onSubmit} mt="5" bg="blue.600" >
      Salvar
    </Button>
  </VStack>;
}

export default FormularioSolicitacao;