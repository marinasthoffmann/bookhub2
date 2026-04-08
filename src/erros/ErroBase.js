class ErroBase extends Error {
  constructor(mensagem = "Erro interno no servidor.", statusCode = 500) {
    super();
    this.message = mensagem;
    this.statusCode = statusCode;
  }

  enviarResposta(res) {
    res.status(this.statusCode).send({
      message: this.message,
      statusCode: this.statusCode
    });
  }
}

export default ErroBase;