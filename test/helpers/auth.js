import api from './api.js';

let tokenAdminEmCache;

async function login(email, senha) {
  const resposta = await api()
    .post('/api/auth/login')
    .send({ email, senha });

  if (resposta.status !== 200) {
    throw new Error(`Falha no login de "${email}": status ${resposta.status} - ${JSON.stringify(resposta.body)}`);
  }

  return resposta.body.token;
}

export async function loginAdmin() {
  if (!tokenAdminEmCache) {
    tokenAdminEmCache = await login(process.env.ADMIN_EMAIL, process.env.ADMIN_SENHA);
  }

  return tokenAdminEmCache;
}

export async function loginUsuario(email, senha) {
  return login(email, senha);
}
