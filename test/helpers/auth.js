import api from './api.js';

let tokenAdminEmCache;

export async function loginAdmin() {
  if (!tokenAdminEmCache) {
    const resposta = await api()
      .post('/api/auth/login')
      .send({ email: process.env.ADMIN_EMAIL, senha: process.env.ADMIN_SENHA });

    tokenAdminEmCache = resposta.body.token;
  }

  return tokenAdminEmCache;
}

export async function loginUsuario(email, senha) {
  const resposta = await api()
    .post('/api/auth/login')
    .send({ email, senha });

  return resposta.body.token;
}
