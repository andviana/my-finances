const db = require('../models/index.js');
const {
  validateYearMonth,
  validateTransaction,
} = require('../helper/validatorHelper.js');
const { padLeft } = require('../helper/stringUtilsHelper.js');

const ObjectId = db.mongoose.Types.ObjectId;
const Transaction = db.transactionModel;

exports.findAll = async (req, res) => {
  const { period: yearMonth } = req.query;
  if (!yearMonth || !validateYearMonth(yearMonth)) {
    res.status(400).send({
      errorMessage:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
    return;
  }
  try {
    const resultado = await Transaction.find({ yearMonth });
    if (!resultado || !resultado.length > 0) {
      res.status(404).send({ errorMessage: 'nenhum resultado encontrado' });
      return;
    }
    res.send(resultado);
  } catch (e) {
    res.status(500).send({
      errorMessage: e.message || 'Algum erro ocorreu ao realizar a busca',
    });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({
      errorMessage: 'É necessário informar um id',
    });
    return;
  }
  try {
    const resultado = await Transaction.findById(id);
    if (!resultado) {
      res.status(404).send({ errorMessage: 'nenhum resultado encontrado' });
      return;
    }
    res.send(resultado);
  } catch (e) {
    res.status(500).send({
      errorMessage: e.message || 'Algum erro ocorreu ao realizar a busca',
    });
  }
};

exports.findDistinctYearMonth = async (req, res) => {
  try {
    const resultado = await Transaction.distinct('yearMonth');
    if (!resultado) {
      res.status(404).send({ errorMessage: 'nenhum resultado encontrado' });
      return;
    }
    res.send(resultado);
  } catch (e) {
    res.status(500).send({
      errorMessage: e.message || 'Algum erro ocorreu ao realizar a busca',
    });
  }
};

exports.create = async (req, res) => {
  const error = validateTransaction(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const { description, value, category, year, month, day, type } = req.body;
  const yearMonthDay = `${year}-${padLeft(month, 2)}-${padLeft(day, 2)}`;
  const yearMonth = `${year}-${padLeft(month, 2)}`;
  const transaction = new Transaction({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });
  try {
    const data = await transaction.save();
    res.send(data);
  } catch (e) {
    res
      .status(500)
      .send({ errorMessage: e.message || 'Algum erro ocorreu ao salvar' });
  }
};

exports.update = async (req, res) => {
  const error = validateTransaction(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const id = req.params.id;
  const { year, month, day, ...object } = req.body;
  const yearMonthDay = `${year}-${padLeft(month, 2)}-${padLeft(day, 2)}`;
  const yearMonth = `${year}-${padLeft(month, 2)}`;
  const modified = { ...object, year, month, day, yearMonth, yearMonthDay };
  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id }, modified, {
      new: true,
    });
    if (!data) {
      res
        .status(404)
        .send({ errorMessage: `Transação id ${id} não encontrada` });
      return;
    }
    res.send(data);
  } catch (e) {
    res
      .status(500)
      .send({ errorMessage: 'Erro ao atualizar a dados', error: e.message });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Transaction.findByIdAndDelete(id);
    res.send({ message: 'Transação excluída com sucesso' });
  } catch (e) {
    res.status(500).send({
      errorMessage: 'Não foi possível deletar a transação id: ' + id,
      error: e.message,
    });
  }
};
