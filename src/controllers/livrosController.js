import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroAtualizado = await livros.findByIdAndUpdate(id, { $set: req.body }, { new: true });

      if (livroAtualizado !== null) {
        res.status(200).send(livroAtualizado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroExcluido = await livros.findByIdAndDelete(id);

      if (livroExcluido !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;

      let busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
      if (minPaginas) busca.numeroPaginas = { $gte: parseInt(minPaginas) };
      if (maxPaginas) busca.numeroPaginas = { $lte: parseInt(maxPaginas) };
      if (nomeAutor) {
        const autor = await autores.findOne({ nome: { $regex: nomeAutor, $options: "i" } });
        if (autor !== null) {
          busca.autor = autor._id;
        } else {
          busca = null;
        }

        if (busca !== null) {
          const livrosResultado = await livros.find(busca).populate("autor").exec();
          res.status(200).send(livrosResultado);
        } else {
          res.status(200).send([]);
        }

      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;