import React, { useContext, useEffect, useState } from 'react';
import { VStack, Button, FormControl, Input, Select, WarningOutlineIcon, Text, HStack, Spinner } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { obterCustoPostal, obterPesosLimite, obterTiposCaixa, obterTransportadoras } from '../../model/financeiro/financeiroService';
import RequiredSelect from './components/RequiredSelect';
import { criarSolicitacao } from "../../model/financeiro/solicitacoesService";
import CustomAlert from '../../components/CustomAlert';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { AuthContext } from '../../auth/AuthContext';

const FormularioSolicitacao = ({ navigation }) => {
  const { userClaims } = useContext(AuthContext);
  const [solicitacao, setSolicitacao] = useState({});
  const [erros, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const [transportadoras, setTransportadoras] = useState([]);
  const [tiposCaixa, setTiposCaixa] = useState([]);
  const [pesosLimite, setPesosLimite] = useState([]);

  useEffect(() => {
    obterTransportadoras().then(setTransportadoras);
    obterTiposCaixa().then(setTiposCaixa);
    obterPesosLimite().then(setPesosLimite);
  }, []);

  useFocusEffect(useCallback(() => {
    setSolicitacao({
      clienteId: userClaims.oid,
      nomeCliente: `${userClaims.given_name} ${userClaims.family_name}`,
      endereco: `${userClaims.streetAddress}, CEP: ${userClaims.postalCode}, ${userClaims.city} - ${userClaims.state}`,
      transportadoraId: "",
      tipoCaixaId: "",
      pesoLimiteId: "",
      etiqueta: null
    });
    setErros({});
    setIsLoading(false);
    setAlerta(null);
  }, []));

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
    let document = await DocumentPicker.getDocumentAsync();

    if (document.uri && !document.file) {
      document.file = { uri: document.uri, type: document.mimeType, name: document.name };
    }

    setSolicitacao({ ...solicitacao, etiqueta: document.file });
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

  useEffect(() => {
    if (alerta) {
      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    }
  }, [alerta]);

  const onSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      criarSolicitacao(solicitacao)
        .then(() => {
          navigation.navigate('Postagens', { alerta: { status: 'success', title: 'Solicitação criada com sucesso' } });
        })
        .catch(erro => {
          console.log(JSON.stringify(erro));
          setAlerta({ status: 'error', title: 'Ops! Houve um erro ao criar a solicitação.' }
          );
        })
        .finally(() => { setIsLoading(false); });
    }
  };

  return <VStack mx="3" bg={'white'} p={5} m={5} >
    {alerta && <CustomAlert status={alerta.status} title={alerta.title} closeHandler={() => setAlerta(null)} />}
    <RequiredSelect
      items={transportadoras}
      valueField={'id'}
      textField={'nome'}
      label={'Transportadora'}
      placeholder={'Escolha a transportadora'}
      error={erros.transportadoraId}
      selectedValue={solicitacao.transportadoraId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, transportadoraId: value })}
    />
    <RequiredSelect
      items={tiposCaixa}
      valueField={'id'}
      textField={'descricao'}
      label={'Tipo de caixa'}
      placeholder={'Escolha o tipo de caixa (altura x largura x profundidade)'}
      error={erros.tipoCaixaId}
      selectedValue={solicitacao.tipoCaixaId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, tipoCaixaId: value })}
    />
    <RequiredSelect
      items={pesosLimite}
      valueField={'id'}
      textField={'descricao'}
      label={'Peso limite'}
      placeholder={'Escolha o peso limite'}
      error={erros.pesoLimiteId}
      selectedValue={solicitacao.pesoLimiteId}
      onChangeHandler={value => setSolicitacao({ ...solicitacao, pesoLimiteId: value })}
    />
    <FormControl isRequired isInvalid={erros.etiqueta}>
      <FormControl.Label>Etiqueta de postagem</FormControl.Label>
      <Button variant="outline" leftIcon={<Ionicons name="cloud-upload-outline" />} onPress={pickDocument} >
        <Text>{solicitacao.etiqueta?.name || "Selecione o arquivo"}</Text>
      </Button>
      {erros.etiqueta && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {erros.etiqueta}
      </FormControl.ErrorMessage>}
    </FormControl>
    {solicitacao.custo && <HStack pt="4" space={1}>
      <Text fontSize="sm" color={"muted.500"} fontWeight={500}>Custo Total:</Text>
      <Text fontSize="sm" >R$ {solicitacao.custo}</Text>
    </HStack>}
    <Button disabled={isLoading} onPress={onSubmit} mt="5" bg="blue.600" >
      <HStack space={2}>
        <Text color={'white'} >Solicitar Postagem</Text>
        {isLoading && <Spinner color={'white'} />}
      </HStack>
    </Button>
  </VStack>;
}

export default FormularioSolicitacao;