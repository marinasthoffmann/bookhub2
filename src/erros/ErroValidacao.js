import ReqIncorreta from "./ReqIncorreta.js";

class ErroValidacao extends ReqIncorreta {
  constructor(erro) {
    const mensagensDeErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Erro de validação: ${mensagensDeErro}`);
  }
}

export default ErroValidacao;