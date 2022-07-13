import * as queryString from "query-string";
import axios from "axios";

const stringifiedParams = queryString.stringify({
  client_id: process.env.FACEBOOK_ID,
  redirect_uri: 'http://localhost:3000/auth/facebook/',
  scope: ['email', 'user_friends', 'user_photos'].join(','), // strings separadas por virgula
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

export const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

export async function getFacebookToken(code) {
  const response = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.FACEBOOK_ID,
      client_secret: process.env.FACEBOOK_SECRET,
      redirect_uri: 'http://localhost:3000/auth/facebook/',
      code,
    },
  });
  console.log(response.data); // { access_token, token_type, expires_in }
  return response.data.access_token;
};

export async function getFacebookUserData(access_token) {
  const response = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: access_token,
    },
  });
  console.log(response.data); // { id, email, first_name, last_name }
  return response.data;
};