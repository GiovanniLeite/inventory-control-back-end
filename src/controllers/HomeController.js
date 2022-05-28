// import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    // const novoAluno = await Aluno.create({
    //   nome: 'Giovanni',
    //   sobrenome: 'Leite',
    //   email: 'giovanni.m.leite@outlook.com',
    //   idade: 24,
    //   peso: 108,
    //   altura: 2.5,
    // });
    res.json('ok');// novoAluno);
  }
}

export default new HomeController();
