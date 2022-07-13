import * as queryString from "query-string";
import axios from "axios";

/*
 * Montando URL para fazer realizar a autenticação no GitHub
 */
const stringifiedParams = queryString.stringify({
  client_id: process.env.GOOGLE_ID,
  redirect_uri: 'http://localhost:3000/auth/google',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // string separadas por espaço
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

/*
 * Função para obter o token de acesso aos dados do usuário.
 */

export async function getGoogleToken(code) {
  const response = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: 'http://localhost:3000/auth/google',
      grant_type: 'authorization_code',
      code,
    },
  });
  console.log(response.data); // { access_token, expires_in, token_type, refresh_token }
  return response.data.access_token;
};

/*
 * Função para obter os dados do usuário.
 */

export async function getGoogleUserInfo(access_token) {
  const response = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(response.data); // { id, email, given_name, family_name }
  return response.data;
};