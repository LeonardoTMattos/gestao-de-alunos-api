import { createRequire } from 'node:module';
import { expect } from 'chai';
import api from './helpers/api.js';
import { loginAdmin, loginUsuario } from './helpers/auth.js';
import { novoAluno } from './factories/alunoFactory.js';

const require = createRequire(import.meta.url);
const casosDeTeste = require('./fixtures/entregaTrabalho.json');

describe('Entrega de trabalho pelo aluno', () => {
  let tokenAdmin;

  before(async () => {
    tokenAdmin = await loginAdmin();
  });

  casosDeTeste.forEach((caso) => {
    it(caso.tituloDoTeste, async () => {
      // Arrange
      const dadosAluno = novoAluno(caso.nomeAluno);

      const respostaCadastro = await api()
        .post('/api/admin/alunos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(dadosAluno);
      const alunoId = respostaCadastro.body.id;

      await api()
        .post(`/api/admin/disciplinas/${caso.disciplinaId}/matriculas`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ alunoId });

      const tokenAluno = await loginUsuario(dadosAluno.email, dadosAluno.senha);

      // Act
      const resposta = await api()
        .post(`/api/alunos/${alunoId}/trabalhos`)
        .set('Authorization', `Bearer ${tokenAluno}`)
        .send({ disciplinaId: caso.disciplinaId, ...caso.trabalho });

      // Assert
      expect(resposta.status).to.equal(caso.statusCodeEsperado);
    });
  });
});
