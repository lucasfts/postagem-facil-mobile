import { Platform } from 'react-native';
import type { B2CConfiguration } from './b2cClient';

export const b2cConfig: B2CConfiguration = {
  auth: {
    clientId: '32d1c74f-8830-4883-9c75-85e2f3859c66',
    authorityBase: 'https://postagemfacil.b2clogin.com/tfp/postagemfacil.onmicrosoft.com',
    policies: {
      signInSignUp: 'B2C_1_sigin_signup',
      passwordReset: 'B2C_1_password_reset',
    },
    redirectUri: Platform.select(
      {
        android: 'msauth://com.postagemfacil/M61nf%2BaC69kCXmFY1ejcX83rDNc%3D',
        ios: 'msauth.com.postagemfacil://auth',
        web: 'http://localhost:19006/',
        default: 'msauth://com.postagemfacil/M61nf%2BaC69kCXmFY1ejcX83rDNc%3D'
      }),
  },
  cache: { cacheLocation: 'localStorage' },
};

export const b2cScopes = ['https://postagemfacil.onmicrosoft.com/solicitacoes-api/AcessoTotal'];