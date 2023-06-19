import { google } from 'googleapis';

// Configure suas credenciais e informações do projeto

import apiKey from './api_key.js';

// Função para obter informações do perfil do Google
async function getProfileInfo(email) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credenciais.json', // Substitua pelo caminho correto do arquivo de credenciais JSON
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  });

  const oauth2 = google.oauth2({
    auth,
    version: 'v2',
  });

  try {
    const response = await oauth2.userinfo.get({ userId: email });

    const { data } = response;
    const name = data.name;
    const pictureUrl = data.picture;

    return { name, pictureUrl };
  } catch (error) {
    console.error('Erro ao obter informações do perfil:', error.message);
    return null;
  }
}

// Exemplo de uso
const email = 'luizgabrielgrupe@gmail.com';

async function main() {
  const profileInfo = await getProfileInfo(email);
  console.log('Email:', email);
  console.log('Nome:', profileInfo ? profileInfo.name : 'Não encontrado');
  console.log('URL da imagem:', profileInfo ? profileInfo.pictureUrl : 'Não encontrado');
}

main().catch(console.error);
