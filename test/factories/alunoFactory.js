export function novoAluno(nome) {
  const identificador = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    nome,
    email: `aluno.${identificador}@example.com`,
    matricula: identificador,
    senha: 'senha123',
  };
}
