import * as queryString from "query-string";
import axios from "axios";

/*
 * Montando URL para fazer realizar a autenticação no GitHub
 */
const params = queryString.stringify({
  client_id: process.env.GITHUB_ID,
  redirect_uri: "http://localhost:3000/auth/github",
  scope: ["read:user", "user:email"].join(" "), // strings separadas por espaço
  allow_signup: true,
});

export const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

/*
 * Função para obter o token de acesso aos dados do usuário.
 */

export async function getGitHubToken(code) {
  const response = await axios({
    url: "https://github.com/login/oauth/access_token",
    params: {
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
      redirect_uri: "http://localhost:3000/auth/github",
      code,
    },
  });
  
  // GitHub retorna os dados como string, então devemos fazer um parse.
  const parsedData = queryString.parse(response.data);

  // { token_type, access_token, error, error_description }
  console.log(parsedData);

  if (parsedData.error) {
    console.log(parsedData.error_description);
  }

  return parsedData.access_token;
}

/*
 * Função para obter os dados do usuário.
 */

export async function getGitHubUserData(access_token) {
  const response = await axios({
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  console.log(response.data); // { id, email, name, login, avatar_url }
  return response.data;
}
