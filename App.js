import React, { useState } from 'react'; // Importando React e o hook useState do React
import { View, TextInput, Button, Text } from 'react-native'; // Importando componentes básicos do React Native
import axios from 'axios'; // Importando o Axios para fazer requisições HTTP

// Definindo o componente funcional App
const App = () => {
  // Definindo estados usando o hook useState
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP digitado pelo usuário
  const [address, setAddress] = useState(null); // Estado para armazenar os dados do endereço obtidos da API

  // Função assíncrona para buscar o endereço correspondente ao CEP digitado
  const fetchAddress = async () => {
    try {
      // Fazendo uma requisição GET para a API ViaCEP para obter os dados do endereço
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      // Atualizando o estado 'address' com os dados do endereço recebidos da API
      setAddress(response.data);
    } catch (error) {
      // Lidando com erros de requisição, caso ocorram
      console.error('Error fetching address:', error);
      // Em caso de erro, limpa o estado 'address'
      setAddress(null);
    }
  };

  // Renderização do componente
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> {/* Container principal */}
      {/* Campo de entrada de texto para o usuário digitar o CEP */}
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      {/* Botão para acionar a busca do endereço */}
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {/* Condicional para renderizar os dados do endereço, se existirem */}
      {address && (
        <View>
          {/* Exibição dos dados do endereço */}
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

// Exportando o componente App como padrão
export default App;
