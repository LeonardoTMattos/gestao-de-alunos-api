import api from './api.js';

export async function cadastrarAluno(tokenAdmin, dadosAluno) {
  const resposta = await api()
    .post('/api/admin/alunos')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(dadosAluno);

  if (resposta.status !== 201) {
    throw new Error(`Falha ao cadastrar aluno: status ${resposta.status} - ${JSON.stringify(resposta.body)}`);
  }

  return resposta.body.id;
}

export async function matricularAluno(tokenAdmin, disciplinaId, alunoId) {
  const resposta = await api()
    .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send({ alunoId });

  if (resposta.status !== 201) {
    throw new Error(`Falha ao matricular aluno: status ${resposta.status} - ${JSON.stringify(resposta.body)}`);
  }
}
