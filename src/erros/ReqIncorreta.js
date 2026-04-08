import ErroBase from "./ErroBase.js";

class ReqIncorreta extends ErroBase {
  constructor(mensagem = "Requisição incorreta. Verifique os dados fornecidos e tente novamente.") {
    super(mensagem, 400);
  }
}

export default ReqIncorreta;