import React, { useEffect, useState } from 'react';
import { VStack, Button, FormControl, Input, Select, WarningOutlineIcon, Text, HStack } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { obterCustoPostal, obterPesosLimite, obterTiposCaixa, obterTransportadoras } from '../../model/financeiro/financeiroService';

const FormularioSolicitacao = () => {
  const [formData, setData] = useState({});
  const [erros, seterros] = useState({});

  const [transportadoras, setTransportadoras] = useState([]);
  const [tiposCaixa, setTiposCaixa] = useState([]);
  const [pesosLimite, setPesosLimite] = useState([]);

  const [custoPostal, setCustoPostal] = useState(null);

  useEffect(() => {
    obterTransportadoras().then(setTransportadoras);
    obterTiposCaixa().then(setTiposCaixa);
    obterPesosLimite().then(setPesosLimite);
  }, []);

  useEffect(() => {
    if (formData.transportadora && formData.tipoCaixa && formData.pesoLimite) {
      obterCustoPostal(formData.transportadora, formData.tipoCaixa, formData.pesoLimite)
        .then(custo => {
          setCustoPostal(custo);
        }).catch(err => {
          console.log(err);
        });
    }
    else if (custoPostal) {
      setCustoPostal(null);
    }
  }, [formData]);


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setData({ ...formData, etiqueta: result });
  }

  const validate = () => {
    const errosValidacao = {};

    if (!formData.transportadora)
      errosValidacao.transportadora = 'O campo Transportadora é obrigatório';
    if (!formData.tipoCaixa)
      errosValidacao.tipoCaixa = 'O campo Tipo de caixa é obrigatório';
    if (!formData.pesoLimite)
      errosValidacao.pesoLimite = 'O campo Peso limite é obrigatório';
    if (!formData.etiqueta)
      errosValidacao.etiqueta = 'O campo Etiqueta de postagem é obrigatório';

    seterros(errosValidacao);

    return Object.keys(errosValidacao);
  };

  const onSubmit = () => {
    validate();
  };

  return <VStack width="calc(100% - 10)" mx="3" bg={'white'} p={5} m={5} >
    <FormControl isRequired isInvalid={erros.transportadora}>
      <FormControl.Label>Transportadora</FormControl.Label>
      <Select placeholder="Escolha a transportadora" onValueChange={value => setData({ ...formData, transportadora: value })} >
        {transportadoras.map(x => (<Select.Item label={x.nome} value={`${x.id}`} key={`transportadora-${x.id}`} />))}
      </Select>
      {erros.transportadora && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.transportadora}
      </FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={erros.tipoCaixa}>
      <FormControl.Label>Tipo de caixa</FormControl.Label>
      <Select placeholder="Escolha o tipo de caixa (altura x largura x profundidade)" onValueChange={value => setData({ ...formData, tipoCaixa: value })} >
        {tiposCaixa.map(x => (<Select.Item label={x.descricao} value={`${x.id}`} key={`tipoCaixa-${x.id}`} />))}
      </Select>
      {erros.tipoCaixa && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.tipoCaixa}
      </FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={erros.pesoLimite}>
      <FormControl.Label>Peso limite</FormControl.Label>
      <Select placeholder="Escolha o peso limite" onValueChange={value => setData({ ...formData, pesoLimite: value })} >
        {pesosLimite.map(x => (<Select.Item label={x.descricao} value={`${x.id}`} key={`pesoLimite-${x.id}`} />))}
      </Select>
      {erros.pesoLimite && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.pesoLimite}
      </FormControl.ErrorMessage>}
    </FormControl>
    <FormControl isRequired isInvalid={erros.etiqueta}>
      <FormControl.Label>Etiqueta de postagem</FormControl.Label>
      <Button variant="outline" leftIcon={<Ionicons name="cloud-upload-outline" />} onPress={pickDocument} >
        <Text>Selecione o arquivo</Text>
      </Button>
      {erros.etiqueta && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.etiqueta}
      </FormControl.ErrorMessage>}
    </FormControl>
    {custoPostal && <HStack pt="4" space={1}>
      <Text fontSize="sm" color={"muted.500"} fontWeight={500}>Custo Total:</Text>
      <Text fontSize="sm" >R$ {custoPostal.toFixed(2)}</Text>
    </HStack>}
    <Button onPress={onSubmit} mt="5" bg="blue.600" >
      Solicitar Postagem
    </Button>
  </VStack>;
}

export default FormularioSolicitacao;