import React, { useEffect, useState } from 'react';
import { VStack, Button, FormControl, Input, Select, WarningOutlineIcon, Text, HStack } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { obterCustoPostal, obterPesosLimite, obterTiposCaixa, obterTransportadoras } from '../../model/financeiro/financeiroService';
import RequiredSelect from './components/RequiredSelect';
import { criarSolicitacao } from "../../model/financeiro/solicitacoesService";

const FormularioSolicitacao = () => {
  const [solicitacao, setSolicitacao] = useState({ usuarioId: 89 });
  const [erros, setErros] = useState({});

  const [transportadoras, setTransportadoras] = useState([]);
  const [tiposCaixa, setTiposCaixa] = useState([]);
  const [pesosLimite, setPesosLimite] = useState([]);

  useEffect(() => {
    obterTransportadoras().then(setTransportadoras);
    obterTiposCaixa().then(setTiposCaixa);
    obterPesosLimite().then(setPesosLimite);
  }, []);

  useEffect(() => {
    if (solicitacao.transportadoraId && solicitacao.tipoCaixaId && solicitacao.pesoLimiteId) {
      obterCustoPostal(solicitacao.transportadoraId, solicitacao.tipoCaixaId, solicitacao.pesoLimiteId)
        .then(custo => {
          setSolicitacao({ ...solicitacao, custo: custo.toFixed(2) });
        }).catch(err => {
          console.log(err);
        });
    }
    else if (solicitacao.custo) {
      setSolicitacao({ ...solicitacao, custo: null });
    }
  }, [solicitacao.transportadoraId, solicitacao.tipoCaixaId, solicitacao.pesoLimiteId]);


  const pickDocument = async () => {
    let documento = await DocumentPicker.getDocumentAsync({});
    setSolicitacao({ ...solicitacao, etiqueta: documento.file });
  }

  const validate = () => {
    const errosValidacao = {};

    if (!solicitacao.transportadoraId)
      errosValidacao.transportadoraId = 'O campo Transportadora é obrigatório';
    if (!solicitacao.tipoCaixaId)
      errosValidacao.tipoCaixaId = 'O campo Tipo de caixa é obrigatório';
    if (!solicitacao.pesoLimiteId)
      errosValidacao.pesoLimiteId = 'O campo Peso limite é obrigatório';
    if (!solicitacao.etiqueta)
      errosValidacao.etiqueta = 'O campo Etiqueta de postagem é obrigatório';

    setErros(errosValidacao);

    return Object.keys(errosValidacao).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      criarSolicitacao(solicitacao);
    }
  };

  return <VStack width="calc(100% - 10)" mx="3" bg={'white'} p={5} m={5} >
    <RequiredSelect
      items={transportadoras}
      valueField={'id'}
      textField={'nome'}
      label={'Transportadora'}
      placeholder={'Escolha a transportadora'}
      error={erros.transportadoraId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, transportadoraId: value })}
    />
    <RequiredSelect
      items={tiposCaixa}
      valueField={'id'}
      textField={'descricao'}
      label={'Tipo de caixa'}
      placeholder={'Escolha o tipo de caixa (altura x largura x profundidade)'}
      error={erros.tipoCaixaId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, tipoCaixaId: value })}
    />
    <RequiredSelect
      items={pesosLimite}
      valueField={'id'}
      textField={'descricao'}
      label={'Peso limite'}
      placeholder={'Escolha o peso limite'}
      error={erros.pesoLimiteId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, pesoLimiteId: value })}
    />
    <FormControl isRequired isInvalid={erros.etiqueta}>
      <FormControl.Label>Etiqueta de postagem</FormControl.Label>
      <Button variant="outline" leftIcon={<Ionicons name="cloud-upload-outline" />} onPress={pickDocument} >
        <Text>{ solicitacao.etiqueta?.name || "Selecione o arquivo"}</Text>
      </Button>
      {erros.etiqueta && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.etiqueta}
      </FormControl.ErrorMessage>}
    </FormControl>
    {solicitacao.custo && <HStack pt="4" space={1}>
      <Text fontSize="sm" color={"muted.500"} fontWeight={500}>Custo Total:</Text>
      <Text fontSize="sm" >R$ {solicitacao.custo}</Text>
    </HStack>}
    <Button onPress={onSubmit} mt="5" bg="blue.600" >
      Solicitar Postagem
    </Button>
  </VStack>;
}

export default FormularioSolicitacao;